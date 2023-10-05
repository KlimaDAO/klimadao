import { useWeb3 } from "@klimadao/lib/utils";
import { t, Trans } from "@lingui/macro";
import { CarbonmarkButton } from "components/CarbonmarkButton";
import { Modal } from "components/shared/Modal";
import { Spinner } from "components/shared/Spinner";
import { Text } from "components/Text";
import { Transaction } from "components/Transaction";
import {
  approveTokenSpend,
  deleteListingTransaction,
  getCarbonmarkAllowance,
  updateListingTransaction,
} from "lib/actions";
import { LO } from "lib/luckyOrange";
import { getAddress } from "lib/networkAware/getAddress";
import { TransactionStatusMessage, TxnStatus } from "lib/statusMessage";
import { Asset, Listing as ListingT } from "lib/types/carbonmark.types";
import { FC, useState } from "react";
import { Listing } from "../Listing";
import { EditListing, FormValues } from "./Forms/EditListing";
import * as styles from "./styles";

type Props = {
  listings: ListingT[];
  assets: Asset[];
  onFinishEditing: () => void;
  isUpdatingData: boolean;
};

export const ListingEditable: FC<Props> = (props) => {
  const { provider, address, networkLabel } = useWeb3();
  const [listingToEdit, setListingToEdit] = useState<ListingT | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValues, setInputValues] = useState<FormValues | null>(null);
  const [status, setStatus] = useState<TransactionStatusMessage | null>(null);
  const [allowanceValue, setAllowanceValue] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const newQuantity = Number(inputValues?.newQuantity || "1");

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
      if (!address) return;
      const allowance = await getCarbonmarkAllowance({
        tokenAddress: values.tokenAddress,
        userAddress: address,
        network: networkLabel,
      });
      setAllowanceValue(allowance);
      setInputValues(values);
      setIsLoading(false);
    } catch (e) {
      console.error(e);
      setIsLoading(false);
    }
  };

  /** Return the value of all other listings of this same asset, plus the new listing quantity */
  const getTotalAssetApproval = (listing?: ListingT | null): number => {
    if (!listing) return 0;
    const sumOtherListings = props.listings
      .filter(
        (l) =>
          l.tokenAddress.toLowerCase() === listing.tokenAddress.toLowerCase() &&
          l.id !== listing.id
      )
      .reduce((a, b) => a + Number(b.leftToSell), 0);
    return sumOtherListings + newQuantity;
  };

  /** Return true if the user has exactly the required approval for all listings of this asset */
  const hasApproval = () => {
    if (!listingToEdit) return false;
    return (
      Number(allowanceValue || "0") === getTotalAssetApproval(listingToEdit)
    );
  };

  const handleApproval = async () => {
    if (!provider || !inputValues) return;

    try {
      await approveTokenSpend({
        tokenAddress: inputValues.tokenAddress,
        spender: "carbonmark",
        signer: provider.getSigner(),
        value: getTotalAssetApproval(listingToEdit).toString(),
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
        totalAmountToSell: inputValues.newQuantity,
        singleUnitPrice: inputValues.newSingleUnitPrice,
        onStatus: onUpdateStatus,
      });
      LO.track("Listing: Listing Updated");

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
      LO.track("Listing: Listing Deleted");

      setListingToEdit(null);
      props.onFinishEditing();
    } catch (e) {
      console.error("Error in onDeleteListing", e);
      setErrorMessage(
        t({
          id: "profile.listing.delete.error",
          message: "Could not delete listing. Please try again.",
        })
      );
    } finally {
      setIsLoading(false);
    }
  };

  const EditApproval = () => {
    return (
      <div className={styles.formatParagraph}>
        <Text t="body1" color="lighter">
          <Trans>
            First, approve the Carbonmark system to transfer this asset on your
            behalf.
          </Trans>
        </Text>
        <Text t="body1" color="lighter">
          <Trans>
            You can revoke this approval at any time. The assets will only be
            transferred out of your wallet when a sale is completed.
          </Trans>
        </Text>
        {getTotalAssetApproval(listingToEdit) > newQuantity && (
          <Text t="body1" color="lighter">
            <Trans>
              The value below reflects the sum of all of your listings for this
              specific token.
            </Trans>
          </Text>
        )}
      </div>
    );
  };

  const EditSubmit = () => {
    return (
      <div className={styles.formatParagraph}>
        <Text t="body1" color="lighter">
          <Trans>
            Almost finished! The last step is to create the listing and submit
            it to the system. Please verify the quantity and price below.
          </Trans>
        </Text>
        <Text t="body1" color="lighter">
          <Trans>You can delete this listing at any time.</Trans>
        </Text>
      </div>
    );
  };

  /**
   * For a given listing, finds the user balance
   * From that balance, subtract the amount of any other listings
   * @returns {number} The amount that can be listed (incl. currently listed quantity)
   */
  const getListableBalance = (listing: ListingT): number => {
    const asset = props.assets.find(
      (a) => a.token.id.toLowerCase() === listing.tokenAddress.toLowerCase()
    );
    if (!asset) return 0;
    const listedBalance = props.listings
      // find any listing of the same token, incl. current listing
      .filter(
        (l) =>
          l.tokenAddress.toLowerCase() === listing.tokenAddress.toLowerCase()
      )
      .map((l) => Number(l.leftToSell))
      .reduce((a, b) => a + b, 0);
    const unlistedBalance = Number(asset.amount) - listedBalance;
    // the listable balance includes current listing
    return unlistedBalance + Number(listing.leftToSell);
  };

  return (
    <>
      {props.listings.map((listing) => (
        <div
          className={props.isUpdatingData ? styles.loadingOverlay : ""}
          key={listing.id}
        >
          <Listing listing={listing}>
            <CarbonmarkButton
              label={<Trans>Edit</Trans>}
              className={styles.editListingButton}
              onClick={() => {
                LO.track("Listing: Edit Clicked");
                setListingToEdit(listing);
              }}
            />
          </Listing>
        </div>
      ))}

      <Modal
        title={t`Edit listing`}
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
              listableBalance={getListableBalance(listingToEdit)}
            />
            <CarbonmarkButton
              label={
                <Trans id="profile.listing.edit.delete_listing">
                  Delete Listing
                </Trans>
              }
              onClick={onDeleteListing}
              className={styles.deleteListingButton}
            />
            {errorMessage && (
              <div className={styles.errorMessageWrap}>
                <Text t="body1" className={styles.errorMessage}>
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
              value: t`${
                hasApproval()
                  ? newQuantity
                  : getTotalAssetApproval(listingToEdit)
              } tonnes`,
            }}
            price={{
              value: inputValues.newSingleUnitPrice,
              token: "usdc",
            }}
            spenderAddress={getAddress("carbonmark", networkLabel)}
            approvalText={<EditApproval />}
            submitText={<EditSubmit />}
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
