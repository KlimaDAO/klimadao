import { ButtonPrimary, Spinner, Text } from "@klimadao/lib/components";
import { User } from "@klimadao/lib/types/carbonmark";
import { useWeb3 } from "@klimadao/lib/utils";
import { t, Trans } from "@lingui/macro";
import { InputField } from "components/shared/Form/InputField";
import { TextareaField } from "components/shared/Form/TextareaField";
import { utils } from "ethers";
import { getUser, loginUser, postUser, putUser, verifyUser } from "lib/api";
import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as styles from "./styles";

type Props = {
  user: {
    handle?: string;
    username?: string;
    description?: string;
  } | null;
  onSubmit: (data: User) => void;
};

const defaultValues = {
  handle: "",
  username: "",
  description: "",
};

export const editSignMessage = (nonce: string): string =>
  `Sign to authenticate ownership and edit your Klima Marketplace Profile 💚\n\nSignature nonce: ${nonce}`;

export const EditProfile: FC<Props> = (props) => {
  const isExistingUser = !!props.user?.handle;
  const { address, signer } = useWeb3();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<null | string>(null);

  const { register, handleSubmit, formState } = useForm<User>({
    defaultValues: { ...defaultValues, ...props.user, wallet: address },
  });

  const hasError = !isLoading && !!errorMessage;

  const fetchIsNewHandle = async (handle: string) => {
    try {
      const existingUser = await getUser({
        user: handle,
        type: "handle",
      });
      const apiHandle = existingUser?.handle || "";
      return apiHandle.toLowerCase() !== handle.toLowerCase();
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit: SubmitHandler<User> = async (values: User) => {
    setErrorMessage(null);

    try {
      setIsLoading(true);

      if (!address) return;
      const loginRes = await loginUser(address);

      if (!signer) return;
      const signature = await signer.signMessage(
        editSignMessage(loginRes.nonce)
      );

      const verifyResponse = await verifyUser({
        address,
        signature: signature,
      });

      let response;

      if (isExistingUser) {
        response = await putUser({
          user: values,
          token: verifyResponse.token,
        });
      } else {
        response = await postUser({
          user: values,
          token: verifyResponse.token,
        });
      }

      if (response) {
        props.onSubmit(response);
      } else {
        setIsLoading(false);
        setErrorMessage(
          t({
            id: "user.edit.form.error.api_error",
            message:
              "There was an error with the Request API. Please try again",
          })
        );
      }
    } catch (error: any) {
      setIsLoading(false);
      console.error(error);
      if (error.code === "ACTION_REJECTED") {
        setErrorMessage(
          t({
            id: "user.edit.form.error.user_rejected",
            message: "You chose to reject the transaction.",
          })
        );
      } else {
        setErrorMessage(
          t({
            id: "user.edit.form.error.general_error",
            message: "Something went wrong. Please try again",
          })
        );
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.formContainer}>
        <InputField
          id="wallet"
          inputProps={{
            type: "hidden",
            ...register("wallet"),
          }}
          label={"wallet address"}
          hideLabel
        />
        <InputField
          id="handle"
          inputProps={{
            disabled: !!props.user?.handle,
            placeholder: t({
              id: "user.edit.form.input.handle.placeholder",
              message: "Your unique handle",
            }),
            type: "text",
            ...register("handle", {
              required: {
                value: true,
                message: t({
                  id: "user.edit.form.input.handle.required",
                  message: "Handle is required",
                }),
              },
              pattern: {
                value: /^[a-zA-Z0-9]+$/, // no special characters!
                message: t({
                  id: "user.edit.form.input.handle.pattern",
                  message: "Handle should contain any special characters",
                }),
              },
              validate: {
                isAddress: (v) =>
                  !utils.isAddress(v) || // do not allow polygon addresses
                  t({
                    id: "user.edit.form.input.handle.no_polygon_address",
                    message: "Handle should not be an address",
                  }),
                isNewHandle: async (v) =>
                  (await fetchIsNewHandle(v)) || // ensure unique handles
                  t({
                    id: "user.edit.form.input.handle.handle_exists",
                    message: "Sorry, this handle already exists",
                  }),
              },
            }),
          }}
          label={t({
            id: "user.edit.form.input.handle.label",
            message: "Handle (not changeable later! Choose wisely)",
          })}
          errorMessage={formState.errors.handle?.message}
        />
        <InputField
          id="username"
          inputProps={{
            disabled: isLoading,
            placeholder: t({
              id: "user.edit.form.input.username.placeholder",
              message: "Your display name",
            }),
            type: "text",
            ...register("username", {
              required: {
                value: true,
                message: t({
                  id: "user.edit.form.input.username.required",
                  message: "Display Name is required",
                }),
              },
            }),
          }}
          label={t({
            id: "user.edit.form.input.username.label",
            message: "Display Name",
          })}
          errorMessage={formState.errors.username?.message}
        />
        <TextareaField
          id="description"
          textareaProps={{
            disabled: isLoading,
            placeholder: t({
              id: "user.edit.form.input.description.placeholder",
              message: "Description",
            }),
            ...register("description"),
          }}
          label={t({
            id: "user.edit.form.input.description.label",
            message: "About",
          })}
        />
        {isLoading && (
          <div className={styles.spinner}>
            <Spinner />
          </div>
        )}
        {hasError && (
          <Text t="caption" className="error">
            {errorMessage}
          </Text>
        )}
        {!isLoading && (
          <ButtonPrimary
            label={<Trans id="profile.edit_modal.submit">Save Changes</Trans>}
            onClick={handleSubmit(onSubmit)}
            disabled={!formState.isDirty}
          />
        )}
      </div>
    </form>
  );
};
