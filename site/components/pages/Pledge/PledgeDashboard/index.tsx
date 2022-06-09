import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { ButtonPrimary, Text } from "@klimadao/lib/components";
import {
  concatAddress,
  getRetirementTotalsAndBalances,
} from "@klimadao/lib/utils";
import { RetirementsTotalsAndBalances } from "@klimadao/lib/types/offset";

import { PageHead } from "components/PageHead";
import { Modal } from "components/Modal";
import { useWeb3 } from "hooks/useWeb3/web3context";

import {
  AssetBalanceCard,
  FootprintCard,
  MethodologyCard,
  PledgeCard,
  RetirementsCard,
} from "./Cards";
import { PledgeForm } from "../PledgeForm";
import { PledgeLayout } from "../PledgeLayout";
import { Pledge } from "../types";
import * as styles from "./styles";

type Props = {
  pageAddress: string;
  pledge: Pledge;
};

export const PledgeDashboard: NextPage<Props> = (props) => {
  const { address, isConnected } = useWeb3();
  const [showModal, setShowModal] = useState(false);
  const [pledge, setPledge] = useState<Pledge>(props.pledge);
  const [retirements, setRetirements] =
    useState<RetirementsTotalsAndBalances | null>(null);

  const canEditPledge =
    address?.toLowerCase() === props.pageAddress && isConnected;

  const currentFootprint = pledge.footprint[pledge.footprint.length - 1];
  const totalTonnesRetired = Number(retirements?.totalTonnesRetired);
  const pledgeProgress =
    totalTonnesRetired && (totalTonnesRetired / currentFootprint.total) * 100;
  const displayPledgeProgress =
    !isNaN(totalTonnesRetired) && !isNaN(totalTonnesRetired);

  useEffect(() => {
    (async () => {
      try {
        const retirements = await getRetirementTotalsAndBalances({
          address: props.pageAddress,
        });
        setRetirements(retirements);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  const handleFormSubmit = async (data: Pledge) => {
    setPledge(data);
    setShowModal(false);
  };

  return (
    <PledgeLayout canEditPledge={canEditPledge} toggleEditModal={setShowModal}>
      <PageHead
        title="Klima Infinity | Pledge"
        mediaTitle={`${
          pledge.name || concatAddress(pledge.ownerAddress)
        }'s pledge`}
        metaDescription="Drive climate action and earn rewards with a carbon-backed digital currency." // Need better meta description
      />
      <Modal
        title="Your pledge"
        showModal={showModal}
        onToggleModal={() => setShowModal(!showModal)}
      >
        <PledgeForm
          pageAddress={props.pageAddress}
          pledge={props.pledge}
          onFormSubmit={handleFormSubmit}
        />
      </Modal>

      <div className={styles.contentContainer}>
        <div className={styles.profile}>
          {Boolean(pledge.profileImageUrl) ? (
            <img
              className="profileImage"
              src={pledge.profileImageUrl}
              alt="Profile image"
            />
          ) : (
            <Text t="h3" className="profileImage" align="center">
              -
            </Text>
          )}

          <Text t="h2">
            {pledge.name || concatAddress(pledge.ownerAddress)}
          </Text>

          <div className={styles.progressContainer}>
            <Text t="h4" color="lightest" align="center">
              Pledged to offset <strong>{currentFootprint.total}</strong> Carbon
              Tonnes
            </Text>

            {displayPledgeProgress && currentFootprint.total > 0 ? (
              <Text t="h4" className={styles.pledgeProgress}>
                {Math.round(pledgeProgress)}% of pledge met
              </Text>
            ) : null}
          </div>
        </div>

        <div className={styles.column}>
          <PledgeCard pledge={pledge.description} />
          <FootprintCard footprint={pledge.footprint} />
          <MethodologyCard methodology={pledge.methodology} />
        </div>

        <div className={styles.column}>
          <AssetBalanceCard pageAddress={props.pageAddress} />
          <RetirementsCard
            pageAddress={props.pageAddress}
            retirements={retirements}
          />
        </div>
      </div>
    </PledgeLayout>
  );
};
