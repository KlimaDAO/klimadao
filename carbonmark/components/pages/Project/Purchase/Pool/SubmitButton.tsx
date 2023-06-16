import { useWeb3 } from "@klimadao/lib/utils";
import { t, Trans } from "@lingui/macro";
import { ButtonPrimary } from "components/Buttons/ButtonPrimary";
import { Spinner } from "components/shared/Spinner";
import { LO } from "lib/luckyOrange";
import { FC } from "react";
import { SubmitHandler, useFormContext } from "react-hook-form";
import * as styles from "../styles";
import { FormValues } from "./types";

type Props = {
  onSubmit: (values: FormValues) => void;
  isLoading: boolean;
  className?: string;
};

export const SubmitButton: FC<Props> = (props) => {
  const { address, isConnected, toggleModal } = useWeb3();

  const { handleSubmit } = useFormContext<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (values: FormValues) => {
    LO.track("Purchase: Continue Clicked");
    props.onSubmit(values);
  };

  if (!address && !isConnected) {
    return (
      <ButtonPrimary
        className={props.className}
        label={t`Sign In / Connect To Buy`}
        onClick={toggleModal}
      />
    );
  }

  return (
    <ButtonPrimary
      className={props.className}
      label={
        props.isLoading ? (
          <Spinner className={styles.submitSpinner} />
        ) : (
          <Trans>Continue</Trans>
        )
      }
      onClick={handleSubmit(onSubmit)}
    />
  );
};
