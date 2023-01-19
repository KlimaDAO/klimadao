import { cx } from "@emotion/css";
import Tippy from "@tippyjs/react";
import { FC, useRef } from "react";
import * as styles from "./styles";

interface Props {
  name: string;
  children: JSX.Element[];
  active?: boolean;
}

export const DropdownItemDesktop: FC<Props> = (props) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const onClickHide = () => buttonRef.current?.blur(); // Tippy will keep the button focused (if clicked) after dropdown is hidden unless we blur it
  return (
    <div className={cx(styles.navMain_DesktopItemContainer)}>
      <Tippy
        content={
          <div className={styles.navMain_DesktopSubMenu}>{props.children}</div>
        }
        interactive={true}
        hideOnClick={false}
        onHide={onClickHide}
      >
        <button
          className={cx(styles.navMain_DesktopLink, {
            dropdown: true,
          })}
          data-active={props.active?.toString()}
          ref={buttonRef}
        >
          {props.name}
        </button>
      </Tippy>
    </div>
  );
};
