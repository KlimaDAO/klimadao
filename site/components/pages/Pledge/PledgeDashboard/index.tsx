import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { t, Trans } from "@lingui/macro";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

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
import { ButtonPrimary, ButtonSecondary, Text } from "@klimadao/lib/components";

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
  const [showRemoveConfirmModal, setShowRemoveConfirmModal] = useState(false);
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [showAcceptConfirmModal, setShowAcceptConfirmModal] = useState(false);

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
        <Text className={styles.modalMessage} t="body2">
          <Trans id="pledge.invitation.join_message">
            {concatAddress(props.pledge.ownerAddress)} has invited you to add
            your wallet to this pledge. If you accept, then your carbon
            retirements will count toward{" "}
            {concatAddress(props.pledge.ownerAddress)}'s pledge. You may remove
            your wallet from this pledge at any time.
          </Trans>
        </Text>
        <div className={styles.modalButtons}>
          <ButtonPrimary
            label={t({
              id: "pledge.invitation.accept",
              message: "Accept Invitation",
            })}
            onClick={() => {
              setShowAcceptConfirmModal(true);
              setShowAcceptModal(false);
            }}
          />
          <ButtonSecondary
            label={t({
              id: "pledge.invitation.reject",
              message: "Reject Invitation",
            })}
            onClick={() => setShowAcceptModal(false)}
            variant="red"
          />
          <ButtonSecondary
            label={t({
              id: "pledge.invitation.later",
              message: "Remind me later",
            })}
            onClick={() => setShowAcceptModal(false)}
            variant="gray"
          />
        </div>
      </Modal>
      <Modal
        title={t({ id: "", message: "Are you sure?" })}
        showModal={showAcceptConfirmModal}
        onToggleModal={() => setShowAcceptConfirmModal(false)}
      >
        <Text t="body2" className={styles.modalMessage}>
          <Trans id="pledge.modal.wallet_add_confirm">
            Adding your wallet to this pledge will remove your wallet from any
            existing pledges under your wallet address. Those pledges will be
            redirected to this new pledge.
          </Trans>
        </Text>
        <div className={styles.modalButtons}>
          <ButtonPrimary
            label={t({ id: "pledge.modal.confirm", message: "Confirm" })}
          />
          <ButtonSecondary
            label={t({ id: "shared.cancel", message: "Cancel" })}
            onClick={() => {
              setShowAcceptConfirmModal(false);
              setShowAcceptModal(true);
            }}
            variant="gray"
          />
        </div>
      </Modal>
      <Modal
        title={t({ id: "pledge.modal.edit_pledge", message: "Edit pledge" })}
        showModal={showRemoveModal}
        onToggleModal={() => setShowRemoveModal(false)}
      >
        <div className={styles.removeTitleContainer}>
          <span className={styles.lockIcon}>
            <LockOutlinedIcon fontSize="large" />
          </span>
          <Text t="body2">
            <Trans id="pledge.modal.unable_to_edit">
              Only Primary Wallet holders can edit the content of this pledge.
            </Trans>
          </Text>
        </div>
        <div className={styles.modalButtons}>
          <ButtonSecondary
            label={t({
              id: "pledge.modal.unpin_wallet",
              message: "unpin my wallet",
            })}
            variant="red"
            onClick={() => {
              setShowRemoveConfirmModal(true);
              setShowRemoveModal(false);
            }}
          />
          <ButtonSecondary
            label={t({ id: "shared.cancel", message: "Cancel" })}
            onClick={() => setShowRemoveModal(false)}
            variant="gray"
          />
        </div>
      </Modal>
      <Modal
        title={t({
          id: "pledge.modal.confirm_remove",
          message: "Confirm Removal",
        })}
        showModal={showRemoveConfirmModal}
        onToggleModal={() => setShowRemoveConfirmModal(false)}
      >
        <Text t="body2" className={styles.modalMessage}>
          <Trans id="pledge.modal.are_you_sure">
            Are you sure you want to remove your wallet from this pledge?
          </Trans>
        </Text>
        <div className={styles.modalButtons}>
          <ButtonPrimary
            label={t({
              id: "shared.remove",
              message: "remove",
            })}
            onClick={() => {
              setShowRemoveConfirmModal(false);
            }}
            variant="red"
          />
          <ButtonSecondary
            label={t({ id: "shared.cancel", message: "Cancel" })}
            onClick={() => setShowRemoveModal(false)}
            variant="gray"
          />
        </div>
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
            secondaryWallets={pledge.wallets ?? undefined}
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
