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
import { ButtonPrimary, ButtonSecondary } from "@klimadao/lib/components";

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
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showAcceptModal, setShowAcceptModal] = useState(false);

  const isUnverifiedSecondaryWallet = props.pledge.wallets?.some(
    (wallet) => wallet.address === address && wallet.verified === false
  );
  const isVerifiedSecondaryWallet = props.pledge.wallets?.some(
    (wallet) => wallet.address === address && wallet.verified === true
  );
  const isPledgeOwner =
    address?.toLowerCase() === props.pageAddress && isConnected;
  const canEditPledge =
    (address?.toLowerCase() === props.pageAddress && isConnected) ||
    isVerifiedSecondaryWallet;

  useEffect(() => {
    isUnverifiedSecondaryWallet && setShowAcceptModal(true);
  }, [isUnverifiedSecondaryWallet]);

  const handleFormSubmit = async (data: Pledge) => {
    setPledge(data);
    setShowFormModal(false);
  };

  const pledgeOwnerTitle =
    pledge.name || props.domain || concatAddress(pledge.ownerAddress);

  return (
    <PledgeLayout
      canEditPledge={canEditPledge}
      toggleEditModal={isPledgeOwner ? setShowFormModal : setShowRemoveModal}
    >
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
      <Modal
        title="Invitation to join"
        showModal={showAcceptModal}
        onToggleModal={() => setShowAcceptModal(false)}
      >
        Pledge Creator has invited you to add your wallet to this pledge. If you
        accept, then your carbon retirements will count toward Pledge Creator's
        pledge. You may remove your wallet from this pledge at any time.
        <ButtonPrimary
          label="Accept Invitation"
          onClick={() => {
            setShowConfirmModal(true);
            setShowAcceptModal(false);
          }}
        />
        <ButtonSecondary
          label="Reject Invitation"
          onClick={() => setShowAcceptModal(false)}
        />
        <ButtonSecondary
          label="Remind me later"
          onClick={() => setShowAcceptModal(false)}
        />
      </Modal>
      <Modal
        title="Are you sure?"
        showModal={showConfirmModal}
        onToggleModal={() => setShowConfirmModal(false)}
      >
        Adding your wallet to this pledge will remove your wallet from any
        existing pledges under your wallet address. Those pledges will be
        redirected to this new pledge.
        <ButtonPrimary label="Confirm" />
        <ButtonSecondary
          label="Cancel"
          onClick={() => {
            setShowConfirmModal(false);
            setShowAcceptModal(true);
          }}
        />
      </Modal>
      <Modal
        title="Edit pledge"
        showModal={showRemoveModal}
        onToggleModal={() => setShowRemoveModal(false)}
      >
        verified in here
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
