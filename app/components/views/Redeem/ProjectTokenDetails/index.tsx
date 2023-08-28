import { Anchor, Text } from "@klimadao/lib/components";
import { subgraphs, verra } from "@klimadao/lib/constants";
import { Trans, t } from "@lingui/macro";
import LaunchIcon from "@mui/icons-material/Launch";
import { RedeemablePoolToken } from "lib/hooks/useRedeemParams";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectLocale } from "state/selectors";
import * as styles from "./styles";

interface Props {
  address: string;
  pool: RedeemablePoolToken;
}

interface ProjectDetails {
  id: string;
  category: string;
  projectID: string; // VCS-123
  vintageYear: string; // 2012
  country: string;
  methodology: string;
  methodologyCategory: string;
  name: string;
  region: string;
  balanceUBO: string;
  balanceNBO: string;
  balanceBCT: string; // 123.12
  balanceNCT: string;
}

const queryProjectInfo = async (address: string): Promise<ProjectDetails> => {
  const variables = {
    address: address.toLowerCase(),
  };
  const query = `
    query ProjectToken($address: String) {
      carbonOffset(id: $address) {
        id
        category
        projectID
        vintageYear
        country
        methodology
        methodologyCategory
        name
        region
        balanceUBO
        balanceNBO
        balanceBCT
        balanceNCT
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
  const locale = useSelector(selectLocale);
  const [info, setInfo] = useState<null | ProjectDetails>(null);
  const linkToProjectDetails = (): string => {
    if (info?.projectID.includes("VCS")) {
      const projectId = info.projectID.replace("VCS-", "");
      return `${verra.projectDetailPage}/${projectId}`;
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

  const balanceKey = props.pool.toUpperCase() as Uppercase<RedeemablePoolToken>;
  const poolBalance = info[`balance${balanceKey}`];
  const formattedQuantity = Number(poolBalance).toLocaleString(locale, {
    maximumFractionDigits: 2,
  });
  return (
    <div className={styles.container}>
      <Text>{info.name || info.projectID}</Text>
      <Text t="caption">
        {info.projectID}-{info.vintageYear}
      </Text>
      <Text t="caption">{categoryString}</Text>
      {showCountry && (
        <Text t="badge" className="country">
          {info.country || info.region}
        </Text>
      )}
      <Text t="badge">
        <Trans>Tonnes available: {formattedQuantity}</Trans>
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
