import React, { FC, useEffect, useState } from "react";
import { Text } from "@klimadao/lib/components";
import { concatAddress, getKNSProfile } from "@klimadao/lib/utils";
import { Domain } from "@klimadao/lib/types/domains";
import { RetirementsTotalsAndBalances } from "@klimadao/lib/types/offset";

import { getInfuraUrlPolygon } from "lib/getInfuraUrl";
import { Pledge } from "../../types";
import * as styles from "./styles";

type Props = {
  domain: string | null;
  retirements: RetirementsTotalsAndBalances | null;
  pledge: Pledge;
};

export const Profile: FC<Props> = (props) => {
  const [profileData, setProfileData] = useState<Domain | null>();

  useEffect(() => {
    // TODO resolve ens profile avatar
    const setKNSProfile = async () => {
      const data = await getKNSProfile({
        address: props.pledge.ownerAddress,
        providerUrl: getInfuraUrlPolygon(),
      });

      setProfileData(data);
    };

    setKNSProfile();
  }, []);

  const hasProfileImage = props.pledge.profileImageUrl || profileData;
  const currentFootprint =
    props.pledge.footprint[props.pledge.footprint.length - 1];
  const totalTonnesRetired = Number(props.retirements?.totalTonnesRetired);
  const pledgeProgress =
    totalTonnesRetired && (totalTonnesRetired / currentFootprint.total) * 100;
  const displayPledgeProgress =
    !isNaN(totalTonnesRetired) &&
    !isNaN(totalTonnesRetired) &&
    currentFootprint.total > 0;

  const renderPledgeProgress = () => {
    if (!displayPledgeProgress) return null;

    if (pledgeProgress >= 100) {
      return (
        <Text t="h4" className={styles.pledgeProgress}>
          &ge; 100% of pledge met
        </Text>
      );
    }

    return (
      <Text t="h4" className={styles.pledgeProgress}>
        {Math.round(pledgeProgress)}% of pledge met
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
          Pledged to offset{" "}
          <strong>{+currentFootprint.total.toFixed(2)}</strong> Carbon Tonnes
        </Text>

        {renderPledgeProgress()}
      </div>
    </div>
  );
};
