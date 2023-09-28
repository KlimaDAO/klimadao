import { PoolToken } from "@klimadao/lib/constants";
import { formatUnits, safeAdd, useWeb3 } from "@klimadao/lib/utils";
import { t } from "@lingui/macro";
import { Card } from "components/Card";
import { Text } from "components/Text";
import { Col, TwoColLayout } from "components/TwoColLayout";
import { ProjectHeader } from "components/pages/Project/ProjectHeader";
import { parseUnits } from "ethers-v6";
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
import { DetailedProject, TokenPrice } from "lib/types/carbonmark.types";
import { waitForIndexStatus } from "lib/waitForIndexStatus";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { AssetDetails } from "./AssetDetails";
import { CreditCardModal } from "./CreditCardModal";
import { Price } from "./Price";
import { RetireInputs } from "./RetireInputs";
import { RetireModal } from "./RetireModal";
import { SubmitButton } from "./SubmitButton";
import { SuccessScreen } from "./SuccessScreen";
import { TotalValues } from "./TotalValues";
import * as styles from "./styles";
import { FormValues } from "./types";

export interface Props {
  project: DetailedProject;
  price: TokenPrice;
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
  const [fiatMinimum, setFiatMinimum] = useState<string | null>(null);
  const [fiatBalance, setFiatBalance] = useState<string | null>(null);
  const [transactionHash, setTransactionHash] = useState<string | null>(null);
  const [retirementBlockNumber, setRetirementBlockNumber] = useState<number>(0);
  const [subgraphIndexStatus, setSubgraphIndexStatus] = useState<
    "indexed" | "pending" | "timeout"
  >("pending");
  const [retirementIndex, setRetirementIndex] = useState<number | null>(null);
  const [fiatAmountError, setFiatAmountError] = useState<boolean>(false);

  const [showCreditCardModal, setShowCreditCardModal] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [checkoutError, setCheckoutError] = useState<null | string>(null);
  const [costs, setCosts] = useState("");

  const methods = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      projectTokenAddress: props.price.projectTokenAddress,
      paymentMethod: "usdc",
      ...inputValues,
    },
  });

  const quantity = useWatch({ name: "quantity", control: methods.control });
  const paymentMethod = useWatch({
    name: "paymentMethod",
    control: methods.control,
  });

  const router = useRouter();

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

        fiatInfo?.MIN_FIAT_CENTS
          ? setFiatMinimum(fiatInfo.MIN_FIAT_CENTS)
          : setFiatMinimum("100"); // default in fiat api
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
  const disableSubmit =
    !quantity || Number(quantity) <= 0 || Number(costs) < Number(fiatMinimum);
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
      if (e.name === "MinPurchaseRequired") {
        setCheckoutError(t`${e.message}`);
      } else {
        setCheckoutError(
          t`There was an error during the checkout process. Please try again.`
        );
      }
    }
  };

  const continueWithFiat = async (values: FormValues) => {
    setInputValues(values);
    setShowCreditCardModal(true);
  };

  const onContinue = async (values: FormValues) => {
    if (values.paymentMethod === "fiat") {
      continueWithFiat(values);
      setFiatAmountError(false);
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

    const onePercent =
      BigInt(
        parseUnits(
          inputValues.totalPrice,
          getTokenDecimals(inputValues.paymentMethod)
        )
      ) / BigInt(100);

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
      receipt.blockNumber && setRetirementBlockNumber(receipt.blockNumber);
      receipt.retirementIndex && setRetirementIndex(receipt.retirementIndex);
      setIsProcessing(false);
    } catch (e) {
      console.error("makeRetirement error", e);
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    const retirementAddress =
      inputValues?.beneficiaryAddress ?? (address || "");

    const handleInitialIndexing = async () => {
      const status = await waitForIndexStatus(retirementBlockNumber);
      if (status === "indexed") {
        router.prefetch(`/retirements/${retirementAddress}/${retirementIndex}`);
        setSubgraphIndexStatus("indexed");
      } else if (status === "timeout") {
        setSubgraphIndexStatus("timeout");
      }
    };
    if (retirementBlockNumber !== 0 && retirementIndex) {
      handleInitialIndexing();
    }
  }, [retirementBlockNumber]);

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
                fiatMinimum={fiatMinimum}
                price={props.price}
                address={address}
                fiatAmountError={fiatAmountError}
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
          <div className={styles.stickyContentWrapper}>
            <Card>
              <AssetDetails price={props.price} project={props.project} />
            </Card>
            <div className={styles.reverseOrder}>
              <Card>
                <TotalValues
                  price={props.price}
                  userBalance={userBalance}
                  fiatMinimum={fiatMinimum}
                  fiatBalance={fiatBalance}
                  costs={costs}
                  setCosts={setCosts}
                />
              </Card>
            </div>
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
            totalPrice={inputValues?.totalPrice}
            transactionHash={transactionHash}
            paymentMethod={inputValues?.paymentMethod}
            beneficiaryAddress={inputValues?.beneficiaryAddress || address}
            retirementIndex={retirementIndex}
            subgraphIndexStatus={subgraphIndexStatus}
          />
        }
        showSuccessScreen={
          !!transactionHash &&
          !!(
            subgraphIndexStatus === "indexed" ||
            subgraphIndexStatus === "timeout"
          )
        }
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
