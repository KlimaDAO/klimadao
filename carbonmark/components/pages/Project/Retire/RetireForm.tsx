import { useWeb3 } from "@klimadao/lib/utils";
import { t } from "@lingui/macro";
import { Card } from "components/Card";
import { ProjectHeader } from "components/pages/Project/ProjectHeader";
import { Text } from "components/Text";
import { Col, TwoColLayout } from "components/TwoColLayout";
import {
  approveTokenSpend,
  getUSDCBalance,
  retireCarbonTransaction,
} from "lib/actions";
import { getAllowance } from "lib/networkAware/getAllowance";
import { getContract } from "lib/networkAware/getContract";
import { getStaticProvider } from "lib/networkAware/getStaticProvider";
import { TransactionStatusMessage, TxnStatus } from "lib/statusMessage";
import { Price as PriceType, Project } from "lib/types/carbonmark";
import { FC, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { AssetDetails } from "./AssetDetails";
import { Price } from "./Price";
import { RetireInputs } from "./RetireInputs";
import { RetireModal } from "./RetireModal";
import * as styles from "./styles";
import { SubmitButton } from "./SubmitButton";
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

  const methods = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      projectAddress: props.project.projectAddress,
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
      setErrorMessage(t`something went wrong loading the allowance`);
    } finally {
      setIsLoadingAllowance(false);
    }
  };

  const hasApproval = () => {
    return (
      !!allowanceValue &&
      !!inputValues &&
      Number(allowanceValue) >= Number(inputValues.totalPrice)
    );
  };

  const handleApproval = async () => {
    if (!provider || !inputValues) return;
    try {
      inputValues.paymentMethod !== "fiat" &&
        (await approveTokenSpend({
          tokenName: inputValues.paymentMethod,
          spender: "retirementAggregatorV2",
          signer: provider.getSigner(),
          value: inputValues.quantity,
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
      await retireCarbonTransaction({
        provider,
        address,
        projectAddress: props.project.projectAddress,
        paymentMethod: inputValues.paymentMethod,
        maxAmountIn: "88", // TODO
        retirementToken: inputValues.retirementToken,
        quantity: inputValues.quantity,
        beneficiaryAddress: inputValues.beneficiaryAddress,
        beneficiaryName: inputValues.beneficiaryName,
        retirementMessage: inputValues.retirementMessage,
        onStatus: onUpdateStatus,
      });
    } catch (e) {
      console.error("makeRetirement error", e);
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
              <TotalValues
                singleUnitPrice={props.price.singleUnitPrice}
                balance={balance}
                pool={
                  props.price.name.toLowerCase() as Lowercase<PriceType["name"]>
                }
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

      <RetireModal
        hasApproval={hasApproval()}
        amount={{
          value: inputValues?.quantity || "0",
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
      />
    </FormProvider>
  );
};
