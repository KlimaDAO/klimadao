import { t, Trans } from "@lingui/macro";
import { AccountBalanceOutlined, ArticleOutlined } from "@mui/icons-material";
import { ButtonPrimary } from "components/Buttons/ButtonPrimary";
import { ButtonSecondary } from "components/Buttons/ButtonSecondary";
import { Modal } from "components/shared/Modal";
import { FC } from "react";
import * as styles from "./styles";

export interface Props {
  showModal: boolean;
  onCancel: () => void;
  onSubmit?: () => void;
}

export const BankTransferModal: FC<Props> = (props) => {
  return (
    <Modal
      title={t`Confirm Purchase`}
      showModal={props.showModal}
      onToggleModal={props.onCancel}
      className={styles.bankTransferModal}
    >
      <div className={styles.confirmBankTransfer}>
        <AccountBalanceOutlined />
        <Trans>
          To pay via bank transfer, we&apos;ll need to gather some information
          from you.
        </Trans>
        <ArticleOutlined />
        <Trans>
          Please complete the secure form on the next page and we&apos;ll
          provide you an invoice within 2 business days (upon receiving all
          required information).
        </Trans>
        <div className={styles.buttonWrapper}>
          <ButtonPrimary
            onClick={props.onSubmit}
            label={<Trans>Continue</Trans>}
          />
          <ButtonSecondary
            onClick={props.onCancel}
            label={<Trans>Go Back</Trans>}
          />
        </div>
      </div>
    </Modal>
  );
};
