import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { utils } from "ethers";
import { Trans, t } from "@lingui/macro";
import { Text, TextInfoTooltip } from "@klimadao/lib/components";

import InfoOutlined from "@mui/icons-material/InfoOutlined";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

import * as styles from "./styles";

type Props = {
  projectAddress: string;
  onChange: (val: string) => void;
};

export const SelectiveRetirementInput: FC<Props> = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  /** when query params are loaded we force the toggle open */
  useEffect(() => {
    if (!isOpen && !!props.projectAddress) {
      setIsOpen(true);
    }
  }, [props.projectAddress]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    props.onChange(e.target.value);

  return (
    <>
      {/* <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={styles.advancedButton}
      >
        {isOpen ? <KeyboardArrowDown /> : <KeyboardArrowRight />}
        <Text t="caption" color="lightest" uppercase>
          <Trans id="advanced">ADVANCED</Trans>
        </Text>
      </button> */}

      <div className={styles.input}>
        <label>
          <Text t="caption" color="lighter">
            <Trans id="offset.retire_specific">
              Retire specific project tokens
            </Trans>
          </Text>
          <TextInfoTooltip
            content={
              <Trans id="offset.retire_specific_tooltip">
                Subject to additional fee, determined by the selected pool and
                paid to the bridge provider.
              </Trans>
            }
          >
            <InfoOutlined />
          </TextInfoTooltip>
        </label>

        <input
          value={props.projectAddress}
          onChange={handleChange}
          placeholder={t({
            id: "offset.enter_address",
            message: "Enter 0x address",
          })}
          data-error={
            !!props.projectAddress && !utils.isAddress(props.projectAddress)
          }
          pattern="^0x[a-fA-F0-9]{40}$"
        />
      </div>
    </>
  );
};
