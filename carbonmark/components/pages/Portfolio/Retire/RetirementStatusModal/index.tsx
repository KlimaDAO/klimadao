import { Text } from "@klimadao/lib/components";
import { Trans } from "@lingui/macro";
import CelebrationOutlinedIcon from "@mui/icons-material/CelebrationOutlined";
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
  subgraphIndexStatus: "indexed" | "timeout";
};

export const RetirementStatusModal: FC<Props> = (props) => (
  <Modal
    title={
      <div className={styles.title}>
        <CelebrationOutlinedIcon fontSize="large" />
        <Trans>Retirement Successful!</Trans>
      </div>
    }
    showModal={props.showModal}
  >
    <div className={styles.modalContent}>
      {props.subgraphIndexStatus === "timeout" ? (
        <>
          <Text t="caption">
            <Trans id="offset.successModal.body2">
              Thank you for supporting the planet!
            </Trans>
          </Text>
          <Text t="caption">
            <Trans id="offset.successModal.body3">
              Your transaction has been successfully processed but is taking
              longer than normal to index. It will appear in your{" "}
              <Link target="_blank" href={`/retirements/${props.user}`}>
                retirements
              </Link>{" "}
              soon.
            </Trans>
          </Text>
          <Text t="caption">
            <Trans>
              You can view the successful transaction now on
              <Link href={props.polygonScanUrl}> PolygonScan.</Link>
            </Trans>
          </Text>
          <CarbonmarkButton
            className={styles.fullWidthButton}
            href={"/portfolio"}
            renderLink={(linkProps) => <Link {...linkProps} />}
            label={<Trans>Retire more carbon</Trans>}
          />
        </>
      ) : (
        <>
          <Text t="body6">
            <Trans id="offset.successModal.body1">
              Thank you for supporting the planet! View transaction on{" "}
              <Link href={props.polygonScanUrl}> PolygonScan.</Link>
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
        </>
      )}
    </div>
  </Modal>
);
