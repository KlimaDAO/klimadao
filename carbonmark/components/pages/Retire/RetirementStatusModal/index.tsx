import { ButtonPrimary, Text } from "@klimadao/lib/components";
import { Trans } from "@lingui/macro";
import { CelebrationOutlined } from "@mui/icons-material";
import { Modal } from "components/shared/Modal";
import Link from "next/link";
import { FC } from "react";
import * as styles from "./styles";

type Props = {
  retirementUrl: string;
  showModal: boolean;
};

export const RetirementStatusModal: FC<Props> = (props) => (
  <Modal
    title={
      <div className={styles.title}>
        <CelebrationOutlined fontSize="large" />

        <Trans>
          <Text t="h4">Retirement Successful!</Text>
        </Trans>
      </div>
    }
    showModal={true}
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
        label={<Trans>View and share certificate</Trans>}
      />
      <ButtonPrimary
        href={"/portfolio"}
        className={styles.portfolioButton}
        label={<Trans>Retire more carbon</Trans>}
      />
    </div>
  </Modal>
);
