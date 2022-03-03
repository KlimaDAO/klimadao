import React, { FC, ReactElement, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { selectNotificationStatus } from "state/selectors";
import styles from "./index.module.css";
import AlarmIcon from "@mui/icons-material/Alarm";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { AppNotificationStatus } from "../../state/app";
import { setAppState } from "state/app";
import { useAppDispatch } from "state";
import { getStatusMessage } from "actions/utils";
import { ClaimExceededModal } from "components/views/PKlima/ClaimExceededModal";
import { Text } from "@klimadao/lib/components";
import { Trans } from "@lingui/macro";

interface ModalAssetTypes {
  [key: string]: {
    [key: string]: string | ReactElement;
  };
}

const modalAssets: ModalAssetTypes = {
  header: {
    done: <Trans id="modal.done">SUCCESS!</Trans>,
    error: <Trans id="modal.error">FAILURE!</Trans>,
    userConfirmation: <Trans id="modal.user_confirmation">CONFIRMATION</Trans>,
    networkConfirmation: <Trans id="modal.pending">PENDING</Trans>,
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

/** helper hook trigger when pathname changes */
const usePathnameChange = (cb: () => void) => {
  const location = useLocation();
  useEffect(() => {
    cb();
  }, [location.pathname]);
};

export const NotificationModal: FC = () => {
  const dispatch = useAppDispatch();
  const status: AppNotificationStatus | null = useSelector(
    selectNotificationStatus
  );

  usePathnameChange(() => {
    dispatch(setAppState({ notificationStatus: null }));
  });

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
          <Text t="h5">{getAsset("header", status)}</Text>
          {status && (statusType === "done" || statusType === "error") && (
            <button onClick={closeModal} className={styles.closeButton}>
              <CloseIcon />
            </button>
          )}
        </div>
        <div
          className={`${styles.icon_container}  
            ${getAsset("iconStyle", status)}`}
        >
          {getAsset("iconComponent", status)}
        </div>
        <Text
          t="body3"
          className={styles.card_message}
          align="center"
          style={{ fontWeight: 400 }}
        >
          {getStatusMessage(status)}
        </Text>
      </div>
    </div>
  );
};
