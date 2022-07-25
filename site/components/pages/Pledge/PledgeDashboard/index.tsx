import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import {
  concatAddress,
  getRetirementTotalsAndBalances,
  useWeb3,
} from "@klimadao/lib/utils";
import { RetirementsTotalsAndBalances } from "@klimadao/lib/types/offset";

import { PageHead } from "components/PageHead";
import { Modal } from "components/Modal";

import {
  AssetBalanceCard,
  FootprintCard,
  MethodologyCard,
  PledgeCard,
  RetirementsCard,
} from "./Cards";
import { Profile } from "./Profile";
import { PledgeForm } from "../PledgeForm";
import { PledgeLayout } from "../PledgeLayout";
import { Pledge } from "../types";
import * as styles from "./styles";

type Props = {
  canonicalUrl: string;
  domain: string | null;
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
          pledge.name || props.domain || concatAddress(pledge.ownerAddress)
        }'s pledge`}
        metaDescription="Drive climate action and earn rewards with a carbon-backed digital currency." // Need better meta description
        canonicalUrl={props.canonicalUrl}
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
        <Profile
          domain={props.domain}
          pledge={props.pledge}
          retirements={retirements}
        />

        <div className={styles.column}>
          <PledgeCard pledge={pledge.description} />
          <FootprintCard footprint={pledge.footprint} />
          <MethodologyCard methodology={pledge.methodology} />
        </div>

        <div className={styles.column}>
          <AssetBalanceCard
            holdings={props.holdings}
            pageAddress={props.pageAddress}
          />
          <RetirementsCard retirements={retirements} pageAddress={props.pageAddress} />
        </div>
      </div>
    </PledgeLayout>
  );
};
