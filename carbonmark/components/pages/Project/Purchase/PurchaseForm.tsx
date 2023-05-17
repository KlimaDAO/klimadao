import { useWeb3 } from "@klimadao/lib/utils";
import { t } from "@lingui/macro";
import { Card } from "components/Card";
import { Text } from "components/Text";
import { Col, TwoColLayout } from "components/TwoColLayout";
import { approveTokenSpend, getUSDCBalance, makePurchase } from "lib/actions";
import { LO } from "lib/luckyOrange";
import { getAllowance } from "lib/networkAware/getAllowance";
import { getContract } from "lib/networkAware/getContract";
import { getStaticProvider } from "lib/networkAware/getStaticProvider";
import { TransactionStatusMessage, TxnStatus } from "lib/statusMessage";
import { Listing, Project } from "lib/types/carbonmark";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Price } from "./Price";
import { ProjectHeader } from "./ProjectHeader";
import { PurchaseInputs } from "./PurchaseInputs";
import { PurchaseModal } from "./PurchaseModal";
import * as styles from "./styles";
import { SubmitButton } from "./SubmitButton";
import { TotalValues } from "./TotalValues";
import { FormValues } from "./types";

export interface Props {
  project: Project;
  listing: Listing;
}

export const PurchaseForm: FC<Props> = (props) => {
  const { push } = useRouter();
  const { address, provider } = useWeb3();
  const [isLoadingAllowance, setIsLoadingAllowance] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [inputValues, setInputValues] = useState<FormValues | null>(null);
  const [status, setStatus] = useState<TransactionStatusMessage | null>(null);
  const [allowanceValue, setAllowanceValue] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);

  const methods = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      listingId: props.listing.id,
      ...inputValues,
    },
  });

  useEffect(() => {
    if (!address) return;

    const getBalance = async () => {
      const balance = await getUSDCBalance({
        userAddress: address,
      });

      setBalance(balance);
    };

    !balance && getBalance();
  }, [address]);

  const isPending =
    status?.statusType === "userConfirmation" ||
    status?.statusType === "networkConfirmation" ||
    isProcessing;

  const showTransactionView = !!inputValues && !!allowanceValue;

  const resetStateAndCancel = () => {
    setInputValues(null);
    setAllowanceValue(null);
    setStatus(null);
    setIsLoadingAllowance(false);
    setIsProcessing(false);
    LO.track("Purchase: Purchase Modal Closed");
  };

  const onModalClose = !isPending ? resetStateAndCancel : undefined;

  const onUpdateStatus = (status: TxnStatus, message?: string) => {
    setStatus({ statusType: status, message: message });
  };

  const onContinue = async (values: FormValues) => {
    setIsLoadingAllowance(true);
    try {
      if (!address) return;
      const allowance = await getAllowance({
        contract: getContract({
          contractName: "usdc",
          provider: getStaticProvider(),
        }),
        address,
        spender: "carbonmark",
        token: "usdc",
      });
      setAllowanceValue(allowance.usdc.carbonmark);
      setInputValues(values);
    } catch (e) {
      console.error(e);
      setErrorMessage(
        t({
          id: "purchase.loading.allowance.error",
          message: "something went wrong loading the allowance",
        })
      );
    } finally {
      setIsLoadingAllowance(false);
    }
  };

  const hasApproval = () => {
    return (
      !!allowanceValue &&
      !!inputValues &&
      Number(allowanceValue) >= Number(inputValues.price)
    );
  };

  const handleApproval = async () => {
    LO.track("Purchase: Approve Clicked");
    if (!provider || !inputValues) return;
    try {
      await approveTokenSpend({
        tokenName: "usdc",
        spender: "carbonmark",
        signer: provider.getSigner(),
        value: inputValues.price,
        onStatus: onUpdateStatus,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const onMakePurchase = async () => {
    LO.track("Purchase: Submit Clicked");
    if (!provider || !inputValues) return;

    try {
      setIsProcessing(true);
      const result = await makePurchase({
        listingId: inputValues.listingId,
        amount: inputValues.amount,
        price: inputValues.price,
        provider,
        onStatus: onUpdateStatus,
      });

      if (result.hash) {
        push(`/purchases/${result.hash}`);
        LO.track("Purchase: Purchase Completed");
      }
    } catch (e) {
      console.error("makePurchase error", e);
      setIsProcessing(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <TwoColLayout>
        <Col>
          <Card>
            <ProjectHeader project={props.project} listing={props.listing} />
            <div className={styles.formContainer}>
              <Price price={props.listing.singleUnitPrice} />

              <PurchaseInputs
                onSubmit={onContinue}
                listing={props.listing}
                values={inputValues}
                balance={balance}
              />

              <SubmitButton
                onSubmit={onContinue}
                isLoading={isLoadingAllowance}
                className={styles.showOnDesktop}
              />

              {errorMessage && <Text>{errorMessage}</Text>}
            </div>
          </Card>
        </Col>
        <Col>
          <Card>
            <TotalValues
              singleUnitPrice={props.listing.singleUnitPrice}
              balance={balance}
            />
          </Card>
          <SubmitButton
            onSubmit={onContinue}
            isLoading={isLoadingAllowance}
            className={styles.hideOnDesktop}
          />
        </Col>
      </TwoColLayout>

      <PurchaseModal
        hasApproval={hasApproval()}
        amount={{
          value: inputValues?.price || "0",
          token: inputValues?.paymentMethod || "usdc",
        }}
        isProcessing={isProcessing}
        status={status}
        showModal={showTransactionView}
        onModalClose={onModalClose}
        handleApproval={handleApproval}
        onSubmit={onMakePurchase}
        onCancel={resetStateAndCancel}
        onResetStatus={() => setStatus(null)}
      />
    </FormProvider>
  );
};
