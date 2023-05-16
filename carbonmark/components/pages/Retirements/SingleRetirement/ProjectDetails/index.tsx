import { KlimaRetire } from "@klimadao/lib/types/subgraph";
import { Trans } from "@lingui/macro";
import LaunchIcon from "@mui/icons-material/Launch";
import { ProjectImage } from "components/ProjectImage";
import { Text } from "components/Text";
import { CategoryName, Project } from "lib/types/carbonmark";
import Image from "next/image";
import carbonmarkLogo from "public/carbonmark.svg";
import { FC } from "react";
import * as styles from "./styles";

type Props = {
  description: Project["description"];
  retirement: Partial<KlimaRetire & { category: CategoryName }>;
};

export const ProjectDetails: FC<Props> = (props) => (
  <>
    <div className={styles.projectDetails}>
      <Text t="h4" color="lighter">
        <Trans id="retirement.single.project_details.title">
          Project Details
        </Trans>
      </Text>
      <div className={styles.imageWrapper}>
        <div className={styles.placeholder}>
          <ProjectImage category={props?.retirement?.category ?? "Other"} />
        </div>
      </div>
      <div className={styles.textGroup}>
        <Text t="button" color="lightest">
          <Trans id="retirement.single.project_name.title">Project Name</Trans>
        </Text>
        <Text>{props?.retirement?.offset?.name}</Text>
      </div>
      <div className={styles.textGroup}>
        <Text t="button" color="lightest">
          <Trans id="retirement.single.project_description.title">
            Description
          </Trans>
        </Text>
        <Text>{props?.description}</Text>
      </div>
      <Text t="button" uppercase className={styles.profileLink}>
        Learn More
        <LaunchIcon />
      </Text>
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
          Official Certificate for On-Chain Carbon Retirement Provided by
          Carbonmark.com
        </Trans>
      </Text>
    </div>
    <Text t="body2" color="lightest">
      <Trans id="retirement.single.immutable_public_records.title">
        This represents the permanent retirement of a digital carbon asset. This
        retirement and the associated data are immutable public records.
      </Trans>
    </Text>
  </>
);
