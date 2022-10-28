import React, { useState, useEffect } from "react";
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
import { AcceptModal, RemoveModal } from "../InvitationModals";
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
  const [showFormModal, setShowFormModal] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [pledge, setPledge] = useState<Pledge>(props.pledge);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showAcceptModal, setShowAcceptModal] = useState(false);

  const isUnverifiedSecondaryWallet =
    props.pledge.wallets &&
    Object.values(props.pledge.wallets)?.some(
      (wallet) => wallet.address === address && wallet.status === "pending"
    );
  const isVerifiedSecondaryWallet =
    props.pledge.wallets &&
    Object.values(props.pledge.wallets)?.some(
      (wallet) => wallet.address === address && wallet.status === "verified"
    );

  useEffect(() => {
    isUnverifiedSecondaryWallet && setShowAcceptModal(true);
  }, [isUnverifiedSecondaryWallet]);

  const isPledgeOwner =
    address?.toLowerCase() === props.pageAddress && isConnected;
  const canEditPledge =
    (address?.toLowerCase() === props.pageAddress && isConnected) ||
    isVerifiedSecondaryWallet;

  const handleFormSubmit = async (data: Pledge) => {
    setPledge(data);
    setShowFormModal(false);
  };

  const pledgeOwnerTitle =
    pledge.name || props.domain || concatAddress(pledge.ownerAddress);
  const currentTotalFootprint =
    pledge.footprint[pledge.footprint.length - 1].total.toString();

  return (
    <PledgeLayout
      canEditPledge={canEditPledge}
      toggleEditModal={isPledgeOwner ? setShowFormModal : setShowRemoveModal}
    >
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
      <AcceptModal
        pledge={props.pledge}
        pageAddress={props.pageAddress}
        showAcceptModal={showAcceptModal}
        setShowAcceptModal={setShowAcceptModal}
      />
      <RemoveModal
        pledge={props.pledge}
        pageAddress={props.pageAddress}
        showRemoveModal={showRemoveModal}
        setShowRemoveModal={setShowRemoveModal}
      />
      {/* conditional props are used here because unmounting the modal will clear form state when `isDeleteMode` is changed */}
      <Modal
        title={
          !isDeleteMode
            ? t({
                id: "pledges.form.title",
                message: "Your pledge",
              })
            : t({
                id: "pledges.form.confirm_delete",
                message: "confirm removal",
              })
        }
        showModal={showFormModal}
        onToggleModal={() =>
          isDeleteMode
            ? setIsDeleteMode(false)
            : setShowFormModal(!showFormModal)
        }
      >
        <PledgeForm
          pageAddress={props.pageAddress}
          pledge={pledge}
          onFormSubmit={handleFormSubmit}
          setIsDeleteMode={setIsDeleteMode}
          isDeleteMode={isDeleteMode}
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
            secondaryWallets={
              props.pledge.wallets && Object.values(props.pledge.wallets)
            }
            isPledgeOwner={isPledgeOwner}
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
