import Link from "next/link";
import { FC, ReactElement, ReactNode } from "react";
import * as styles from "./styles";

interface MenuButtonProps {
  icon: ReactElement;
  href: string;
  isActive: boolean;
  disabled?: boolean;
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
        <div className="iconContainer">{props.icon}</div>
        <span>{props.children}</span>
      </div>
    );
  }

  if (props.onClick) {
    return (
      <Link onClick={props.onClick} href="" passHref>
        <div className={styles.menuButton} data-active={props.isActive}>
          <div className="iconContainer">{props.icon}</div>
          <span>{props.children}</span>
        </div>
      </Link>
    );
  }

  return (
    <Link href={props.href} passHref>
      <div className={styles.menuButton} data-active={props.isActive}>
        <div className="iconContainer">{props.icon}</div>
        <span>{props.children}</span>
      </div>
    </Link>
  );
};
