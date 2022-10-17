import React, { FC, useEffect, useState } from "react";
import { Trans } from "@lingui/macro";
import { Text, TextInfoTooltip } from "@klimadao/lib/components";
import InfoOutlined from "@mui/icons-material/InfoOutlined";

import { SelectiveRetirementInput } from "../SelectiveRetirementInput";
import { RetirementTypeButton } from "../RetirementTypeButton";
import { LoadingOverlay } from "../LoadingOverlay";
import { ProjectSearch } from "../ProjectSearch";

import * as styles from "./styles";

type Props = {
  projectAddress: string;
  setProjectAddress: (address: string) => void;
};

export const SelectiveRetirement: FC<Props> = (props) => {
  const [inputMode, setInputMode] = useState<"search" | "address">("search");
  const [isLoading, setIsLoading] = useState(false);

  /** toggle input via address when query params are loaded */
  useEffect(() => {
    if (!!props.projectAddress) {
      setInputMode("address");
    }
  }, [props.projectAddress]);

  return (
    <div className={styles.container}>
      <div className={styles.label}>
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
      </div>

      <div className={styles.secondaryContainer}>
        <div className={styles.options}>
          {isLoading && <LoadingOverlay />}

          <RetirementTypeButton
            label="From project"
            active={inputMode === "search"}
            onClick={() => setInputMode("search")}
          />
          <RetirementTypeButton
            label="From 0x address"
            active={inputMode === "address"}
            onClick={() => setInputMode("address")}
          />
        </div>

        {inputMode === "search" && (
          <ProjectSearch
            setIsLoading={setIsLoading}
            setProjectAddress={props.setProjectAddress}
          />
        )}

        {inputMode === "address" && (
          <SelectiveRetirementInput
            projectAddress={props.projectAddress}
            setProjectAddress={props.setProjectAddress}
          />
        )}
      </div>
    </div>
  );
};
