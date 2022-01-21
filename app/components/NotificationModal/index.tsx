import React, { FC, ReactElement } from "react";
import { useSelector } from "react-redux";
import { selectNotificationStatus } from "state/selectors";
import styles from "./index.module.css";
import AlarmIcon from "@mui/icons-material/Alarm";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { AppNotificationStatus } from "../../state/app";
import { setAppState } from "state/app";
import { useDispatch } from "react-redux";
import { getStatusMessage } from "actions/utils";
import { ClaimExceededModal } from "components/views/PKlima/ClaimExceededModal";

interface ModalAssetTypes {
  [key: string]: {
    [key: string]: string | ReactElement;
  };
}

const modalAssets: ModalAssetTypes = {
  header: {
    done: "SUCCESS!",
    error: "FAILURE!",
    userConfirmation: "CONFIRMATION",
    networkConfirmation: "PENDING",
  },
  iconStyle: {
    done: styles.icon_success,
    error: styles.icon_failure,
    userConfirmation: styles.icon_confirmation,
    networkConfirmation: styles.icon_network_confirmation,
  },
  iconComponent: {
    done: <CheckIcon />,
    error: <ErrorOutlineOutlinedIcon />,
    userConfirmation: <AlarmIcon />,
    networkConfirmation: <AlarmIcon />,
  },
};

export const NotificationModal: FC = () => {
  const dispatch = useDispatch();
  const status: AppNotificationStatus | null = useSelector(
    selectNotificationStatus
  );
  if (!status) return null;
  const { statusType } = status;
  if (status && statusType === "claimExceeded") return <ClaimExceededModal />;

  const getAsset = (
    section: string,
    status: AppNotificationStatus
  ): string | ReactElement => {
    return status.statusType ? modalAssets[section][status.statusType] : "";
  };

  const closeModal = function (): void {
    dispatch(setAppState({ notificationStatus: null }));
  };

  return (
    <div className={styles.bg}>
      <div className={styles.card}>
        <div className={styles.card_header}>
          <p>{getAsset("header", status)}</p>
          <button onClick={closeModal} className={styles.closeButton}>
            {status && (statusType === "done" || statusType === "error") && (
              <CloseIcon />
            )}
          </button>
        </div>
        <div
          className={`${styles.icon_container}  
            ${getAsset("iconStyle", status)}`}
        >
          {getAsset("iconComponent", status)}
        </div>
        <p className={styles.card_message}>{getStatusMessage(status)}</p>
      </div>
    </div>
  );
};
