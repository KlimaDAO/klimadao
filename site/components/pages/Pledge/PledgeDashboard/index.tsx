import React, { useState } from "react";
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

  const pledgeOwnerTitle =
    pledge.name || props.domain || concatAddress(pledge.ownerAddress);

  return (
    <PledgeLayout canEditPledge={canEditPledge} toggleEditModal={setShowModal}>
      <PageHead
        title={t({
          id: "pledges.dashboard.head.title",
          message: "KlimaDAO | Pledges",
        })}
        mediaTitle={t({
          id: "pledges.dashboard.head.metaTitle",
          message: `${pledgeOwnerTitle}'s pledge`,
        })}
        metaDescription={t({
          id: "shared.head.description",
          message:
            "Drive climate action and earn rewards with a carbon-backed digital currency.", // Do we need a better metadescription??
        })}
        canonicalUrl={props.canonicalUrl}
      />
      <Modal
        title={t({
          id: "pledges.form.title",
          message: "Your Pledge",
        })}
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
          pledge={pledge}
          retirements={props.retirements}
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
          <RetirementsCard
            retirements={props.retirements}
            pageAddress={props.pageAddress}
          />
        </div>
      </div>
    </PledgeLayout>
  );
};
