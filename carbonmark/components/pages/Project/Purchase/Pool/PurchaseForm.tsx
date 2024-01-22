import { useWeb3 } from "@klimadao/lib/utils";
import { t } from "@lingui/macro";
import { AssetDetails } from "components/AssetDetails";
import { Card } from "components/Card";
import { Text } from "components/Text";
import { Col, TwoColLayout } from "components/TwoColLayout";
import { ProjectHeader } from "components/pages/Project/ProjectHeader";
import { approveTokenSpend, getUSDCBalance } from "lib/actions";
import {
  getRedeemAllowance,
  redeemCarbonTransaction,
} from "lib/actions.redeem";
import { getPoolApprovalValue } from "lib/getPoolData";
import { TransactionStatusMessage, TxnStatus } from "lib/statusMessage";
import { TokenPrice as PriceType, Project } from "lib/types/carbonmark.types";
import { FC, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as styles from "../styles";
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
  const [costs, setCosts] = useState("");

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
      if (
        !address ||
        values.paymentMethod === "fiat" ||
        values.paymentMethod === "bank-transfer"
      )
        return;

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

  const getApprovalValue = () => getPoolApprovalValue(costs);

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
        inputValues.paymentMethod !== "bank-transfer" &&
        (await approveTokenSpend({
          tokenName: inputValues.paymentMethod,
          spender: "retirementAggregatorV2",
          signer: provider.getSigner(),
          value: getApprovalValue(),
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
        pool: props.price.poolName,
        maxCost: getApprovalValue(),
        projectTokenAddress: props.price.projectTokenAddress,
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
                approvalValue={getApprovalValue()}
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
          <div className={styles.stickyContentWrapper}>
            <Card>
              <TotalValues
                balance={balance}
                price={props.price}
                costs={costs}
                setCosts={setCosts}
                approvalValue={getApprovalValue()}
              />
            </Card>
            <Card>
              <AssetDetails
                price={props.price}
                project={props.project}
                actionLabel={t`Token you will receive`}
                availableLabel={t`Available to purchase`}
              />
            </Card>
          </div>
          <SubmitButton
            onSubmit={onContinue}
            isLoading={isLoadingAllowance}
            className={styles.hideOnDesktop}
          />
        </Col>
      </TwoColLayout>

      <PurchaseModal
        hasApproval={hasApproval()}
        amount={inputValues?.totalPrice || "0"}
        approvalValue={getApprovalValue()}
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
