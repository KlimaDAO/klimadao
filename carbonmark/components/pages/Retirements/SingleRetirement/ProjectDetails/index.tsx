import { Anchor as A } from "@klimadao/lib/components";
import { urls } from "@klimadao/lib/constants";
import { KlimaRetire } from "@klimadao/lib/types/subgraph";
import { t, Trans } from "@lingui/macro";
import LaunchIcon from "@mui/icons-material/Launch";
import { ProjectImage } from "components/ProjectImage";
import { Text } from "components/Text";
import { urls as carbonmarkUrls } from "lib/constants";
import { CategoryName, Project } from "lib/types/carbonmark";
import Image from "next/image";
import carbonmarkLogo from "public/carbonmark.svg";
import { FC } from "react";
import * as styles from "./styles";

type Props = {
  isMossOffset: boolean;
  category: CategoryName | null;
  description: Project["description"] | null;
  retirement: Partial<KlimaRetire & { category: CategoryName }>;
};

export const ProjectDetails: FC<Props> = (props) => {
  const isMossOffset = props?.retirement?.offset?.bridge === "Moss";
  return (
    <>
      <div className={styles.projectDetails}>
        <Text t="h4" color="lighter">
          <Trans id="retirement.single.project_details.title">
            Project Details
          </Trans>
        </Text>
        <div className={styles.imageWrapper}>
          <div className={styles.placeholder}>
            <ProjectImage category={props?.category ?? "Other"} />
          </div>
        </div>
        <div className={styles.textGroup}>
          <Text t="button" color="lightest">
            <Trans id="retirement.single.project_name.title">
              Project Name
            </Trans>
          </Text>
          <Text>{props?.retirement?.offset?.name}</Text>
        </div>
        {props?.description && (
          <div className={styles.textGroup}>
            <Text t="button" color="lightest">
              <Trans id="retirement.single.project_description.title">
                Description
              </Trans>
            </Text>
            <Text>{props.description}</Text>
          </div>
        )}
        {props?.retirement?.offset && (
          <A
            className={styles.profileLink}
            href={
              isMossOffset
                ? "https://mco2token.moss.earth/"
                : `${carbonmarkUrls.projects}/${props.retirement.offset.projectID}-${props.retirement.offset.vintageYear}`
            }
          >
            {t`Learn More`}
            <LaunchIcon />
          </A>
        )}
      </div>
      <div className={styles.officialText}>
        <Image
          width={42}
          height={42}
          src={carbonmarkLogo}
          alt="Carbonmark Logo"
        />
        <Text t="body2" color="lightest">
          <Trans id="retirement.single.official_certificate.title">
            Official Certificate for On-Chain Carbon Retirement Provided by{" "}
            <A href={urls.carbonmark}>Carbonmark.com</A>
          </Trans>
        </Text>
      </div>
      <Text t="body2" color="lightest">
        <Trans id="retirement.single.immutable_public_records.title">
          This represents the permanent retirement of a digital carbon asset.
          This retirement and the associated data are immutable public records.
        </Trans>
      </Text>
    </>
  );
};
