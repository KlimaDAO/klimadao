import { t, Trans } from "@lingui/macro";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import LaunchOutlinedIcon from "@mui/icons-material/LaunchOutlined";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import { CarbonmarkButton } from "components/CarbonmarkButton";
import { Modal, ModalProps } from "components/shared/Modal";
import * as styles from "./styles";

type ExitModalProps = Omit<ModalProps, "children"> & { retireLink: string };

export const ExitModal = (props: ExitModalProps) => (
  <Modal {...props} className={styles.modal}>
    <div className={styles.content}>
      <div>
        <Trans>
          <LaunchOutlinedIcon />
          You will be taken to KlimaDAO.finance to complete this transaction.
        </Trans>
      </div>
      <div>
        <Trans>
          <AccountBalanceWalletIcon />
          After you click the button below to continue, you will be asked to
          connect your wallet and the project you selected here will already be
          selected for you on KlimaDAO.finance. From there, follow the
          directions on that page to complete your transaction.
        </Trans>
      </div>
      <div>
        <Trans>
          <SpaceDashboardIcon />
          Carbon credits you purchase or any retirements you make on
          KlimaDAO.finance will also be accessible in your Carbonmark portfolio.
        </Trans>
      </div>
      <CarbonmarkButton
        href={props.retireLink}
        className={styles.continueButton}
        label={t`Continue`}
      />
      <CarbonmarkButton
        onClick={props.onToggleModal}
        className={styles.cancelButton}
        label={t`Cancel`}
      />
    </div>
  </Modal>
);
