import { Text } from "@klimadao/lib/components";
import { verra } from "@klimadao/lib/constants";
import { KlimaRetire } from "@klimadao/lib/types/subgraph";
import { t, Trans } from "@lingui/macro";
import { FC } from "react";

import { ProjectDetail } from "./List";
import * as styles from "./styles";

type Props = {
  offset: KlimaRetire["offset"];
};

const normalizeProjectId = (id: string, standard: string) => {
  if (id.startsWith("VCS-") || id.startsWith("GS-")) return id;
  return `${standard}-${id}`;
};

const constructVerraUrl = (id: string) => {
  const split = id.split("-");
  const resourceIdentifier = split[split.length - 1]; // might not have prefix
  return `${verra.projectDetailPage}/${resourceIdentifier}`;
};

export const ProjectDetails: FC<Props> = (props) => {
  const isMossOffset = props.offset.bridge === "Moss";
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
            : constructVerraUrl(props.offset.projectID)
        }
        headline={
          isMossOffset
            ? t`MCO2 Token`
            : props.offset.name ||
              normalizeProjectId(props.offset.projectID, props.offset.standard)
        }
        tokenAddress={props.offset.tokenAddress}
        isMossOffset={isMossOffset}
        totalRetired={props.offset.totalRetired}
        currentSupply={props.offset.currentSupply}
        methodology={props.offset.methodology}
        location={props.offset.country || props.offset.region}
      />
    </div>
  );
};
