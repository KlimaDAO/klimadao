import { t } from "@lingui/macro";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import Tippy from "@tippyjs/react";
import { Asset } from "lib/types/carbonmark.types";
import { FC, useEffect, useState } from "react";

import * as styles from "./styles";

interface Props {
  onTokenSelect: (a: Asset) => void;
  assets: Asset[];
  selectedAsset: Asset;
}

/**@todo replace with /carbonmark/components/Dropdown */
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

  const ArrowIcon = isOpen ? ArrowDropUpIcon : ArrowDropDownIcon;

  return (
    <div className={styles.tippyContainer}>
      <Tippy
        content={
          <div className={styles.dropDownMenu}>
            {props.assets.map((asset) => (
              <button
                key={asset.token.id.toLowerCase()}
                className={styles.projectButton}
                onClick={() => props.onTokenSelect(asset)}
                role="button"
                aria-label={asset.token.symbol}
                data-active={
                  props.selectedAsset.token.id.toLowerCase() ===
                  asset.token.id.toLowerCase()
                }
              >
                {asset.token.symbol || asset.token.name}
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
        arrow="none"
        disabled={isDisabled}
      >
        <button
          onClick={onToggle}
          role="button"
          className={styles.dropdownHeader}
          aria-label={t`Toggle Select Project`}
        >
          <span>
            {props.selectedAsset.token.symbol || props.selectedAsset.token.name}
          </span>
          {!isDisabled && <ArrowIcon fontSize="large" />}
        </button>
      </Tippy>
    </div>
  );
};
