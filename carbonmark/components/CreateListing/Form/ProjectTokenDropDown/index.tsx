import { Asset } from "@klimadao/lib/types/carbonmark";
import { t } from "@lingui/macro";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Tippy from "@tippyjs/react";
import { FC, useEffect, useState } from "react";

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

  // do not toggle a dropdown when there are no further selections
  const isDisabled = props.assets.length === 1;

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
        onShow={({ popper, reference }) => {
          popper.style.width = reference.getBoundingClientRect().width + "px";
        }}
        interactive={true}
        onClickOutside={onToggle}
        visible={isOpen}
        placement="bottom-start"
        appendTo="parent"
        disabled={isDisabled}
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
          {!isDisabled && <ArrowDropDownIcon />}
        </button>
      </Tippy>
    </div>
  );
};
