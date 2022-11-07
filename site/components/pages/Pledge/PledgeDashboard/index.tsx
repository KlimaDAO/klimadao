import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { t } from "@lingui/macro";
import { concatAddress, useWeb3 } from "@klimadao/lib/utils";
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
import { Holding, Pledge } from "../types";
import * as styles from "./styles";

type Props = {
  canonicalUrl: string;
  domain: string | null;
  holdings: Holding[];
  pageAddress: string;
  pledge: Pledge;
  retirements: RetirementsTotalsAndBalances;
};

export const PledgeDashboard: NextPage<Props> = (props) => {
  const { address, isConnected } = useWeb3();
  const [showModal, setShowModal] = useState(false);
  const [pledge, setPledge] = useState<Pledge>(props.pledge);

  const canEditPledge =
    address?.toLowerCase() === props.pageAddress && isConnected;

  const handleFormSubmit = async (data: Pledge) => {
    setPledge(data);
    setShowModal(false);
  };

  /**
   * Close the modal on escape press
   * @todo extract as generic modal behaviour
   */
  useEffect(() => {
    const escListener = (e: KeyboardEvent) =>
      e.key === "Escape" && showModal && setShowModal(false);

    window.addEventListener("keydown", escListener);
    return () => window.removeEventListener("keydown", escListener);
  }, []);

  const pledgeOwnerTitle =
    pledge.name || props.domain || concatAddress(pledge.ownerAddress);
  const currentTotalFootprint =
    pledge.footprint[pledge.footprint.length - 1].total.toString();

  return (
    <PledgeLayout canEditPledge={canEditPledge} toggleEditModal={setShowModal}>
      <PageHead
        title={t({
          id: "pledges.dashboard.head.title",
          message: `${pledgeOwnerTitle}'s Pledge | KlimaDAO`,
        })}
        mediaTitle={t({
          id: "pledges.dashboard.head.metaTitle",
          message: `${pledgeOwnerTitle}'s Pledge`,
        })}
        metaDescription={t({
          id: "pledges.dashboard.head.metaDescription",
          message: `${pledgeOwnerTitle} pledges to Offset ${currentTotalFootprint} Carbon Tonnes. View their carbon offset history and read more about their commitment.`,
        })}
        canonicalUrl={props.canonicalUrl}
      />
      <Modal
        title={t({ id: "pledges.form.title", message: "Your Pledge" })}
        showModal={showModal}
        onToggleModal={() => setShowModal(!showModal)}
      >
        <PledgeForm
          pageAddress={props.pageAddress}
          pledge={pledge}
          onFormSubmit={handleFormSubmit}
        />
      </Modal>

      <div className={styles.contentContainer}>
        <Profile
          domain={props.domain}
          pledge={pledge}
          retirements={props.retirements}
        />

        <div className={styles.column}>
          <PledgeCard pledge={pledge.description} />
          <FootprintCard footprint={pledge.footprint} />
          <MethodologyCard methodology={pledge.methodology} />
        </div>

        <div className={styles.column}>
          <RetirementsCard
            retirements={props.retirements}
            pageAddress={props.pageAddress}
          />
          <AssetBalanceCard
            holdings={props.holdings}
            pageAddress={props.pageAddress}
          />
        </div>
      </div>
    </PledgeLayout>
  );
};
