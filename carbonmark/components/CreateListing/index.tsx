import { useWeb3 } from "@klimadao/lib/utils";
import { t } from "@lingui/macro";
import { Modal } from "components/shared/Modal";
import { Spinner } from "components/shared/Spinner";
import { Transaction } from "components/Transaction";
import {
  approveTokenSpend,
  createListingTransaction,
  getCarbonmarkAllowance,
} from "lib/actions";
import { TransactionStatusMessage, TxnStatus } from "lib/statusMessage";
import { AssetForListing } from "lib/types/carbonmark";
import { FC, useState } from "react";
import { CreateListingForm, FormValues } from "./Form";
import * as styles from "./styles";

type Props = {
  assets: AssetForListing[];
  showModal: boolean;
  onModalClose: () => void;
  onSubmit: () => void;
  successScreen?: React.ReactNode;
};

export const CreateListing: FC<Props> = (props) => {
  const { provider, address } = useWeb3();
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
    setIsLoading(true);
    try {
      if (!address) return;
      const allowance = await getCarbonmarkAllowance({
        tokenAddress: values.tokenAddress,
        userAddress: address,
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
      await approveTokenSpend({
        tokenAddress: inputValues.tokenAddress,
        spender: "carbonmark",
        signer: provider.getSigner(),
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
        tokenType: inputValues.tokenType,
        onStatus: onUpdateStatus,
      });

      props.onSubmit();
      setSuccess(true);
      !props.successScreen && resetStateAndCloseModal(); // close only if no success screen provided
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
      {showForm && (
        <CreateListingForm
          assets={props.assets}
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

      {showSuccessScreen && (
        <div className={styles.centerContent}>{props.successScreen}</div>
      )}
    </Modal>
  );
};
