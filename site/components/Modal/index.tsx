import React, { useEffect, FC } from "react";
import styled from "@emotion/styled";
import Close from "@mui/icons-material/Close";

import * as styles from "./styles";
import { Text } from "@klimadao/lib/components";

type ModalWrapperProps = {
  showModal: boolean;
};

export const ModalWrapper = styled.div`
  display: ${(props: ModalWrapperProps) =>
    props.showModal ? "block" : "none"};
`;

export interface Props {
  showModal: boolean;
  closeOnBackgroundClick?: boolean;
  title: React.ReactNode;
  onToggleModal?: () => void;
}

export const Modal: FC<Props> = (props) => {
  const showCloseButton = !!props.onToggleModal;

  useEffect(() => {
    if (props.showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [props.showModal]);

  const handleBackgroundClick = props.closeOnBackgroundClick
    ? props.onToggleModal
    : undefined;

  return (
    <ModalWrapper showModal={props.showModal} aria-modal={true}>
      <div className={styles.modalBackground} onClick={handleBackgroundClick} />
      <div className={styles.modalContainer}>
        <div className={styles.modalContent}>
          <div className="title">
            <Text t="h4" uppercase={true}>
              {props.title}
            </Text>

            {showCloseButton && (
              <button onClick={props.onToggleModal}>
                <Close fontSize="large" />
              </button>
            )}
          </div>

          {props.children}
        </div>
      </div>
    </ModalWrapper>
  );
};
