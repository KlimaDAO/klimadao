import { safeAdd, useWeb3 } from "@klimadao/lib/utils";
import { Trans, t } from "@lingui/macro";
import { Text } from "components/Text";
import { Transaction } from "components/Transaction";
import { Modal } from "components/shared/Modal";
import { Spinner } from "components/shared/Spinner";
import {
  approveTokenSpend,
  createListingTransaction,
  getCarbonmarkAllowance,
} from "lib/actions";
import { LO } from "lib/luckyOrange";
import { getAddress } from "lib/networkAware/getAddress";
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
  const [allowanceValue, setAllowanceValue] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const isPending =
    status?.statusType === "userConfirmation" ||
    status?.statusType === "networkConfirmation";

  const showSuccessScreen = success && !!props.successScreen;
  const showTransactionView =
    !!inputValues && !!allowanceValue && !showSuccessScreen;
  const showForm = !showTransactionView && !isLoading && !showSuccessScreen;

  const resetStateAndCloseModal = () => {
    setInputValues(null);
    setAllowanceValue(null);
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
  const getTotalAssetApproval = (form?: FormValues | null): number => {
    if (!form) return 0;
    const sumOtherListings = props.listings
      .filter(
        (l) => l.tokenAddress.toLowerCase() === form.tokenAddress.toLowerCase()
      )
      .reduce((a, b) => Number(safeAdd(a.toString(), b.leftToSell)), 0);
    return Number(safeAdd(sumOtherListings.toString(), form?.amount || "0"));
  };

  /**
   * Return true if the user has exactly the required approval for all listings of this asset
   * Incl. the new listing
   */
  const hasApproval = () => {
    if (!Number(inputValues?.amount)) return false;
    return Number(allowanceValue || "0") === getTotalAssetApproval(inputValues);
  };

  const handleApproval = async () => {
    LO.track("Listing: Approve Clicked");
    if (!provider || !inputValues) return;

    try {
      const newAllowanceValue = getTotalAssetApproval(inputValues).toString();
      await approveTokenSpend({
        tokenAddress: inputValues.tokenAddress,
        spender: "carbonmark",
        signer: provider.getSigner(),
        value: newAllowanceValue,
        onStatus: onUpdateStatus,
      });
      setAllowanceValue(newAllowanceValue);
    } catch (e) {
      console.error(e);
    }
  };

  const onAddListing = async () => {
    if (!provider || !inputValues) return;
    try {
      await createListingTransaction({
        tokenAddress: inputValues.tokenAddress,
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

  const CreateApproval = () => {
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
        {getTotalAssetApproval(inputValues) > Number(inputValues?.amount) && (
          <Text t="body1" color="lighter">
            <Trans>
              The value below reflects the sum of all of your listings for this
              specific token.
            </Trans>
          </Text>
        )}
        <Text t="body1" color="lighter">
          <strong>
            <Trans>
              The Confirm amount below reflects the sum of all your listings for
              this specific token.
            </Trans>
          </strong>
        </Text>
      </div>
    );
  };

  const CreateSubmit = () => {
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

  const listableAssets = props.assets
    .filter((a) => hasListableBalance(a, props.listings))
    .map((a) => ({
      ...a,
      amount: getUnlistedBalance(a, props.listings).toString(),
    }));

  /** Util to render the amount label in the transaction modal */
  const getAmountLabel = () => {
    const amount = hasApproval()
      ? Number(inputValues?.amount) // 'submit' view shows the new quantity
      : getTotalAssetApproval(inputValues); // 'approve' view shows all listings of this asset
    return t`${amount} tonnes`;
  };

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
          amount={getAmountLabel()}
          price={{
            value: inputValues.unitPrice,
            token: "usdc",
          }}
          approvalText={<CreateApproval />}
          submitText={<CreateSubmit />}
          spenderAddress={getAddress("carbonmark", networkLabel)}
          onApproval={handleApproval}
          onSubmit={onAddListing}
          onCancel={resetStateAndCloseModal}
          status={status}
          onResetStatus={() => setStatus(null)}
          onGoBack={() => {
            setStatus(null);
            setAllowanceValue(null); // this will hide the Transaction View and re-checks the allowance again
          }}
        />
      )}

      {showSuccessScreen && (
        <div className={styles.centerContent}>{props.successScreen}</div>
      )}
    </Modal>
  );
};
