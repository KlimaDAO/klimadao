import { PoolToken } from "@klimadao/lib/constants";
import { formatUnits, safeAdd, useWeb3 } from "@klimadao/lib/utils";
import { t } from "@lingui/macro";
import { Card } from "components/Card";
import { ProjectHeader } from "components/pages/Project/ProjectHeader";
import { Text } from "components/Text";
import { Col, TwoColLayout } from "components/TwoColLayout";
import { utils } from "ethers";
import { approveTokenSpend, getUSDCBalance } from "lib/actions";
import {
  getRetirementAllowance,
  retireCarbonTransaction,
} from "lib/actions.retire";
import { getTokenDecimals } from "lib/networkAware/getTokenDecimals";
import { TransactionStatusMessage, TxnStatus } from "lib/statusMessage";
import { Price as PriceType, Project } from "lib/types/carbonmark";
import { FC, useEffect, useState } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { AssetDetails } from "./AssetDetails";
import { Price } from "./Price";
import { RetireInputs } from "./RetireInputs";
import { RetireModal } from "./RetireModal";
import * as styles from "./styles";
import { SubmitButton } from "./SubmitButton";
import { SuccessScreen } from "./SuccessScreen";
import { TotalValues } from "./TotalValues";
import { FormValues } from "./types";
export interface Props {
  project: Project;
  price: PriceType;
}

export const RetireForm: FC<Props> = (props) => {
  const { address, provider } = useWeb3();
  const [isLoadingAllowance, setIsLoadingAllowance] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [inputValues, setInputValues] = useState<FormValues | null>(null);
  const [status, setStatus] = useState<TransactionStatusMessage | null>(null);
  const [allowanceValue, setAllowanceValue] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [transactionHash, setTransactionHash] = useState<string | null>(null);
  const [retirementIndex, setRetirementIndex] = useState<number | null>(null);

  const methods = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      projectAddress: props.project.projectAddress,
      paymentMethod: "usdc",
      ...inputValues,
    },
  });

  const quantity = useWatch({ name: "quantity", control: methods.control });

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
  const disableSubmit = !!address && (!quantity || Number(quantity) <= 0);

  const resetStateAndCancel = () => {
    setInputValues(null);
    setAllowanceValue(null);
    setStatus(null);
    setIsLoadingAllowance(false);
    setIsProcessing(false);
    setTransactionHash(null);
  };

  const onModalClose = !isPending ? resetStateAndCancel : undefined;

  const onUpdateStatus = (status: TxnStatus, message?: string) => {
    setStatus({ statusType: status, message: message });
  };

  const onContinue = async (values: FormValues) => {
    setIsLoadingAllowance(true);
    try {
      if (!address || values.paymentMethod === "fiat") return;

      const allowance = await getRetirementAllowance({
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
      setErrorMessage(t`something went wrong loading the allowance`);
    } finally {
      setIsLoadingAllowance(false);
    }
  };

  const getApprovalValue = (): string => {
    if (!inputValues?.totalPrice) return "0";

    const onePercent = utils
      .parseUnits(
        inputValues.totalPrice,
        getTokenDecimals(inputValues.paymentMethod)
      )
      .div("100");
    const val = safeAdd(
      inputValues.totalPrice,
      formatUnits(onePercent, getTokenDecimals(inputValues.paymentMethod))
    );
    return val;
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
          value: getApprovalValue(),
          onStatus: onUpdateStatus,
        }));
    } catch (e) {
      console.error(e);
    }
  };

  const onMakeRetirement = async () => {
    if (!provider || !inputValues) return;

    try {
      setIsProcessing(true);
      const receipt = await retireCarbonTransaction({
        provider,
        address,
        projectAddress: props.price.poolTokenAddress,
        paymentMethod: inputValues.paymentMethod,
        isPoolDefault: props.price.isPoolDefault,
        maxAmountIn: getApprovalValue(),
        retirementToken: props.price.name.toLowerCase() as PoolToken,
        quantity: inputValues.quantity,
        beneficiaryAddress: inputValues.beneficiaryAddress,
        beneficiaryName: inputValues.beneficiaryName,
        retirementMessage: inputValues.retirementMessage,
        onStatus: onUpdateStatus,
      });
      receipt.transactionHash && setTransactionHash(receipt.transactionHash);
      receipt.retirementIndex && setRetirementIndex(receipt.retirementIndex);
      setIsProcessing(false);
    } catch (e) {
      console.error("makeRetirement error", e);
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

              <RetireInputs
                onSubmit={onContinue}
                values={inputValues}
                balance={balance}
                price={props.price}
              />

              <SubmitButton
                onSubmit={onContinue}
                isLoading={isLoadingAllowance}
                className={styles.showOnDesktop}
                disabled={disableSubmit}
              />

              {errorMessage && <Text>{errorMessage}</Text>}
            </div>
          </Card>
        </Col>
        <Col>
          <Card>
            <AssetDetails price={props.price} project={props.project} />
          </Card>
          <div className={styles.reverseOrder}>
            <Card>
              <TotalValues price={props.price} balance={balance} />
            </Card>
          </div>
          <SubmitButton
            onSubmit={onContinue}
            isLoading={isLoadingAllowance}
            className={styles.hideOnDesktop}
            disabled={disableSubmit}
          />
        </Col>
      </TwoColLayout>

      <RetireModal
        hasApproval={hasApproval()}
        amount={{
          value: inputValues?.totalPrice || "0",
          token:
            (inputValues?.paymentMethod !== "fiat" &&
              inputValues?.paymentMethod) ||
            "usdc",
        }}
        approvalValue={{
          value: getApprovalValue(),
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
        onSubmit={onMakeRetirement}
        onCancel={resetStateAndCancel}
        onResetStatus={() => setStatus(null)}
        successScreen={
          <SuccessScreen
            project={props.project}
            totalPrice={inputValues?.totalPrice}
            transactionHash={transactionHash}
            paymentMethod={inputValues?.paymentMethod}
            address={address}
            retirementIndex={retirementIndex}
          />
        }
        showSuccessScreen={!!transactionHash}
      />
    </FormProvider>
  );
};
