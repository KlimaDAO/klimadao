import React, { useState, FC, useEffect } from "react";
import { t } from "@lingui/macro";
import Tippy from "@tippyjs/react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Asset } from "@klimadao/lib/types/marketplace";

import * as styles from "./styles";

interface Props {
  setValue: (field: "tokenAddress", value: string) => void;
  assets: Asset[];
  selectedAsset: Asset;
}

export const ProjectTokenDropDown: FC<Props> = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const onToggle = () => setIsOpen((current) => !current);
  const onClose = () => setIsOpen(false);

  useEffect(() => {
    // always close dropdown if label changed
    onClose();
  }, [props.selectedAsset]);

  return (
    <div className={styles.tippyContainer}>
      <Tippy
        content={
          <div className={styles.dropDownMenu}>
            {props.assets.map((asset) => (
              <button
                key={asset.tokenAddress}
                className={styles.projectButton}
                onClick={() =>
                  props.setValue("tokenAddress", asset.tokenAddress)
                }
                role="button"
                aria-label={asset.tokenName}
                data-active={
                  props.selectedAsset.tokenAddress === asset.tokenAddress
                }
              >
                {asset.projectName}
              </button>
            ))}
          </div>
        }
        interactive={true}
        onClickOutside={onToggle}
        visible={isOpen}
        placement="bottom-end"
        appendTo="parent"
      >
        <button
          onClick={onToggle}
          role="button"
          className={styles.dropdownHeader}
          aria-label={t({
            id: "resources.list.select.sort_by.toggle",
            message: "Toggle Select Project",
          })}
        >
          <span>{props.selectedAsset?.projectName || "not found"}</span>
          <ArrowDropDownIcon />
        </button>
      </Tippy>
    </div>
  );
};
