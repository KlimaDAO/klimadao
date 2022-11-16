import React, { useState, FC, useEffect } from "react";
import { t } from "@lingui/macro";
import Tippy from "@tippyjs/react";
import { Control, useWatch } from "react-hook-form";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Asset } from "@klimadao/lib/types/marketplace";
import { FormValues } from "../AddListing";

import * as styles from "./styles";

interface Props {
  control: Control<FormValues>;
  setValue: (field: "tokenAddress", value: string) => void;
  assets: Asset[];
}

export const ProjectTokenDropDown: FC<Props> = (props) => {
  const selectedTokenAddress = useWatch({
    name: "tokenAddress",
    control: props.control,
  });

  const [isOpen, setIsOpen] = useState(false);

  const onToggle = () => setIsOpen((current) => !current);
  const onClose = () => setIsOpen(false);

  const selectedAsset = props.assets.find(
    (t) => t.tokenAddress === selectedTokenAddress
  );

  useEffect(() => {
    // always close dropdown if label changed
    onClose();
  }, [selectedTokenAddress]);

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
                data-active={selectedTokenAddress === asset.tokenAddress}
              >
                {asset.tokenName}
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
          {selectedAsset?.tokenName || "not found"}
          <ArrowDropDownIcon />
        </button>
      </Tippy>
    </div>
  );
};
