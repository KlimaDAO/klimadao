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
  onFiatError: () => void;
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
        {!props.isRedirecting &&
          (!props.checkoutError ? (
            <>
              <Text>
                <Trans>
                  To complete your credit card transaction, you will be
                  redirected to Stripe, our payment processing partner.
                </Trans>
              </Text>
              <ButtonPrimary
                onClick={props.onSubmit}
                disabled={!!props.checkoutError}
                label={t`Continue`}
              />
              <CarbonmarkButton
                onClick={
                  !!props.checkoutError ? props.onFiatError : props.onCancel
                }
                label={t`Go back`}
              />
            </>
          ) : (
            <>
              <Text>
                <Trans>{props.checkoutError}</Trans>
              </Text>
              <CarbonmarkButton
                onClick={
                  !!props.checkoutError ? props.onFiatError : props.onCancel
                }
                label={t`Go back`}
              />
            </>
          ))}

        {props.isRedirecting && (
          <div className={styles.spinnerWrap}>
            <Spinner />
          </div>
        )}
      </div>
    </Modal>
  );
};
