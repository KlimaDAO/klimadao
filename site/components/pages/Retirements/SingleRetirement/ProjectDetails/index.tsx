import { FC } from "react";
import { Text } from "@klimadao/lib/components";
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
    <div className={styles.projectDetails}>
      <div className={styles.title}>
        <Text t="h3">
          <Trans id="retirement.single.project_details.title">
            Project Details
          </Trans>
        </Text>
        <Text t="body2">
          <Trans id="retirement.single.project_details.subline">
            The tonne(s) retired originated from the following project(s).
          </Trans>
        </Text>
        {isVerraProject && (
          <Text t="body2">
            <Trans id="retirement.single.project_details.click_on_project">
              Click on the project title to learn more.
            </Trans>
          </Text>
        )}
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
            message: "Learn more about the projects that back the MCO2 pools",
          })}
          tokenAddress={offset.tokenAddress}
        />
      )}
    </div>
  );
};
