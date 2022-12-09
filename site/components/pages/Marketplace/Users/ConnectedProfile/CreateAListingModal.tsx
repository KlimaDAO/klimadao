import React, { FC, useState } from "react";
import { t } from "@lingui/macro";
import { useWeb3 } from "@klimadao/lib/utils";

import { Asset } from "@klimadao/lib/types/marketplace";

import { AddListing, FormValues } from "./AddListing";
import { Transaction } from "components/pages/Marketplace/shared/Transaction";
import {
  getC3tokenToMarketplaceAllowance,
  TransactionStatusMessage,
  TxnStatus,
  onApproveMarketplaceTransaction,
} from "components/pages/Marketplace/shared/Transaction/lib";
import { createListingTransaction } from "../utils";
import { Modal } from "components/Modal";
import { Spinner } from "@klimadao/lib/components";
import * as styles from "./styles";

type Props = {
  assets: Asset[];
  showModal: boolean;
  onCancel: () => void;
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

  const onModalClose = !isPending ? props.onCancel : undefined;

  const onUpdateStatus = (status: TxnStatus, message?: string) => {
    setStatus({ statusType: status, message: message });
  };

  const onCancel = () => {
    setStatus(null);
    props.onCancel();
  };

  const onAddListingFormSubmit = async (values: FormValues) => {
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
    } catch (e) {
      console.error("Error in onAddListing", e);
      return;
    }
  };

  return (
    <Modal
      title={t({
        id: "marketplace.profile.listings_modal.title",
        message: "Create a Listing",
      })}
      showModal={props.showModal}
      onToggleModal={onModalClose}
    >
      {!showTransactionView && !isLoading && (
        <AddListing
          assets={props.assets}
          onSubmit={onAddListingFormSubmit}
          onCancel={onCancel}
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
          value={inputValues.singleUnitPrice}
          approvalValue={inputValues.totalAmountToSell}
          token={"usdc"}
          onApproval={handleApproval}
          onSubmit={onAddListing}
          onCancel={props.onCancel}
          status={status}
          onResetStatus={() => setStatus(null)}
        />
      )}
    </Modal>
  );
};
