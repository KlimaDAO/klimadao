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
import { urls } from "lib/constants";
import { redirectFiatCheckout } from "lib/fiat/fiatCheckout";
import { getFiatInfo } from "lib/fiat/fiatInfo";
import { getTokenDecimals } from "lib/networkAware/getTokenDecimals";
import { TransactionStatusMessage, TxnStatus } from "lib/statusMessage";
import { Price as PriceType, Project } from "lib/types/carbonmark";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { AssetDetails } from "./AssetDetails";
import { CreditCardModal } from "./CreditCardModal";
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
  const { asPath } = useRouter();
  const { address, provider } = useWeb3();
  const [isLoadingAllowance, setIsLoadingAllowance] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [inputValues, setInputValues] = useState<FormValues | null>(null);
  const [status, setStatus] = useState<TransactionStatusMessage | null>(null);
  const [allowanceValue, setAllowanceValue] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [userBalance, setUserBalance] = useState<string | null>(null);
  const [fiatBalance, setFiatBalance] = useState<string | null>(null);
  const [transactionHash, setTransactionHash] = useState<string | null>(null);
  const [retirementIndex, setRetirementIndex] = useState<number | null>(null);

  const [showCreditCardModal, setShowCreditCardModal] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [checkoutError, setCheckoutError] = useState<null | string>(null);

  const methods = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      projectTokenAddress: props.price.projectTokenAddress,
      paymentMethod: "fiat",
      ...inputValues,
    },
  });

  const quantity = useWatch({ name: "quantity", control: methods.control });
  const paymentMethod = useWatch({
    name: "paymentMethod",
    control: methods.control,
  });

  useEffect(() => {
    if (!address) return;

    const getBalance = async () => {
      const balance = await getUSDCBalance({
        userAddress: address,
      });

      setUserBalance(balance);
    };

    !userBalance && getBalance();
  }, [address]);

  useEffect(() => {
    const getFiatMaxBalance = async () => {
      try {
        const fiatInfo = await getFiatInfo();

        fiatInfo?.MAX_USDC
          ? setFiatBalance(fiatInfo.MAX_USDC)
          : setFiatBalance("2000"); // default for production
      } catch (e) {
        console.error(e);
        setFiatBalance("2000"); // default for production
      }
    };

    !fiatBalance && getFiatMaxBalance();
  }, []);

  const isPending =
    status?.statusType === "userConfirmation" ||
    status?.statusType === "networkConfirmation" ||
    isProcessing;

  const showTransactionView = !!inputValues && !!allowanceValue;
  const disableSubmit = !quantity || Number(quantity) <= 0;

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

  const handleFiat = async () => {
    if (paymentMethod !== "fiat" || !inputValues) return;

    const reqParams = {
      quantity,
      beneficiary_address: inputValues.beneficiaryAddress || address || "", // typeguard, either or should exist, don't pass empty string
      beneficiary_name: inputValues.beneficiaryName,
      retirement_message: inputValues.retirementMessage,
      // pass token address if not default project
      project_address: !props.price.isPoolDefault
        ? inputValues.projectTokenAddress
        : null,
      retirement_token: props.price.poolName.toLowerCase() as PoolToken,
    };
    try {
      setIsRedirecting(true);
      await redirectFiatCheckout({
        cancelUrl: `${urls.baseUrl}${asPath}`,
        referrer: "carbonmark",
        retirement: reqParams,
      });
      // do retire redirect
      return;
    } catch (e) {
      console.error(e);
      setIsRedirecting(false);
      setCheckoutError(
        t`There was an error during the checkout process. Please try again.`
      );
    }
  };

  const continueWithFiat = async (values: FormValues) => {
    setInputValues(values);
    setShowCreditCardModal(true);
  };

  const onContinue = async (values: FormValues) => {
    if (values.paymentMethod === "fiat") {
      continueWithFiat(values);
      return;
    }

    try {
      if (!address) return;
      setIsLoadingAllowance(true);

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
        projectAddress: props.price.projectTokenAddress,
        paymentMethod: inputValues.paymentMethod,
        isPoolDefault: props.price.isPoolDefault,
        maxAmountIn: getApprovalValue(),
        retirementToken: props.price.poolName.toLowerCase() as PoolToken,
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
                userBalance={userBalance}
                fiatBalance={fiatBalance}
                price={props.price}
                address={address}
              />

              <SubmitButton
                onSubmit={onContinue}
                isLoading={isLoadingAllowance}
                className={styles.showOnDesktop}
                paymentMethod={paymentMethod}
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
              <TotalValues
                price={props.price}
                userBalance={userBalance}
                fiatBalance={fiatBalance}
              />
            </Card>
          </div>
          <SubmitButton
            onSubmit={onContinue}
            isLoading={isLoadingAllowance}
            className={styles.hideOnDesktop}
            paymentMethod={paymentMethod}
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

      <CreditCardModal
        showModal={showCreditCardModal}
        isRedirecting={isRedirecting}
        onCancel={() => setShowCreditCardModal(false)}
        onSubmit={handleFiat}
        checkoutError={checkoutError}
      />
    </FormProvider>
  );
};
