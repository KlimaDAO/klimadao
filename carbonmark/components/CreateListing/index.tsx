import { safeAdd, useWeb3 } from "@klimadao/lib/utils";
import { t } from "@lingui/macro";
import { Transaction } from "components/CreateListing/Transaction";
import { Modal } from "components/shared/Modal";
import { Spinner } from "components/shared/Spinner";
import { constants } from "ethers";
import {
  approveTokenSpend,
  createListingTransaction,
  getCarbonmarkAllowance,
} from "lib/actions";
import { LO } from "lib/luckyOrange";
import { TransactionStatusMessage, TxnStatus } from "lib/statusMessage";
import { Asset, Listing } from "lib/types/carbonmark.types";
import {
  getUnlistedBalance,
  hasListableBalance,
} from "lib/utils/listings.utils";
import { FC, useState } from "react";
import { CreateListingForm, FormValues } from "./Form";
import * as styles from "./styles";

type Props = {
  assets: Asset[];
  /** User's listings, used to determine the listable balance */
  listings: Listing[];
  showModal: boolean;
  onModalClose: () => void;
  onSubmit: () => void;
  successScreen?: React.ReactNode;
};

export const CreateListing: FC<Props> = (props) => {
  const { provider, address, networkLabel } = useWeb3();
  const [isLoading, setIsLoading] = useState(false);
  const [inputValues, setInputValues] = useState<FormValues | null>(null);
  const [status, setStatus] = useState<TransactionStatusMessage | null>(null);
  const [currentAllowance, setCurrentAllowance] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const isPending =
    status?.statusType === "userConfirmation" ||
    status?.statusType === "networkConfirmation";

  const showSuccessScreen = success && !!props.successScreen;
  const showTransactionView =
    !!inputValues && !!currentAllowance && !showSuccessScreen;
  const showForm = !showTransactionView && !isLoading && !showSuccessScreen;

  const resetStateAndCloseModal = () => {
    setInputValues(null);
    setCurrentAllowance(null);
    setStatus(null);
    setSuccess(false);
    props.onModalClose();
  };

  const onModalClose = !isPending ? resetStateAndCloseModal : undefined;

  const onUpdateStatus = (status: TxnStatus, message?: string) => {
    setStatus({ statusType: status, message: message });
  };

  const onAddListingFormSubmit = async (values: FormValues) => {
    LO.track("Listing: Create Listing Clicked");
    setIsLoading(true);

    try {
      if (!address) return;

      const allowance = await getCarbonmarkAllowance({
        tokenAddress: values.tokenAddress,
        tokenId: values.tokenId ?? undefined,
        userAddress: address,
        network: networkLabel,
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
  const getTotalAssetApproval = (form?: FormValues | null): number => {
    if (!form) return 0;
    const sumOtherListings = props.listings
      .filter(
        (l) => l.tokenAddress.toLowerCase() === form.tokenAddress.toLowerCase()
      )
      .reduce((a, b) => safeAdd(a, b.leftToSell), "0");
    return Number(safeAdd(sumOtherListings, form?.amount || "0"));
  };

  /**
   * Return true if the user has exactly the required approval for all listings of this asset
   * Incl. the new listing
   */
  const hasApproval = () => {
    if (!Number(inputValues?.amount)) return false;

    const isERC1155 = !!inputValues?.tokenId;

    // 1155 approvals are all or nothing approvals across all tokenIds and amount
    if (isERC1155) {
      return currentAllowance === constants.MaxUint256.toString();
    }
    return (
      Number(currentAllowance || "0") === getTotalAssetApproval(inputValues)
    );
  };

  const handleApproval = async () => {
    LO.track("Listing: Approve Clicked");
    if (!provider || !inputValues) return;

    try {
      const newAllowanceValue = getTotalAssetApproval(inputValues).toString();

      await approveTokenSpend({
        tokenAddress: inputValues.tokenAddress,
        tokenId: inputValues?.tokenId,
        spender: "carbonmark",
        signer: provider.getSigner(),
        value: newAllowanceValue,
        onStatus: onUpdateStatus,
      });
      setCurrentAllowance(newAllowanceValue);
    } catch (e) {
      console.error(e);
    }
  };

  const onAddListing = async () => {
    if (!provider || !inputValues) return;
    try {
      await createListingTransaction({
        tokenAddress: inputValues.tokenAddress,
        tokenId: inputValues.tokenId ?? undefined,
        amount: inputValues.amount,
        unitPrice: inputValues.unitPrice,
        provider,
        onStatus: onUpdateStatus,
      });
      LO.track("Listing: Listing Created");
      props.onSubmit();
      setSuccess(true);
      !props.successScreen && resetStateAndCloseModal(); // close only if no success screen provided
    } catch (e) {
      console.error("Error in onAddListing", e);
      return;
    }
  };

  const listableAssets = props.assets
    .filter((a) => hasListableBalance(a, props.listings))
    .map((a) => ({
      ...a,
      amount: getUnlistedBalance(a, props.listings).toString(),
    }));
  return (
    <Modal
      title={t`Create a listing`}
      showModal={props.showModal}
      onToggleModal={onModalClose}
    >
      {showForm && (
        <CreateListingForm
          assets={listableAssets}
          onSubmit={onAddListingFormSubmit}
          values={inputValues}
        />
      )}

      {isLoading && (
        <div className={styles.centerContent}>
          <Spinner />
        </div>
      )}
      {showTransactionView && !isLoading && (
        <Transaction
          hasApproval={hasApproval()}
          allowance={getTotalAssetApproval(inputValues).toString()}
          quantity={Number(inputValues?.amount || 0).toString()}
          price={{
            value: inputValues.unitPrice,
            token: "usdc",
          }}
          onApproval={handleApproval}
          onSubmit={onAddListing}
          onCancel={resetStateAndCloseModal}
          status={status}
          onResetStatus={() => setStatus(null)}
          onGoBack={() => {
            setStatus(null);
            setCurrentAllowance(null); // this will hide the Transaction View and re-checks the allowance again
          }}
        />
      )}

      {showSuccessScreen && (
        <div className={styles.centerContent}>{props.successScreen}</div>
      )}
    </Modal>
  );
};
