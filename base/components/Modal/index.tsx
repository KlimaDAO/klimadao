import { cx } from "@emotion/css";
import { Text } from "@klimadao/lib/components";
import Close from "@mui/icons-material/Close";
import { FC, ReactNode } from "react";
import * as styles from "./styles";

interface Props {
  title: ReactNode;
  onToggleModal?: () => void;
  className?: string;
  children: ReactNode;
}

export const Modal: FC<Props> = (props) => {
  const showCloseButton = !!props.onToggleModal;
  return (
    <>
      <div
        className={cx(styles.modalBackground, {
          showCloseButton,
        })}
        onClick={props.onToggleModal}
      />
      <div className={styles.modalContainer}>
        <div className={cx(styles.modalContent, props.className)}>
          <div className={styles.title}>
            {typeof props.title === "string" ? (
              <Text>{props.title}</Text>
            ) : (
              props.title
            )}
            {showCloseButton && (
              <button
                className={styles.closeButton}
                onClick={props.onToggleModal}
              >
                <Close />
              </button>
            )}
          </div>
          {props.children}
        </div>
      </div>
    </>
  );
};
