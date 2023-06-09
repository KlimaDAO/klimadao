import { cx } from "@emotion/css";
import { useFocusTrap, useScrollLock } from "@klimadao/lib/utils";
import Close from "@mui/icons-material/Close";
import { Text } from "components/Text";
import { FC, HTMLAttributes, ReactNode } from "react";
import * as styles from "./styles";

export type CustomizableModalProps = {
  showModal: boolean;
  closeOnBackgroundClick?: boolean;
  title: ReactNode;
  overflowY?: string;
  width?: string;
  maxWidth?: string;
  height?: string;
  maxHeight?: string;
  onToggleModal?: () => void;
  children: ReactNode;
} & Pick<HTMLAttributes<HTMLDivElement>, "className">;

export const CustomizableModal: FC<CustomizableModalProps> = ({
  width = "55rem",
  maxWidth = "55rem",
  height = "fit-content",
  maxHeight = "calc(100vh - 10rem)",
  overflowY = "auto",
  ...props
}) => {
  const showCloseButton = !!props.onToggleModal;
  const focusTrapRef = useFocusTrap();
  useScrollLock(props.showModal);

  const handleBackgroundClick = props.closeOnBackgroundClick
    ? props.onToggleModal
    : undefined;

  if (!props.showModal) return null;

  const TitleComponent =
    typeof props.title === "string" ? (
      <Text t="h4">{props.title}</Text>
    ) : (
      props.title
    );

  return (
    <div aria-modal={true} className={props.className}>
      <div className={styles.modalBackground} onClick={handleBackgroundClick} />
      <div className={styles.modalContainer}>
        <div
          className={cx(
            "modalContent",
            styles.modalContent(width, maxWidth, height, maxHeight, overflowY)
          )}
          ref={focusTrapRef}
        >
          <div className="title">
            {TitleComponent}

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
