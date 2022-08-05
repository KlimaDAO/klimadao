import React, { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Trans } from "@lingui/macro";
import { Text } from "@klimadao/lib/components";
import {
  concatAddress,
  getENSProfile,
  getKNSProfile,
} from "@klimadao/lib/utils";
import { Domain } from "@klimadao/lib/types/domains";
import { RetirementsTotalsAndBalances } from "@klimadao/lib/types/offset";
import { trimWithLocale } from "@klimadao/lib/utils";

import { getInfuraUrlPolygon } from "lib/getInfuraUrl";
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
        providerUrl: getInfuraUrlPolygon(),
      });
      if (kns) return setProfileData(kns);

      const ens = await getENSProfile({ address: props.pledge.ownerAddress });
      setProfileData(ens);
    };

    setProfile();
  }, [props.domain]);

  const hasProfileImage = props.pledge.profileImageUrl || profileData;

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
            &ge; 100% of Pledge Met
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
      {hasProfileImage ? (
        <>
          <img
            className="profileImage"
            src={props.pledge.profileImageUrl || profileData?.imageUrl}
            alt="Profile image"
          />
        </>
      ) : (
        <Text t="h3" className="profileImage" align="center">
          -
        </Text>
      )}

      <Text t="h2">
        {props.pledge.name ||
          props.domain ||
          concatAddress(props.pledge.ownerAddress)}
      </Text>

      <div className={styles.progressContainer}>
        <Text t="h4" color="lightest" align="center">
          <Trans id="pledges.dashboard.profile.pledged_to_offset">
            Pledged to Offset{" "}
            <strong>{trimWithLocale(currentFootprint.total, 2, locale)}</strong>{" "}
            Carbon Tonnes
          </Trans>
        </Text>

        {renderPledgeProgress()}
      </div>
    </div>
  );
};
