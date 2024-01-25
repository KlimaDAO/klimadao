import { cx } from "@emotion/css";
import { useFocusTrap, useScrollLock } from "@klimadao/lib/utils";
import Close from "@mui/icons-material/Close";
import { Text } from "components/Text";
import { FC, HTMLAttributes, ReactNode } from "react";
import * as styles from "./styles";

export type ModalProps = {
  showModal: boolean;
  closeOnBackgroundClick?: boolean;
  title: ReactNode;
  onToggleModal?: () => void;
  children: ReactNode;
} & Pick<HTMLAttributes<HTMLDivElement>, "className">;

export const Modal: FC<ModalProps> = (props) => {
  const showCloseButton = !!props.onToggleModal;
  const focusTrapRef = useFocusTrap();

  useScrollLock(props.showModal);

  const handleBackgroundClick = props.closeOnBackgroundClick
    ? props.onToggleModal
    : undefined;

  if (!props.showModal) return null;

  return (
    <div aria-modal={true} className={props.className}>
      <div className={styles.modalBackground} onClick={handleBackgroundClick} />
      <div className={styles.modalContainer}>
        <div
          className={cx("modalContent", styles.modalContent)}
          ref={focusTrapRef}
        >
          <div className="title">
            <Text as="span" t="h4">
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
    </div>
  );
};
