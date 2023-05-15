import { ButtonPrimary, Text } from "@klimadao/lib/components";
import { Trans } from "@lingui/macro";
import { Celebration } from "@mui/icons-material";
import { Modal } from "components/Modal";
import Link from "next/link";
import { FC } from "react";
import * as styles from "./styles";

type Props = {
  retirementUrl: string;
  onSuccessModalClose: () => void;
};

export const RetirementStatusModal: FC<Props> = (props) => (
  <Modal
    title={
      <div className={styles.title}>
        <Celebration fontSize="large" />

        <Trans id="offset.successModal.title">
          <Text t="h4">Retirement Successful!</Text>
        </Trans>
      </div>
    }
    onToggleModal={props.onSuccessModalClose}
  >
    <div className={styles.modalContent}>
      <Text t="body6">
        <Trans id="offset.successModal.body1">
          Thank you for supporting the planet! View transaction on{" "}
          <Link href={props.retirementUrl}>polygonscan.</Link>
        </Trans>
      </Text>

      <ButtonPrimary
        href={props.retirementUrl}
        className={styles.viewButton}
        target="_blank"
        label={
          <Trans id="offset.successModal.cta">VIE AND SHARE CERTIFICATE</Trans>
        }
      />
      <ButtonPrimary
        href={"/portfolio"}
        className={styles.portfolioButton}
        label={<Trans id="offset.successModal.cta">RETIRE MORE CARBON</Trans>}
      />
    </div>
  </Modal>
);
