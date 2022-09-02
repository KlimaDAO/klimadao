import React, { FC } from "react";
import * as styles from "./styles";
import { cx } from "@emotion/css";
import Link from "next/link";
import { ButtonPrimary } from "@klimadao/lib/components";
import { NavItemMobileID } from "./index";
interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  name: string;
  id?: NavItemMobileID;
  url?: string;
  toggledNavItemID?: string | undefined;
  setToggledNavItemID?: (string: NavItemMobileID | undefined) => void;
  subMenu?: JSX.Element[];
  active?: boolean;
}

export const NavItemMobile: FC<Props> = (props) => {
  const isToggled =
    !!props.id &&
    !!props.toggledNavItemID &&
    props.id === props.toggledNavItemID;
  const onToggleSubmenu = () => {
    if (isToggled && props.setToggledNavItemID)
      return props.setToggledNavItemID(undefined);
    props.setToggledNavItemID &&
      props.id &&
      props.setToggledNavItemID(props.id);
  };

  return (
    <div className={cx(styles.navMain_MobileItem)}>
      <ButtonPrimary
        href={props.url}
        className={cx(styles.navMain_MobileLink, {
          active: isToggled,
        })}
        label={props.name}
        onClick={onToggleSubmenu}
        link={Link}
      />
      {props.subMenu && (
        <div
          className={styles.navMain_MobileExpanded}
          data-show={isToggled.toString()}
        >
          {props.subMenu}
        </div>
      )}
    </div>
  );
};
