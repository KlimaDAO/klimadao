import { Text } from "@klimadao/lib/components";
import { verra } from "@klimadao/lib/constants";
import { KlimaRetire } from "@klimadao/lib/types/subgraph";
import { t, Trans } from "@lingui/macro";
import { normalizeProjectId } from "lib/normalizeProjectId";
import { FC } from "react";

import { ProjectDetail } from "./List";
import * as styles from "./styles";

type Props = {
  retire: KlimaRetire["retire"];
};

const constructVerraUrl = (id: string) => {
  const split = id.split("-");
  const resourceIdentifier = split[split.length - 1]; // might not have prefix
  return `${verra.projectDetailPage}/${resourceIdentifier}`;
};

export const ProjectDetails: FC<Props> = (props) => {
  const isMossOffset = props.retire.credit.bridgeProtocol === "MOSS";
  return (
    <div className={styles.projectDetails}>
      <div className={styles.title}>
        <Text t="h3">
          <Trans id="retirement.single.project_details.title">
            Project Details
          </Trans>
        </Text>
        <div>
          <Text t="body2">
            <Trans>
              <Trans>
                Every KlimaDAO retirement is tied to a verified offset project.
                Click to learn more about the project.
              </Trans>
            </Trans>
          </Text>
        </div>
      </div>
      <ProjectDetail
        projectLink={
          isMossOffset
            ? "https://mco2token.moss.earth/"
            : constructVerraUrl(props.retire.credit.project.projectID)
        }
        headline={
          isMossOffset
            ? t`MCO2 Token`
            : props.retire.credit.project.name ||
              normalizeProjectId({
                id: props.retire.credit.project.projectID,
                standard: props.retire.credit.project.registry,
              })
        }
        tokenAddress={props.retire.credit.id}
        isMossOffset={isMossOffset}
        totalRetired={props.retire.credit.retired}
        currentSupply={props.retire.credit.currentSupply}
        methodology={props.retire.credit.project.methodologies[0]}
        location={
          props.retire.credit.project.country ||
          props.retire.credit.project.region
        }
      />
    </div>
  );
};
