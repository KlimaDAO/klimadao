import { cx } from "@emotion/css";
import { ButtonPrimary, Spinner, Text } from "@klimadao/lib/components";
import { urls } from "@klimadao/lib/constants";
import { concatAddress } from "@klimadao/lib/utils";
import CheckIcon from "@mui/icons-material/Check";
import SendRounded from "@mui/icons-material/SendRounded";
import { Modal } from "components/Modal";
import { StatusMessage, TxnStatus } from "components/pages/Home";
import { StaticImageData } from "next/image";
import Link from "next/link";
import { FC, ReactNode } from "react";
import { HighlightValue } from "./HighlightValue";
import * as styles from "./styles";

interface Props {
  title: ReactNode;
  value: string;
  tokenName: string;
  status: StatusMessage;
  tokenIcon: StaticImageData;
  spenderAddress: string;
  onSubmit: () => void;
  onCloseModal: () => void;
}

const getStatusMessage = (statusType: TxnStatus, message?: string) => {
  if (statusType === "error" && message) {
    if (message === "userRejected") {
      return "❌ You chose to reject the transaction";
    }
    return "❌ Error: something went wrong...";
  } else if (statusType === "networkConfirmation") {
    return "Transaction initiated. Waiting for network confirmation.";
  } else if (statusType === "done") {
    return (
      <>
        Transaction complete. Track progress on{" "}
        <Link href={message!} passHref target="_blank">
          Axelarscan
        </Link>
      </>
    );
  }
  return null;
};

export const TransactionModal: FC<Props> = (props) => {
  const statusType = props.status?.statusType;

  const success = statusType === "done";
  const isPending = statusType === "networkConfirmation";

  const showCloseButton = !isPending && success;
  const showSubmitButton = !isPending && !success;

  const onModalClose = !isPending ? props.onCloseModal : undefined;

  return (
    <Modal title={props.title} onToggleModal={onModalClose}>
      <div className={styles.container}>
        <div
          className={cx(styles.contentContainer, {
            success,
          })}
        >
          <Text t="body4">
            Please submit the transaction. Note: This can take between 5-20
            minutes to complete on Axelar.
          </Text>
          <HighlightValue
            label={
              <Text t="caption" color="lighter">
                Contract address
              </Text>
            }
            value={concatAddress(props.spenderAddress)}
            valueHref={urls.basescan + `/address/${props.spenderAddress}`}
          />
          <HighlightValue
            label={
              <Text t="caption" color="lighter">
                Confirm amount
              </Text>
            }
            value={props.value || "0"}
            icon={props.tokenIcon}
            iconName={props.tokenName}
          />
        </div>
        {!!props.status && (
          <div className={styles.statusMessage}>
            {success && <CheckIcon />}
            <Text t="caption" color="lighter" align="center">
              {getStatusMessage(props.status.statusType, props.status.message)}
            </Text>
          </div>
        )}
        <div className={styles.buttonRow}>
          {isPending && (
            <div className={styles.buttonRow_spinner}>
              <Spinner />
            </div>
          )}
          {showSubmitButton && (
            <ButtonPrimary
              icon={<SendRounded />}
              label="Submit"
              onClick={() => props.onSubmit()}
              className={styles.submitButton}
            />
          )}
          {showCloseButton && (
            <ButtonPrimary
              variant="gray"
              label="Close"
              onClick={() => props.onCloseModal()}
              className={styles.submitButton}
            />
          )}
        </div>
      </div>
    </Modal>
  );
};
