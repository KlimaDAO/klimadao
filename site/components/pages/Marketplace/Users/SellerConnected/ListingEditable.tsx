import { Spinner, Text } from "@klimadao/lib/components";
import { useWeb3 } from "@klimadao/lib/utils";
import { t, Trans } from "@lingui/macro";
import { Modal } from "components/Modal";
import { FC, useState } from "react";

import { Listing } from "../Listing";
import { EditListing, FormValues } from "./Forms/EditListing";

import {
  deleteListingTransaction,
  getC3tokenToMarketplaceAllowance,
  onApproveMarketplaceTransaction,
  updateListingTransaction,
} from "components/pages/Marketplace/lib/actions";
import {
  TransactionStatusMessage,
  TxnStatus,
} from "components/pages/Marketplace/lib/statusMessage";
import { MarketplaceButton } from "components/pages/Marketplace/shared/MarketplaceButton";
import { Transaction } from "components/pages/Marketplace/shared/Transaction";

import { Listing as ListingType } from "@klimadao/lib/types/marketplace";

import * as styles from "./styles";

type Props = {
  listings: ListingType[];
  onFinishEditing: () => void;
};

export const ListingEditable: FC<Props> = (props) => {
  const { provider, address } = useWeb3();
  const [listingToEdit, setListingToEdit] = useState<ListingType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValues, setInputValues] = useState<FormValues | null>(null);
  const [status, setStatus] = useState<TransactionStatusMessage | null>(null);
  const [allowanceValue, setAllowanceValue] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isPending =
    status?.statusType === "userConfirmation" ||
    status?.statusType === "networkConfirmation";

  const showTransactionView = !!inputValues && !!allowanceValue;

  const resetLocalState = () => {
    setInputValues(null);
    setAllowanceValue(null);
    setStatus(null);
    setListingToEdit(null);
  };

  const onModalClose = !isPending ? resetLocalState : undefined;

  const onUpdateStatus = (status: TxnStatus, message?: string) => {
    setStatus({ statusType: status, message: message });
  };

  const onFormSubmit = async (values: FormValues) => {
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

      resetLocalState();
      props.onFinishEditing();
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

      setListingToEdit(null);
      props.onFinishEditing();
    } catch (e) {
      console.error("Error in onDeleteListing", e);
      setErrorMessage(
        t({
          id: "marketplace.profile.listing.delete.error",
          message: "Could not delete listing. Please try again.",
        })
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {props.listings.map((listing) => (
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
              onSubmit={onFormSubmit}
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
            {errorMessage && (
              <div className={styles.errorMessageWrap}>
                <Text t="caption" className={styles.errorMessage}>
                  {errorMessage}
                </Text>
              </div>
            )}
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
            onCancel={resetLocalState}
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
