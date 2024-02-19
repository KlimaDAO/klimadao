import { safeAdd, useWeb3 } from "@klimadao/lib/utils";
import { Trans, t } from "@lingui/macro";
import { CarbonmarkButton } from "components/CarbonmarkButton";
import { Transaction } from "components/CreateListing/Transaction";
import { Text } from "components/Text";
import { Modal } from "components/shared/Modal";
import { Spinner } from "components/shared/Spinner";
import { constants } from "ethers";
import {
  approveTokenSpend,
  deleteListingTransaction,
  getCarbonmarkAllowance,
  updateListingTransaction,
} from "lib/actions";
import { LO } from "lib/luckyOrange";
import { TransactionStatusMessage, TxnStatus } from "lib/statusMessage";
import { Asset, Listing as ListingT } from "lib/types/carbonmark.types";
import { getUnlistedBalance } from "lib/utils/listings.utils";
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
  const [currentAllowance, setCurrentAllowance] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const newQuantity = Number(inputValues?.newQuantity || "1");

  const isPending =
    status?.statusType === "userConfirmation" ||
    status?.statusType === "networkConfirmation";

  const showTransactionView = !!inputValues && !!currentAllowance;

  const resetLocalState = () => {
    setInputValues(null);
    setCurrentAllowance(null);
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
        // @todo add tokenID to project type on the subgraph. temporary workaround only to mock a tokenID to identify as 1155
        tokenId: listingToEdit?.project.id.startsWith("ICR") ? "0" : undefined,
      });
      setCurrentAllowance(allowance);
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
      .reduce((a, b) => safeAdd(a, b.leftToSell), "0");
    return Number(safeAdd(sumOtherListings, newQuantity.toString()));
  };

  /** Return true if the user has exactly the required approval for all listings of this asset */
  const hasApproval = () => {
    if (!listingToEdit) return false;
    if (listingToEdit.project.id.startsWith("ICR")) {
      return Number(currentAllowance) === Number(constants.MaxUint256);
    } else {
      return (
        Number(currentAllowance || "0") === getTotalAssetApproval(listingToEdit)
      );
    }
  };

  const handleApproval = async () => {
    if (!provider || !inputValues) return;

    try {
      const newAllowanceValue = getTotalAssetApproval(listingToEdit).toString();
      await approveTokenSpend({
        tokenAddress: inputValues.tokenAddress,
        spender: "carbonmark",
        signer: provider.getSigner(),
        value: newAllowanceValue,
        onStatus: onUpdateStatus,
        // @todo add tokenID to project type on the subgraph. temporary workaround only to mock a tokenID to identify as 1155
        tokenId: listingToEdit?.project.id.startsWith("ICR") ? "0" : undefined,
      });
      setCurrentAllowance(newAllowanceValue);
    } catch (e) {
      console.error(e);
    }
  };

  const onUpdateListing = async () => {
    if (!provider || !inputValues || !listingToEdit) return; // typeguards

    try {
      await updateListingTransaction({
        listingId: listingToEdit.id,
        projectId: listingToEdit.project.id,
        provider,
        newAmount: inputValues.newQuantity,
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
      setErrorMessage(t`Could not delete listing. Please try again.`);
    } finally {
      setIsLoading(false);
    }
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
    const unlistedBalance = getUnlistedBalance(asset, props.listings);
    // the listable balance includes current listing
    return Number(safeAdd(unlistedBalance.toString(), listing.leftToSell));
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
            allowance={getTotalAssetApproval(listingToEdit).toString()}
            quantity={newQuantity.toString()}
            price={{
              value: inputValues.newSingleUnitPrice,
              token: "usdc",
            }}
            onApproval={handleApproval}
            onSubmit={onUpdateListing}
            onCancel={resetLocalState}
            status={status}
            onResetStatus={() => setStatus(null)}
            onGoBack={() => {
              setStatus(null);
              setCurrentAllowance(null); // this will hide the Transaction View and re-checks the allowance again
            }}
            // @todo change to !!listingToEdit?.tokenStandard === "ERC1155" when marketplace subgraph with tokenStandard is merged
            isERC1155={!!listingToEdit?.project.id.startsWith("ICR")}
          />
        )}
      </Modal>
    </>
  );
};
