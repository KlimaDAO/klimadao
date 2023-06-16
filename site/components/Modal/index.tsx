import Close from "@mui/icons-material/Close";
import { FC, ReactNode } from "react";

import { Text } from "@klimadao/lib/components";
import { useFocusTrap, useScrollLock } from "@klimadao/lib/utils";
import * as styles from "./styles";

export interface Props {
  showModal: boolean;
  closeOnBackgroundClick?: boolean;
  title: ReactNode;
  onToggleModal?: () => void;
  children: ReactNode;
}

export const Modal: FC<Props> = (props) => {
  const showCloseButton = !!props.onToggleModal;
  const focusTrapRef = useFocusTrap();

  useScrollLock(props.showModal);

  const handleBackgroundClick = props.closeOnBackgroundClick
    ? props.onToggleModal
    : undefined;

  if (!props.showModal) return null;

  return (
    <div aria-modal={true}>
      <div className={styles.modalBackground} onClick={handleBackgroundClick} />
      <div className={styles.modalContainer}>
        <div className={styles.modalContent} ref={focusTrapRef}>
          <div className="title">
            <Text t="h4">{props.title}</Text>

            {showCloseButton && (
              <button onClick={props.onToggleModal}>
                <Close fontSize="large" />
              </button>
            )}
          </div>

          {props.children}
        </div>
      </div>
    </div>
  );
};
