import { PoolToken } from "@klimadao/lib/constants";
import { useWeb3 } from "@klimadao/lib/utils";
import { t } from "@lingui/macro";
import { Card } from "components/Card";
import { ProjectHeader } from "components/pages/Project/ProjectHeader";
import { Text } from "components/Text";
import { Col, TwoColLayout } from "components/TwoColLayout";
import { approveTokenSpend, getUSDCBalance } from "lib/actions";
import {
  getRedeemAllowance,
  redeemCarbonTransaction,
} from "lib/actions.redeem";
import { TransactionStatusMessage, TxnStatus } from "lib/statusMessage";
import { Price as PriceType, Project } from "lib/types/carbonmark";
import { FC, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as styles from "../styles";
import { AssetDetails } from "./AssetDetails";
import { Price } from "./Price";
import { PurchaseInputs } from "./PurchaseInputs";
import { PurchaseModal } from "./PurchaseModal";
import { SubmitButton } from "./SubmitButton";
import { SuccessScreen } from "./SuccessScreen";
import { TotalValues } from "./TotalValues";
import { FormValues } from "./types";

export interface Props {
  project: Project;
  price: PriceType;
}

export const PurchaseForm: FC<Props> = (props) => {
  const { address, provider } = useWeb3();
  const [isLoadingAllowance, setIsLoadingAllowance] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [inputValues, setInputValues] = useState<FormValues | null>(null);
  const [status, setStatus] = useState<TransactionStatusMessage | null>(null);
  const [allowanceValue, setAllowanceValue] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [transactionHash, setTransactionHash] = useState<string | null>(null);

  const methods = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      paymentMethod: "usdc",
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
  };

  const onModalClose = !isPending ? resetStateAndCancel : undefined;

  const onUpdateStatus = (status: TxnStatus, message?: string) => {
    setStatus({ statusType: status, message: message });
  };

  const onContinue = async (values: FormValues) => {
    setIsLoadingAllowance(true);
    try {
      if (!address || values.paymentMethod === "fiat") return;

      const allowance = await getRedeemAllowance({
        userAddress: address,
        token: values.paymentMethod,
      });
      allowance &&
        setAllowanceValue(
          allowance[values.paymentMethod].retirementAggregatorV2
        );
      setInputValues(values);
    } catch (e) {
      console.error(e);
      setErrorMessage(t`Something went wrong loading the allowance`);
    } finally {
      setIsLoadingAllowance(false);
    }
  };

  // compare with total price including fees
  const hasApproval = () => {
    return (
      !!allowanceValue &&
      !!inputValues &&
      Number(allowanceValue) >= Number(inputValues.totalPrice)
    );
  };

  // approve with total price including fees
  const handleApproval = async () => {
    if (!provider || !inputValues) return;
    try {
      inputValues.paymentMethod !== "fiat" &&
        (await approveTokenSpend({
          tokenName: inputValues.paymentMethod,
          spender: "retirementAggregatorV2",
          signer: provider.getSigner(),
          value: inputValues.totalPrice,
          onStatus: onUpdateStatus,
        }));
    } catch (e) {
      console.error(e);
    }
  };

  const onMakeRedeem = async () => {
    if (!provider || !inputValues) return;

    try {
      setIsProcessing(true);
      const result = await redeemCarbonTransaction({
        paymentMethod: inputValues.paymentMethod,
        pool: props.price.name.toLowerCase() as PoolToken,
        maxCost: inputValues.totalPrice,
        projectTokenAddress: props.price.poolTokenAddress,
        isPoolDefault: props.price.isPoolDefault,
        quantity: inputValues.quantity,
        provider,
        onStatus: onUpdateStatus,
      });
      result.transactionHash && setTransactionHash(result.transactionHash);
      setIsProcessing(false);
    } catch (e) {
      console.error("onMakeRedeem error", e);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <TwoColLayout>
        <Col>
          <Card>
            <ProjectHeader project={props.project} />
            <div className={styles.formContainer}>
              <Price price={props.price.singleUnitPrice} />

              <PurchaseInputs
                onSubmit={onContinue}
                price={props.price}
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
            <TotalValues balance={balance} price={props.price} />
          </Card>
          <Card>
            <AssetDetails price={props.price} project={props.project} />
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
          value: inputValues?.totalPrice || "0",
          token:
            (inputValues?.paymentMethod !== "fiat" &&
              inputValues?.paymentMethod) ||
            "usdc",
        }}
        isProcessing={isProcessing}
        status={status}
        showModal={showTransactionView}
        onModalClose={onModalClose}
        handleApproval={handleApproval}
        onSubmit={onMakeRedeem}
        onCancel={resetStateAndCancel}
        onResetStatus={() => setStatus(null)}
        successScreen={
          <SuccessScreen
            project={props.project}
            totalPrice={inputValues?.totalPrice}
            transactionHash={transactionHash}
            paymentMethod={inputValues?.paymentMethod}
            address={address}
            price={props.price}
            quantity={inputValues?.quantity || "0"}
          />
        }
        showSuccessScreen={!!transactionHash}
      />
    </FormProvider>
  );
};
