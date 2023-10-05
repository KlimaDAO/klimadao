import { useWeb3 } from "@klimadao/lib/utils";
import { t, Trans } from "@lingui/macro";
import { Modal } from "components/shared/Modal";
import { Spinner } from "components/shared/Spinner";
import { Text } from "components/Text";
import { Transaction } from "components/Transaction";
import {
  approveTokenSpend,
  createListingTransaction,
  getCarbonmarkAllowance,
} from "lib/actions";
import {
  DEFAULT_MIN_LISTING_QUANTITY,
  LISTABLE_TOKEN_SYMBOL_REGEX,
} from "lib/constants";
import { LO } from "lib/luckyOrange";
import { getAddress } from "lib/networkAware/getAddress";
import { TransactionStatusMessage, TxnStatus } from "lib/statusMessage";
import { Asset, Listing } from "lib/types/carbonmark.types";
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

  const hasApproval = () => {
    return (
      !!allowanceValue &&
      !!inputValues &&
      Number(allowanceValue) >= Number(inputValues.amount)
    );
  };

  const handleApproval = async () => {
    LO.track("Listing: Approve Clicked");
    if (!provider || !inputValues) return;

    try {
      await approveTokenSpend({
        tokenAddress: inputValues.tokenAddress,
        spender: "carbonmark",
        signer: provider.getSigner(),
        value: inputValues.amount,
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

  const getListableBalance = (asset: Asset): number => {
    if (!LISTABLE_TOKEN_SYMBOL_REGEX.test(asset.token.symbol)) return 0;
    // for the given asset, check if a listing exists
    // if a listing exists, subtract the listed amount from the asset balance
    // return the listable balance
    const listing = props.listings.find(
      (l) => l.tokenAddress.toLowerCase() === asset.token.id.toLowerCase()
    );
    if (!listing) return Number(asset.amount);
    return Number(asset.amount) - Number(listing.leftToSell);
  };

  const hasListableBalance = (asset: Asset): boolean => {
    return getListableBalance(asset) > DEFAULT_MIN_LISTING_QUANTITY;
  };

  const listableAssets = props.assets.filter(hasListableBalance).map((a) => ({
    ...a,
    amount: getListableBalance(a).toString(),
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
          amount={{
            value: t`${inputValues.amount} tonnes`,
          }}
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
