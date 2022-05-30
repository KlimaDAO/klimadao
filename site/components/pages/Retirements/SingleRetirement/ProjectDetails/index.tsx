import { FC } from "react";
import { Text, Section } from "@klimadao/lib/components";
import { KlimaRetire } from "@klimadao/lib/types/subgraph";
import { VerraProjectDetails } from "@klimadao/lib/types/verra";

import { Trans, t } from "@lingui/macro";
import { ProjectDetail } from "./List";
import * as styles from "./styles";
import { verra, urls } from "@klimadao/lib/constants";

type Props = {
  offset: KlimaRetire["offset"];
  projectDetails?: VerraProjectDetails;
};

export const ProjectDetails: FC<Props> = (props) => {
  const { offset, projectDetails } = props;

  const isMossOffset = offset.bridge === "Moss";
  const isVerraProject = !isMossOffset && !!projectDetails?.value.length;

  return (
    <Section variant="gray" className={styles.section}>
      <div className={styles.projectDetails}>
        <div className={styles.title}>
          <Text t="h3">
            <Trans id="retirement.single.project_details.title">
              Project Details
            </Trans>
          </Text>
          <Text t="body2">
            <Trans id="retirement.single.project_details.subline">
              The following projects were retired. Click a project title to
              learn more about it.
            </Trans>
          </Text>
        </div>
        {isVerraProject &&
          projectDetails.value.map((value) => (
            <ProjectDetail
              key={value.resourceIdentifier}
              projectLink={`${verra.projectDetailPage}/${value.resourceIdentifier}`}
              headline={value.resourceName}
              tokenAddress={offset.tokenAddress}
              totalRetired={offset.totalRetired}
            />
          ))}
        {isMossOffset && (
          <ProjectDetail
            projectLink={`${urls.carbonDashboard}/MCO2`}
            headline={t({
              id: "retirement.single.project_details.moss_headline",
              message:
                "Click here to learn more about the projects that back the MCO2 pools",
            })}
            tokenAddress={offset.tokenAddress}
          />
        )}
      </div>
    </Section>
  );
};
