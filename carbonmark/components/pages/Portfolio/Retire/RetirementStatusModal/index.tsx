import { Text } from "@klimadao/lib/components";
import { Trans } from "@lingui/macro";
import { CelebrationOutlined } from "@mui/icons-material";
import { CarbonmarkButton } from "components/CarbonmarkButton";
import { Modal } from "components/shared/Modal";
import Link from "next/link";
import { FC } from "react";
import * as styles from "./styles";

type Props = {
  polygonScanUrl: string;
  retirementUrl: string;
  showModal: boolean;
  user: string;
  retirementIndex: number;
};

export const RetirementStatusModal: FC<Props> = (props) => (
  <Modal
    title={
      <div className={styles.title}>
        <CelebrationOutlined fontSize="large" />

        <Text t="h4">
          <Trans>Retirement Successful!</Trans>
        </Text>
      </div>
    }
    showModal={true}
  >
    <div className={styles.modalContent}>
      <Text t="body6">
        <Trans id="offset.successModal.body1">
          Thank you for supporting the planet! View transaction on{" "}
          <Link href={props.polygonScanUrl}>PolygonScan.</Link>
        </Trans>
      </Text>
      <CarbonmarkButton
        className={styles.viewButton}
        href={`/retirements/${props.user}/${props.retirementIndex}`}
        renderLink={(linkProps) => <Link {...linkProps} />}
        target="_blank"
        label={<Trans>View and share certificate</Trans>}
      />

      <CarbonmarkButton
        className={styles.fullWidthButton}
        href={"/portfolio"}
        renderLink={(linkProps) => <Link {...linkProps} />}
        label={<Trans>Retire more carbon</Trans>}
      />
    </div>
  </Modal>
);
