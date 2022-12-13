import { ButtonPrimary, Text } from "@klimadao/lib/components";
import { t, Trans } from "@lingui/macro";
import SendRounded from "@mui/icons-material/SendRounded";
import { FC } from "react";

import { Modal } from "components/Modal";
import * as styles from "./styles";

type Props = {
  retirementUrl: string;
  onSuccessModalClose: () => void;
};

export const RetirementSuccessModal: FC<Props> = (props) => (
  <Modal
    title={t({
      id: "offset.successModal.title",
      message: "Retirement Successful!",
    })}
    onToggleModal={props.onSuccessModalClose}
  >
    <div className={styles.modalContent}>
      <div className="stack">
        <Text t="caption">
          <Trans id="offset.successModal.body1">
            Thank you. By participating in the voluntary carbon market, you are
            making conservation more profitable and climate mitigation more
            impactful
          </Trans>
        </Text>
      </div>

      <div className="stack">
        <Text t="caption">
          <Trans id="offset.successModal.body2">
            Click the button below to view your retirement. Consider sharing the
            page to support us on our journey towards a more transparent,
            accessible and rewarding carbon market!
          </Trans>
        </Text>
      </div>

      <ButtonPrimary
        href={props.retirementUrl}
        target="_blank"
        icon={<SendRounded />}
        label={<Trans id="offset.successModal.cta">VIEW RETIREMENT</Trans>}
      />
    </div>
  </Modal>
);
