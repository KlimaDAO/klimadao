import { t, Trans } from "@lingui/macro";
import { ButtonPrimary } from "components/Buttons/ButtonPrimary";
import { CarbonmarkButton } from "components/CarbonmarkButton";
import { Modal } from "components/shared/Modal";
import { Spinner } from "components/shared/Spinner";
import { Text } from "components/Text";
import { FC } from "react";
import * as styles from "./styles";

export interface Props {
  showModal: boolean;
  isRedirecting: boolean;
  onCancel: () => void;
  onSubmit: () => void;
  checkoutError: null | string;
}

export const CreditCardModal: FC<Props> = (props) => {
  return (
    <Modal
      title={t`Confirm Purchase`}
      showModal={props.showModal}
      onToggleModal={props.onCancel}
    >
      <div className={styles.confirmCreditCard}>
        {!props.isRedirecting && (
          <>
            <Text>
              <Trans>
                To complete your credit card transaction, you will be redirected
                to Stripe, our payment processing partner.
              </Trans>
            </Text>
            <ButtonPrimary onClick={props.onSubmit} label={t`Continue`} />
            <CarbonmarkButton onClick={props.onCancel} label={t`Go back`} />
          </>
        )}

        {props.isRedirecting && (
          <div className={styles.spinnerWrap}>
            <Spinner />
          </div>
        )}

        {!!props.checkoutError && (
          <>
            <Text>{props.checkoutError}</Text>
            <CarbonmarkButton onClick={props.onCancel} label={t`Go back`} />
          </>
        )}
      </div>
    </Modal>
  );
};
