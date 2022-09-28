import React, { FC } from "react";
import SendRounded from "@mui/icons-material/SendRounded";
import { Trans, t } from "@lingui/macro";
import { Anchor as A, Text, ButtonPrimary } from "@klimadao/lib/components";

import { Modal } from "components/Modal";
import * as styles from "./styles";

type Props = {
  url: string;
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
        variant="icon"
        href={props.url}
        target="_blank"
        label={
          <>
            <SendRounded />
            <Trans id="offset.successModal.cta">VIEW RETIREMENT</Trans>
          </>
        }
      />
    </div>
  </Modal>
);
