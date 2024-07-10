import { Text, TextInfoTooltip } from "@klimadao/lib/components";
import { RetirementToken } from "@klimadao/lib/constants";
import { Trans, t } from "@lingui/macro";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import { LeafIcon } from "components/LeafIcon";
import { FC, useEffect, useState } from "react";
import { LoadingOverlay } from "../LoadingOverlay";
import { ProjectSearch } from "../ProjectSearch";
import { RetirementTypeButton } from "../RetirementTypeButton";
import { SelectiveRetirementInput } from "../SelectiveRetirementInput";
import { CarbonProject } from "./queryProjectDetails";
import * as styles from "./styles";

type Props = {
  projectAddress: string;
  selectedRetirementToken: RetirementToken;
  setProjectAddress: (address: string) => void;
  selectedProject: CarbonProject | null;
  setSelectedProject: (project: CarbonProject | null) => void;
  disableDefault?: boolean;
};

type InputMode = "default" | "search" | "address";

export const SelectiveRetirement: FC<Props> = (props) => {
  const defaultMode = props.disableDefault
    ? "search"
    : props.projectAddress
    ? "address"
    : "default";
  const [inputMode, setInputMode] = useState<InputMode>(defaultMode);
  const [isLoading, setIsLoading] = useState(false);

  const disableSelectiveRetirement = props.selectedRetirementToken === "mco2";

  /** toggle input via address when query params are loaded */
  useEffect(() => {
    if (!props.selectedProject && !!props.projectAddress) {
      setInputMode("address");
    }
  }, [props.projectAddress]);

  /** clear selection when different retirement token is selected */
  useEffect(() => {
    if (props.selectedProject) {
      props.setSelectedProject(null);
      props.setProjectAddress("");
      setInputMode(defaultMode);
    }
  }, [props.selectedRetirementToken]);

  return (
    <div className={styles.container}>
      <div className={styles.label}>
        <Text t="caption" color="lighter">
          <Trans id="offset.retire_specific">
            Retire specific project tokens (optional)
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
            label={t({
              id: "offset.selectiveRetirement.default_input_type",
              message: "Default",
            })}
            active={inputMode === "default"}
            disabled={props.disableDefault}
            onClick={() => {
              props.setProjectAddress("");
              setInputMode("default");
            }}
          />
          <RetirementTypeButton
            label={t({
              id: "offset.selectiveRetirement.search_input_type",
              message: "Find project",
            })}
            active={inputMode === "search"}
            disabled={disableSelectiveRetirement}
            onClick={() => setInputMode("search")}
          />
          <RetirementTypeButton
            label={t({
              id: "offset.selectiveRetirement.address_input_type",
              message: "0x Address",
            })}
            active={inputMode === "address"}
            disabled={disableSelectiveRetirement}
            onClick={() => setInputMode("address")}
          />
        </div>

        {inputMode === "default" && (
          <div className={styles.defaultText}>
            <LeafIcon />
            <Text t="body8" align="center">
              <Trans id="offset.selectiveRetirement.retire_from_default_pool">
                Allow the default project in the pool to be retired. This option
                avoids paying extra fees.
              </Trans>
            </Text>
          </div>
        )}

        {inputMode === "search" && (
          <ProjectSearch
            projectAddress={props.projectAddress}
            selectedProject={props.selectedProject}
            selectedRetirementToken={props.selectedRetirementToken}
            setSelectedProject={props.setSelectedProject}
            setIsLoading={setIsLoading}
            setProjectAddress={props.setProjectAddress}
          />
        )}

        {inputMode === "address" && (
          <SelectiveRetirementInput
            projectAddress={props.projectAddress}
            setProjectAddress={props.setProjectAddress}
            disabled={!!props.selectedProject}
          />
        )}
      </div>
    </div>
  );
};
