import React, { FC, useState } from "react";
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
  const [inputMode, setInputMode] = useState("project");
  const [isLoading, setIsLoading] = useState(false);

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
            active={inputMode === "project"}
            onClick={() => setInputMode("project")}
          />
          <RetirementTypeButton
            label="From 0x address"
            active={inputMode === "address"}
            onClick={() => setInputMode("address")}
          />
        </div>

        {inputMode === "project" && (
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
