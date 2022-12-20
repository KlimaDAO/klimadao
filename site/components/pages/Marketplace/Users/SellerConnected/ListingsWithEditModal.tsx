import React, { FC, useState } from "react";
import { utils } from "ethers";
import { t, Trans } from "@lingui/macro";
import { Spinner } from "@klimadao/lib/components";
import { Modal } from "components/Modal";
import { useWeb3 } from "@klimadao/lib/utils";

import { EditListing, FormValues } from "./EditListing";
import { Listing } from "../Listing";

import { Transaction } from "components/pages/Marketplace/shared/Transaction";
import {
  TransactionStatusMessage,
  TxnStatus,
} from "components/pages/Marketplace/lib/statusMessage";
import {
  getC3tokenToMarketplaceAllowance,
  onApproveMarketplaceTransaction,
  updateListingTransaction,
  deleteListingTransaction,
} from "components/pages/Marketplace/lib/actions";
import { MarketplaceButton } from "components/pages/Marketplace/shared/MarketplaceButton";

import { Listing as ListingType } from "@klimadao/lib/types/marketplace";

import * as styles from "./styles";

type Props = {
  listings: ListingType[];
};

export const ListingWithEditModal: FC<Props> = (props) => {
  const { provider, address } = useWeb3();
  const [listings, setListings] = useState<ListingType[]>(props.listings);
  const [listingToEdit, setListingToEdit] = useState<ListingType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValues, setInputValues] = useState<FormValues | null>(null);
  const [status, setStatus] = useState<TransactionStatusMessage | null>(null);
  const [allowanceValue, setAllowanceValue] = useState<string | null>(null);

  const isPending =
    status?.statusType === "userConfirmation" ||
    status?.statusType === "networkConfirmation";

  const showTransactionView = !!inputValues && !!allowanceValue;

  const resetStateAndCancel = () => {
    setInputValues(null);
    setAllowanceValue(null);
    setStatus(null);
    setListingToEdit(null);
  };

  const onModalClose = !isPending ? resetStateAndCancel : undefined;

  const onUpdateStatus = (status: TxnStatus, message?: string) => {
    setStatus({ statusType: status, message: message });
  };

  const onEditListing = async (values: FormValues) => {
    setIsLoading(true);
    try {
      if (!address || !provider) return;
      const allowance = await getC3tokenToMarketplaceAllowance({
        tokenAddress: values.tokenAddress,
        userAdress: address,
        provider,
      });
      setAllowanceValue(allowance);
      setInputValues(values);
      setIsLoading(false);
    } catch (e) {
      console.error(e);
      setIsLoading(false);
    }
  };

  const hasApproval = () => {
    return (
      !!allowanceValue &&
      !!inputValues &&
      Number(allowanceValue) >= Number(inputValues.totalAmountToSell)
    );
  };

  const handleApproval = async () => {
    if (!provider || !inputValues) return;

    try {
      await onApproveMarketplaceTransaction({
        tokenAddress: inputValues.tokenAddress,
        provider,
        value: inputValues.totalAmountToSell,
        onStatus: onUpdateStatus,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const onUpdateListing = async () => {
    if (!provider || !inputValues || !listingToEdit) return; // typeguards

    try {
      await updateListingTransaction({
        listingId: listingToEdit.id,
        tokenAddress: inputValues.tokenAddress,
        provider,
        totalAmountToSell: inputValues.totalAmountToSell,
        singleUnitPrice: inputValues.singleUnitPrice,
        onStatus: onUpdateStatus,
      });

      const totalAmountToSell = utils.parseUnits(
        inputValues.totalAmountToSell,
        18
      );
      const singleUnitPrice = utils.parseUnits(inputValues.singleUnitPrice, 18);

      const newListings = listings.map((l) =>
        l.id === listingToEdit.id
          ? { ...l, totalAmountToSell, singleUnitPrice }
          : l
      );

      setListings(newListings);
      setListingToEdit(null);
    } catch (e) {
      console.error("Error in onUpdateListing", e);
      return;
    }
  };

  const onDeleteListing = async () => {
    setIsLoading(true);
    if (!provider || !listingToEdit) return; // typeguards

    try {
      await deleteListingTransaction({
        listingId: listingToEdit.id,
        provider,
        onStatus: onUpdateStatus,
      });

      const withoutUpdatedListing = listings.filter(
        (l) => l.id !== listingToEdit.id
      );

      setListings(withoutUpdatedListing);
      setListingToEdit(null);
    } catch (e) {
      console.error("Error in onDeleteListing", e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {listings.map((listing) => (
        <Listing key={listing.id} listing={listing}>
          <MarketplaceButton
            label={<Trans id="marketplace.profile.listing.edit">Edit</Trans>}
            className={styles.editListingButton}
            onClick={() => setListingToEdit(listing)}
          />
        </Listing>
      ))}

      <Modal
        title={t({
          id: "marketplace.seller.edit_listing.title",
          message: "Edit Listing",
        })}
        showModal={!!listingToEdit}
        onToggleModal={onModalClose}
      >
        {!showTransactionView && !isLoading && listingToEdit && (
          <>
            <EditListing
              listing={listingToEdit}
              onSubmit={onEditListing}
              onCancel={() => setListingToEdit(null)}
              values={inputValues}
            />
            <MarketplaceButton
              label={
                <Trans id="marketplace.profile.listing.edit.delete_listing">
                  Delete Listing
                </Trans>
              }
              onClick={onDeleteListing}
              className={styles.deleteListingButton}
            />
          </>
        )}

        {isLoading && (
          <div className={styles.spinnerContainer}>
            <Spinner />
          </div>
        )}

        {showTransactionView && !isLoading && (
          <Transaction
            hasApproval={hasApproval()}
            amount={{
              value: `${inputValues.totalAmountToSell} ${t({
                id: "marketplace.tonnes.long",
                message: "tonnes",
              })}`,
            }}
            price={{
              value: inputValues.singleUnitPrice,
              token: "usdc",
            }}
            approvalText={t({
              id: "marketplace.transaction.edit_listing.approval_description",
              message:
                "You are about to transfer ownership of this asset from your wallet to the KlimaDAO marketplace. You can remove your listing at any time until it has been sold.",
            })}
            onApproval={handleApproval}
            onSubmit={onUpdateListing}
            onCancel={resetStateAndCancel}
            status={status}
            onResetStatus={() => setStatus(null)}
            onGoBack={() => {
              setStatus(null);
              setAllowanceValue(null); // this will hide the Transaction View and re-checks the allowance again
            }}
          />
        )}
      </Modal>
    </>
  );
};
