import React, { FC } from "react";
import * as styles from "./styles";
import { cx } from "@emotion/css";
import { ButtonPrimary } from "@klimadao/lib/components";
import { NavItemMobileID } from "./index";
interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  name: string;
  toggledNavItemID?: string | undefined;
  id?: NavItemMobileID;
  url?: string;
  setToggledNavItemID?: (string: NavItemMobileID | undefined) => void;
  subMenu?: JSX.Element[];
  active?: boolean;
}

export const NavItemMobile: FC<Props> = (props) => {
  const activeItem = () => {
    if (!props.id || !props.toggledNavItemID) {
      return false;
    } else {
      return props.id === props.toggledNavItemID;
    }
  };
  return (
    <div className={cx(styles.navMain_MobileItem)}>
      <ButtonPrimary
        href={props.url ? props.url : undefined}
        className={cx(styles.navMain_MobileLink, {
          active: activeItem(),
        })}
        label={props.name}
        onClick={() =>
          props.setToggledNavItemID
            ? props.setToggledNavItemID(activeItem() ? undefined : props.id)
            : null
        }
      />
      {props.subMenu && (
        <div
          className={styles.navMain_MobileExpanded}
          data-show={activeItem().toString()}
        >
          {props.subMenu}
        </div>
      )}
    </div>
  );
};
