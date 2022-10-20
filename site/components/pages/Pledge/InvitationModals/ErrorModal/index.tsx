import React from "react";

import { ButtonSecondary, Text } from "@klimadao/lib/components";
import { Modal } from "components/Modal";
import * as styles from "../../PledgeDashboard/styles";
import { t } from "@lingui/macro";

type Props = {
  setShowModal: (value: boolean) => void;
  showModal: boolean;
  message: string;
};

export const ErrorModal = (props: Props) => {
  return (
    <Modal
      title={t({ id: "pledge.server_error", message: "Server Error" })}
      showModal={props.showModal}
      onToggleModal={() => props.setShowModal(false)}
    >
      <Text t="body2" className={styles.modalMessage}>
        {props.message}
      </Text>
      <div className={styles.modalButtons}>
        <ButtonSecondary
          label={t({ id: "shared.cancel", message: "Cancel" })}
          onClick={() => {
            props.setShowModal(false);
          }}
        />
      </div>
    </Modal>
  );
};
