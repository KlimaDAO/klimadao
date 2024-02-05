import { KeyboardArrowRight } from "@mui/icons-material";
import Link from "next/link";
import { FC, ReactElement, ReactNode } from "react";
import * as styles from "./styles";

interface MenuButtonProps {
  icon: ReactElement;
  href: string;
  isActive: boolean;
  disabled?: boolean;
  hasSubMenu?: boolean;
  children: ReactNode;
  onClick?: () => void;
}

export const MenuButton: FC<MenuButtonProps> = (props) => {
  if (props.disabled) {
    return (
      <div
        className={styles.menuButton}
        data-active={props.isActive}
        data-disabled={true}
      >
        <div className="container">
          <div className="iconContainer">{props.icon}</div>
          <span>{props.children}</span>
        </div>
        {props.hasSubMenu && <KeyboardArrowRight />}
      </div>
    );
  }

  if (props.onClick) {
    return (
      <button className={styles.menuButton} onClick={props.onClick}>
        <div data-active={props.isActive}>
          <div className="container">
            <div className="iconContainer">{props.icon}</div>
            <span>{props.children}</span>
          </div>
          {props.hasSubMenu && <KeyboardArrowRight />}
        </div>
      </button>
    );
  }

  return (
    <Link href={props.href} passHref>
      <div data-active={props.isActive} className={styles.menuButton}>
        <div className="container">
          <div className="iconContainer">{props.icon}</div>
          <span>{props.children}</span>
        </div>
        {props.hasSubMenu && <KeyboardArrowRight />}
      </div>
    </Link>
  );
};
