import React, { Dispatch, FC, SetStateAction, ReactElement } from "react";
import * as styles from "./styles";
import { cx } from "@emotion/css";
import { ButtonPrimary } from "@klimadao/lib/components";
import { NavItem } from "./index";
interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  name: string;
  id: NavItem;
  url: string;
  selected: string | undefined;
  setSelected: Dispatch<SetStateAction<NavItem | undefined>>;
  buttons?: ReactElement<any, any>[];
  active?: boolean;
}

export const NavItemMobile: FC<Props> = (props) => {
  return (
    <div className={cx(styles.navMain_MobileItem)}>
      <ButtonPrimary
        // href={props.url}
        className={cx(styles.navMain_MobileLink, {
          active: props.id === props.selected,
        })}
        label={props.name}
        onClick={() =>
          props.setSelected(props.id === props.selected ? undefined : props.id)
        }
      />
      {props.buttons && (
        <div
          className={styles.navMain_MobileExpanded}
          data-show={(props.selected === props.id).toString()}
        >
          {props.buttons}
        </div>
      )}
    </div>
  );
};
