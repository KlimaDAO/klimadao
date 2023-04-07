import { RetirementsTotalsAndBalances } from "@klimadao/lib/types/offset";
import { concatAddress, useWeb3 } from "@klimadao/lib/utils";
import { t } from "@lingui/macro";
import { NextPage } from "next";
import { useEffect, useState } from "react";

import { Modal } from "components/Modal";
import { PageHead } from "components/PageHead";

import { getConnectErrorStrings } from "lib/constants";
import { AcceptModal, RemoveModal } from "../InvitationModals";
import { PledgeForm } from "../PledgeForm";
import { PledgeLayout } from "../PledgeLayout";
import { Holding, Pledge } from "../types";
import {
  AssetBalanceCard,
  FootprintCard,
  MethodologyCard,
  PledgeCard,
  RetirementsCard,
} from "./Cards";
import { Profile } from "./Profile";
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
  const { address, isConnected, renderModal } = useWeb3();
  const [showFormModal, setShowFormModal] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [pledge, setPledge] = useState<Pledge>();
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [canEditPledge, setCanEditPledge] = useState<boolean | undefined>(
    false
  );
  const [isUnverifiedSecondaryWallet, setIsUnverifiedSecondaryWallet] =
    useState<boolean | undefined>();
  const [isVerifiedSecondaryWallet, setIsVerifiedSecondaryWallet] = useState<
    boolean | undefined
  >();
  useEffect(() => {
    props.pledge &&
      setIsUnverifiedSecondaryWallet(
        props.pledge.wallets &&
          Object.values(props.pledge.wallets)?.some(
            (wallet) =>
              wallet.address?.toLowerCase() === address?.toLowerCase() &&
              wallet.status === "pending"
          )
      );
  }, [props.pledge, address]);
  useEffect(() => {
    props.pledge &&
      setIsVerifiedSecondaryWallet(
        props.pledge.wallets &&
          Object.values(props.pledge.wallets)?.some(
            (wallet) =>
              wallet.address?.toLowerCase() === address?.toLowerCase() &&
              wallet.status === "verified"
          )
      );
  }, [props.pledge, address]);
  useEffect(() => {
    setPledge(props.pledge);
  }, [props.pledge]);

  useEffect(() => {
    setCanEditPledge(
      (address?.toLowerCase() === props.pageAddress?.toLowerCase() &&
        isConnected) ||
        isVerifiedSecondaryWallet
    );
  }, [isVerifiedSecondaryWallet, props.pageAddress, address]);

  useEffect(() => {
    isUnverifiedSecondaryWallet && setShowAcceptModal(true);
  }, [isUnverifiedSecondaryWallet]);

  const isPledgeOwner =
    address?.toLowerCase() === props.pageAddress?.toLowerCase() && isConnected;

  const handleFormSubmit = async (data: Pledge) => {
    setPledge(data);
    setShowFormModal(false);
  };

  const handleRemove = () => {
    setCanEditPledge(false);
    setIsVerifiedSecondaryWallet(false);
    setIsUnverifiedSecondaryWallet(false);
  };
  const handleAccept = () => {
    setCanEditPledge(true);
    setIsVerifiedSecondaryWallet(true);
    setIsUnverifiedSecondaryWallet(false);
  };

  /**
   * Close the modal on escape press
   * @todo extract as generic modal behaviour
   */
  useEffect(() => {
    const escListener = (e: KeyboardEvent) =>
      e.key === "Escape" && showFormModal && setShowFormModal(false);

    window.addEventListener("keydown", escListener);
    return () => window.removeEventListener("keydown", escListener);
  }, []);
  if (!pledge) return null;
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
        handleModalFormSubmit={handleAccept}
        address={address}
      />
      <RemoveModal
        pledge={props.pledge}
        pageAddress={props.pageAddress}
        showRemoveModal={showRemoveModal}
        setShowRemoveModal={setShowRemoveModal}
        handleModalFormSubmit={handleRemove}
        address={address}
      />
      {renderModal &&
        renderModal({
          errors: getConnectErrorStrings(),
          torusText: t({
            message: "social or email",
            id: "connectModal.torus",
          }),
          walletText: t({
            message: "connect a wallet",
            id: "connectModal.wallet",
          }),
          institutionalText: t({
            message: "institutional",
            id: "connectModal.institutional",
          }),
          titles: {
            connect: t({
              id: "shared.login",
              message: "login",
            }),
            loading: t({
              id: "connect_modal.connecting",
              message: "Connecting...",
            }),
            error: t({
              id: "connect_modal.error_title",
              message: "Connection Error",
            }),
          },
        })}
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
