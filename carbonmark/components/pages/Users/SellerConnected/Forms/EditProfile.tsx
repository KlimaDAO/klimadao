import { useWeb3 } from "@klimadao/lib/utils";
import { t, Trans } from "@lingui/macro";
import { ButtonPrimary } from "components/Buttons/ButtonPrimary";
import { InputField } from "components/shared/Form/InputField";
import { TextareaField } from "components/shared/Form/TextareaField";
import { Spinner } from "components/shared/Spinner";
import { Text } from "components/Text";
import { utils } from "ethers";
import { getUser, loginUser, postUser, putUser, verifyUser } from "lib/api";
import { User } from "lib/types/carbonmark";
import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ProfileLogo } from "../../ProfileLogo";
import * as styles from "./styles";

type Props = {
  user: {
    handle?: string;
    username?: string;
    description?: string;
    profileImgUrl?: string;
  } | null;
  onSubmit: (data: User) => void;
  isCarbonmarkUser: boolean;
};

const defaultValues = {
  handle: "",
  username: "",
  description: "",
  profileImgUrl: "",
};

/** DO NOT CHANGE: This needs to be synchronized with the backend */
export const editSignMessage = (nonce: string): string =>
  `Sign to authenticate ownership and edit your Carbonmark profile 💚\n\nSignature nonce: ${nonce}`;

export const EditProfile: FC<Props> = (props) => {
  const isExistingUser = !!props.user?.handle;
  const { address, signer } = useWeb3();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<null | string>(null);

  const { register, handleSubmit, formState, watch } = useForm<User>({
    defaultValues: { ...defaultValues, ...props.user, wallet: address },
  });
  const watchProfileImgUrl = watch(
    "profileImgUrl",
    props.user?.profileImgUrl || ""
  );

  const hasError = !isLoading && !!errorMessage;

  const fetchIsNewHandle = async (handle: string) => {
    try {
      const handleFromApi = await getUser({
        user: handle,
        type: "handle",
      });
      const apiHandle = handleFromApi?.handle || "";
      return apiHandle.toLowerCase() !== handle.toLowerCase();
    } catch (error: any) {
      console.error(error);
      if (error.message === "Not Found") {
        return true;
      }
      return false;
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
      console.log("putting values", values);
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

      if (response.handle) {
        props.onSubmit(response);
      } else {
        throw new Error("Handle is missing!");
      }
    } catch (error: any) {
      console.error(error);
      if (error.code === "ACTION_REJECTED") {
        setErrorMessage(t`You chose to reject the transaction.`);
      } else {
        setErrorMessage(t`Something went wrong. Please try again. ${error}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.formContainer}>
        <ProfileLogo
          isCarbonmarkUser={props.isCarbonmarkUser}
          hasBorder={true}
          className={styles.profileLogo}
          profileImgUrl={watchProfileImgUrl}
        />
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
            disabled: isExistingUser,
            placeholder: t`Your unique handle`,
            type: "text",
            ...register(
              "handle",
              !isExistingUser // validate only if handle can be changed
                ? {
                    required: {
                      value: true,
                      message: t`Handle is required`,
                    },
                    pattern: {
                      value: /^[a-zA-Z0-9]+$/, // no special characters!
                      message: t`Handle should not contain any special characters`,
                    },
                    validate: {
                      isAddress: (v) =>
                        !utils.isAddress(v) || // do not allow polygon addresses
                        t`Handle should not be an address`,
                      isNewHandle: async (v) =>
                        (await fetchIsNewHandle(v)) || // ensure unique handles
                        t`Sorry, this handle already exists`,
                    },
                  }
                : undefined
            ),
          }}
          label={t`@Username (note: this can not be changed!)`}
          errorMessage={formState.errors.handle?.message}
        />
        <InputField
          id="username"
          inputProps={{
            disabled: isLoading,
            placeholder: t`Your display name`,
            type: "text",
            ...register("username", {
              required: {
                value: true,
                message: t`Display name is required`,
              },
            }),
          }}
          label={t`Display name`}
          errorMessage={formState.errors.username?.message}
        />
        <InputField
          id="profileImgUrl"
          inputProps={{
            disabled: isLoading,
            placeholder: "https://...",
            type: "text",
            ...register("profileImgUrl", {}),
          }}
          label={t`Profile picture`}
          infoTooltip={t`200x200 PNG recommended. Upload your image to a host like imgur.com or postimages.org, and paste the full URL. Direct photo upload is coming soon!`}
          errorMessage={formState.errors.profileImgUrl?.message}
        />
        <TextareaField
          id="description"
          textareaProps={{
            disabled: isLoading,
            rows: 4,
            placeholder: t`Say a few words about yourself. This will be visible in your seller profile.`,
            ...register("description"),
          }}
          label={t`About`}
        />
        {isLoading && (
          <>
            <div className={styles.spinner}>
              <Spinner />
            </div>
            <Text align="center">
              Please use your wallet to sign and confirm this edit.
            </Text>
          </>
        )}
        {hasError && (
          <Text t="body1" className="error">
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
