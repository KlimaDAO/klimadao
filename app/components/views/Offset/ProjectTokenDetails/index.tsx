import { Anchor, Text } from "@klimadao/lib/components";
import { goldStandard, verra } from "@klimadao/lib/constants";
import { Trans, t } from "@lingui/macro";
import LaunchIcon from "@mui/icons-material/Launch";
import { subgraphs } from "lib/constants";
import { useEffect, useState } from "react";
import * as styles from "./styles";

interface Props {
  /** @example `C3T-GS-500-2020` | `TCO2-VCS-191-2009` */
  symbol: string;
  address: string;
  quantity: string;
}

interface ProjectDetails {
  id: string;
  category: string;
  projectID: string;
  country: string;
  methodology: string;
  methodologyCategory: string;
  name: string;
  region: string;
  vintage: string;
  vintageYear: string;
}

const queryProjectInfo = async (address: string): Promise<ProjectDetails> => {
  const variables = {
    address,
  };
  const query = `
    query ProjectToken($address: String) {
      carbonOffset(id: $address) {
        id
        category
        projectID
        country
        methodology
        methodologyCategory
        name
        region
        vintage
      }
    }
  `;
  const body = JSON.stringify({
    variables,
    query,
  });
  const res = await fetch(subgraphs.polygonBridgedCarbon, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  });
  const json: { data: { carbonOffset: ProjectDetails } } = await res.json();
  if (!res.ok || !json.data || !json.data.carbonOffset)
    throw new Error(JSON.stringify(json));
  return json.data.carbonOffset;
};

export const ProjectTokenDetails = (props: Props) => {
  const [info, setInfo] = useState<null | ProjectDetails>(null);
  const linkToProjectDetails = (): string => {
    if (props.symbol.includes("VCS")) {
      const projectId = props.symbol.split("-")[2];
      return `${verra.projectDetailPage}/${projectId}`;
    }

    if (props.symbol.includes("GS")) {
      const projectId = props.symbol.split("-")[2];
      return `${goldStandard.projectDetailPage}/${projectId}`;
    }
    return "#";
  };

  useEffect(() => {
    const fetchProjectInfo = async () => {
      if (info) setInfo(null); // trigger loading
      const newInfo = await queryProjectInfo(props.address);
      setInfo(newInfo);
    };

    fetchProjectInfo();
  }, [props.address]);

  if (!info) {
    return (
      <div className={styles.container}>
        <Text t="caption" color="lightest">
          <Trans>Loading project info...</Trans>
        </Text>
      </div>
    );
  }

  const categoryString = `${info.methodology || t`Unknown methodology`} - ${
    info.methodologyCategory || t`Unknown category`
  }`;

  const showCountry = !!info.country || !!info.region;

  return (
    <div className={styles.container}>
      <Text>{info.name || info.projectID}</Text>
      <Text t="caption">{categoryString}</Text>
      {showCountry && (
        <Text t="badge" className="country">
          {info.country || info.region}
        </Text>
      )}
      <Text t="badge">
        <Trans>Tonnes available: {props.quantity}</Trans>
      </Text>
      <Anchor href={linkToProjectDetails()}>
        <Text t="button" as="span" className="projectDetails">
          <Trans>
            Project details <LaunchIcon />
          </Trans>
        </Text>
      </Anchor>
    </div>
  );
};
