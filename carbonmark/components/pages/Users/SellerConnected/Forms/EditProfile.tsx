import { getUsersWalletorhandle } from ".generated/carbonmark-api-sdk/clients";
import { useWeb3 } from "@klimadao/lib/utils";
import { t, Trans } from "@lingui/macro";
import { ButtonPrimary } from "components/Buttons/ButtonPrimary";
import { InputField } from "components/shared/Form/InputField";
import { TextareaField } from "components/shared/Form/TextareaField";
import { Spinner } from "components/shared/Spinner";
import { Text } from "components/Text";
import { isAddress } from "ethers-v6";
import { postUser, putUser } from "lib/api";
import { SIGN_PROFILE_MESSAGE, VALID_HANDLE_REGEX } from "lib/constants";
import { User } from "lib/types/carbonmark.types";
import { isNil } from "lodash";
import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ProfileLogo } from "../../ProfileLogo";
import * as styles from "./styles";

type Props = {
  user?: User | null;
  onSubmit: (data: User) => void;
  isCarbonmarkUser: boolean;
};

const defaultValues = {
  handle: "",
  username: "",
  description: "",
  profileImgUrl: "",
};

export const EditProfile: FC<Props> = (props) => {
  const isExistingUser = !!props.user?.handle;
  const { address, signer, networkLabel: network } = useWeb3();

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

  const fetchIsNewHandle = async (handle?: string | null) => {
    if (isNil(handle)) return true;
    try {
      const handleFromApi = await getUsersWalletorhandle(handle.toLowerCase(), {
        network,
      });
      const apiHandle = handleFromApi?.handle || "";
      return apiHandle.toLowerCase() !== handle.toLowerCase();
    } catch (error) {
      console.error(error);
      if (error.data.statusCode === 404) {
        return true;
      }
      return false;
    }
  };

  const onSubmit: SubmitHandler<User> = async (values: User) => {
    setErrorMessage(null);

    try {
      setIsLoading(true);

      if (!address || !signer) return;
      let user;
      try {
        user = await getUsersWalletorhandle(address);
      } catch {
        // user might not exist yet
      }
      // For backwards compat: if the userdoc nonce is undefined, append empty string.
      const message = SIGN_PROFILE_MESSAGE + (user?.nonce || "");
      const signature = await signer.signMessage(message);

      let response;
      if (isExistingUser) {
        response = await putUser({
          user: values,
          signature,
        });
      } else {
        response = await postUser({
          user: values,
          signature,
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
        <Text>
          <span className={styles.required}>*</span> Required Field
        </Text>
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
                      value: VALID_HANDLE_REGEX, // no special characters!
                      message: t`Handle should not contain any special characters`,
                    },
                    validate: {
                      isAddress: (v) =>
                        !isAddress(v) || // do not allow polygon addresses
                        t`Handle should not be an address`,
                      isNewHandle: async (v) =>
                        (await fetchIsNewHandle(v)) || // ensure unique handles
                        t`Sorry, this handle already exists`,
                    },
                  }
                : undefined
            ),
          }}
          required
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
          required
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
