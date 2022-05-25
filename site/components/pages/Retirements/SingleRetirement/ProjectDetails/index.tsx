import { FC } from "react";
import { useRouter } from "next/router";
import { Text, Section, ButtonPrimary } from "@klimadao/lib/components";
import { KlimaRetire } from "@klimadao/lib/types/subgraph";
import { VerraProjectDetails } from "@klimadao/lib/types/verra";
import { trimStringDecimals } from "@klimadao/lib/utils";

import LaunchIcon from "@mui/icons-material/Launch";
import { Trans, t } from "@lingui/macro";
import * as styles from "./styles";
import { verra } from "@klimadao/lib/constants";

type Props = {
  offset: KlimaRetire["offset"];
  projectDetails: VerraProjectDetails;
};

export const ProjectDetails: FC<Props> = (props) => {
  const { offset, projectDetails } = props;
  const { locale } = useRouter();

  const totalRetired = Number(
    trimStringDecimals(offset.totalRetired, 6)
  ).toLocaleString(locale);

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
        {!!projectDetails.value.length &&
          projectDetails.value.map((value) => (
            <div className={styles.list} key={value.resourceIdentifier}>
              <Text t="h4">
                <a
                  className="link"
                  href={`${verra.projectDetailPage}/${value.resourceIdentifier}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {value.resourceName}{" "}
                  <span className="svg">
                    <LaunchIcon fontSize="inherit" />
                  </span>
                </a>
              </Text>
              <Text>
                {totalRetired}{" "}
                <Trans id="retirement.single.project_details.tonnes">
                  Tonnes
                </Trans>
              </Text>
              <div className="button_link">
                <ButtonPrimary
                  className="gray_button"
                  variant="gray"
                  href={`https://polygonscan.com/address/${offset.tokenAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  label={t({
                    id: "retirement.single.project_details.view_on_polygon_scan",
                    message: "View on Polygonscan",
                  })}
                />
              </div>
            </div>
          ))}
      </div>
    </Section>
  );
};
