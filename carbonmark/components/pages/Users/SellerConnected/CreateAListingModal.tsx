import { useWeb3 } from "@klimadao/lib/utils";
import { t } from "@lingui/macro";
import { FC, useState } from "react";

import { Asset } from "@klimadao/lib/types/carbonmark";

import { Spinner } from "@klimadao/lib/components";
import { Modal } from "components/shared/Modal";
import { Transaction } from "components/Transaction";
import {
  createListingTransaction,
  getC3tokenToMarketplaceAllowance,
  onApproveMarketplaceTransaction,
} from "lib/actions";
import { TransactionStatusMessage, TxnStatus } from "lib/statusMessage";
import { AddListing, FormValues } from "./Forms/AddListing";
import * as styles from "./styles";

type Props = {
  assets: Asset[];
  showModal: boolean;
  onModalClose: () => void;
  onSubmit: () => void;
};

export const CreateAListingModal: FC<Props> = (props) => {
  const { provider, address } = useWeb3();
  const [isLoading, setIsLoading] = useState(false);
  const [inputValues, setInputValues] = useState<FormValues | null>(null);
  const [status, setStatus] = useState<TransactionStatusMessage | null>(null);
  const [allowanceValue, setAllowanceValue] = useState<string | null>(null);

  const isPending =
    status?.statusType === "userConfirmation" ||
    status?.statusType === "networkConfirmation";

  const showTransactionView = !!inputValues && !!allowanceValue;

  const resetStateAndCloseModal = () => {
    setInputValues(null);
    setAllowanceValue(null);
    setStatus(null);
    props.onModalClose();
  };

  const onModalClose = !isPending ? resetStateAndCloseModal : undefined;

  const onUpdateStatus = (status: TxnStatus, message?: string) => {
    setStatus({ statusType: status, message: message });
  };

  const onAddListingFormSubmit = async (values: FormValues) => {
    setIsLoading(true);
    try {
      if (!address || !provider) return;
      const allowance = await getC3tokenToMarketplaceAllowance({
        tokenAddress: values.tokenAddress,
        userAddress: address,
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

  const onAddListing = async () => {
    if (!provider || !inputValues) return;
    try {
      await createListingTransaction({
        tokenAddress: inputValues.tokenAddress,
        provider,
        totalAmountToSell: inputValues.totalAmountToSell,
        singleUnitPrice: inputValues.singleUnitPrice,
        onStatus: onUpdateStatus,
      });

      props.onSubmit();
      resetStateAndCloseModal();
    } catch (e) {
      console.error("Error in onAddListing", e);
      return;
    }
  };

  return (
    <Modal
      title={t({
        id: "profile.listings_modal.title",
        message: "Create a Listing",
      })}
      showModal={props.showModal}
      onToggleModal={onModalClose}
    >
      {!showTransactionView && !isLoading && (
        <AddListing
          assets={props.assets}
          onSubmit={onAddListingFormSubmit}
          values={inputValues}
        />
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
            value: `${inputValues.totalAmountToSell}  ${t({
              id: "tonnes.long",
              message: "tonnes",
            })}`,
          }}
          price={{
            value: inputValues.singleUnitPrice,
            token: "usdc",
          }}
          approvalText={t({
            id: "transaction.create_listing.approval_description",
            message:
              "You are about to transfer ownership of this asset from your wallet to the KlimaDAO  You can remove your listing at any time until it has been sold.",
          })}
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
    </Modal>
  );
};
