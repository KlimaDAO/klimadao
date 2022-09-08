import React, { useState, FC, useEffect } from "react";
import { t } from "@lingui/macro";
import Tippy from "@tippyjs/react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import * as styles from "./styles";

interface Props {
  label: string;
  children: JSX.Element[];
}

export const SortyByDropDown: FC<Props> = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const onToggle = () => setIsOpen((current) => !current);
  const onClose = () => setIsOpen(false);

  useEffect(() => {
    // always close dropdown if label changed
    onClose();
  }, [props.label]);

  return (
    <div className={styles.tippyContainer}>
      <Tippy
        content={<div className={styles.dropDownMenu}>{props.children}</div>}
        interactive={true}
        onClickOutside={onToggle}
        visible={isOpen}
        placement="bottom"
      >
        <button
          onClick={onToggle}
          role="button"
          className={styles.dropdownHeader}
          aria-label={t({
            id: "resources.list.select.sort_by.toggle",
            message: "Toggle Sorted by menu",
          })}
        >
          {props.label}
          <ArrowDropDownIcon />
        </button>
      </Tippy>
    </div>
  );
};
