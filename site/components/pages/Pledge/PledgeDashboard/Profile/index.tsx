import { Anchor, Text } from "@klimadao/lib/components";
import { Domain } from "@klimadao/lib/types/domains";
import { RetirementsTotalsAndBalances } from "@klimadao/lib/types/offset";
import {
  concatAddress,
  getENSProfile,
  getInfuraUrl,
  getKNSProfile,
  prettifyUrl,
  trimWithLocale,
} from "@klimadao/lib/utils";
import { Trans } from "@lingui/macro";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";

import { Pledge } from "../../types";
import * as styles from "./styles";

type Props = {
  domain: string | null;
  retirements: RetirementsTotalsAndBalances | null;
  pledge: Pledge;
};

export const Profile: FC<Props> = (props) => {
  const { locale } = useRouter();
  const [profileData, setProfileData] = useState<Domain | null>(null);

  useEffect(() => {
    if (!props.domain) return;

    const setProfile = async () => {
      const kns = await getKNSProfile({
        address: props.pledge.ownerAddress,
        providerUrl: getInfuraUrl({
          chain: "polygon",
          infuraId: process.env.NEXT_PUBLIC_INFURA_ID as string,
        }),
      });
      if (kns) return setProfileData(kns);

      const ens = await getENSProfile({
        address: props.pledge.ownerAddress,
        providerUrl: getInfuraUrl({
          chain: "eth",
          infuraId: process.env.NEXT_PUBLIC_INFURA_ID as string,
        }),
      });

      setProfileData(ens);
    };

    setProfile();
  }, [props.domain]);

  const hasProfileImage = props.pledge.profileImageUrl || profileData;
  const profileUrl = props.pledge.profileWebsiteUrl;

  const currentFootprint =
    props.pledge.footprint[props.pledge.footprint.length - 1];
  const totalTonnesRetired = Number(props.retirements?.totalTonnesRetired);
  const pledgeProgress =
    totalTonnesRetired && (totalTonnesRetired / currentFootprint.total) * 100;
  const displayPledgeProgress =
    !isNaN(totalTonnesRetired) && currentFootprint.total > 0;

  const renderPledgeProgress = () => {
    if (!displayPledgeProgress) return null;

    if (pledgeProgress >= 100) {
      return (
        <Text t="h4" className={styles.pledgeProgress}>
          <Trans id="pledges.dashboard.profile.pledge_met">
            ≥ 100% of Pledge Met
          </Trans>
        </Text>
      );
    }

    return (
      <Text t="h4" className={styles.pledgeProgress}>
        <Trans id="pledges.dashboard.profile.pledge_progress">
          {Math.round(pledgeProgress)}% of Pledge Met
        </Trans>
      </Text>
    );
  };

  return (
    <div className={styles.profile}>
      {hasProfileImage && (
        <img
          className="profileImage"
          src={props.pledge.profileImageUrl || profileData?.imageUrl}
          alt="Profile image"
        />
      )}
      <div className={styles.grouped}>
        <Text t="h2">
          {props.pledge.name ||
            props.domain ||
            concatAddress(props.pledge.ownerAddress)}
        </Text>

        {!!profileUrl && (
          <Text t="body1">
            <Anchor className="profileUrl" href={profileUrl}>
              {prettifyUrl(profileUrl)}
            </Anchor>
          </Text>
        )}
      </div>

      <Text t="h4" color="lightest" align="center">
        <Trans id="pledges.dashboard.profile.pledged_to_offset">
          Pledged to Offset{" "}
          <strong>{trimWithLocale(currentFootprint.total, 2, locale)}</strong>{" "}
          Carbon Tonnes
        </Trans>
      </Text>

      {renderPledgeProgress()}
    </div>
  );
};
