import { PoolToken } from "@klimadao/lib/constants";
import { useWeb3 } from "@klimadao/lib/utils";
import { t } from "@lingui/macro";
import { AssetDetails } from "components/AssetDetails";
import { Card } from "components/Card";
import { Text } from "components/Text";
import { Col, TwoColLayout } from "components/TwoColLayout";
import { ProjectHeader } from "components/pages/Project/ProjectHeader";
import { approveTokenSpend, getUSDCBalance } from "lib/actions";
import {
  getRetirementAllowance,
  retireCarbonTransaction,
} from "lib/actions.retire";
import {
  MINIMUM_TONNE_QUANTITY,
  MINIMUM_TONNE_QUANTITY_BANK_TRANSFER,
  urls,
} from "lib/constants";
import { redirectFiatCheckout } from "lib/fiat/fiatCheckout";
import { getFiatInfo } from "lib/fiat/fiatInfo";
import { getPoolApprovalValue } from "lib/getPoolData";
import { TransactionStatusMessage, TxnStatus } from "lib/statusMessage";
import {
  CarbonmarkPaymentMethod,
  CarbonmarkPaymentMethods,
  ListingProduct,
  PoolProduct,
  Product,
  Project,
} from "lib/types/carbonmark.types";
import { waitForIndexStatus } from "lib/waitForIndexStatus";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { BankTransferModal } from "./BankTransferModal";
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
  project: Project;
  product: Product;
}

export const RetireForm: FC<Props> = (props) => {
  const router = useRouter();
  const { prefetch } = useRouter();
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
  const [showBankTransferModal, setShowBankTransferModal] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [checkoutError, setCheckoutError] = useState<null | string>(null);
  const [costs, setCosts] = useState("");

  const { product } = props;
  const defaultPaymentMethod: CarbonmarkPaymentMethod = "fiat";

  const methods = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      projectTokenAddress: isPool(product)
        ? product?.projectTokenAddress
        : undefined,
      paymentMethod: defaultPaymentMethod,
      ...inputValues,
    },
  });

  const quantity = useWatch({ name: "quantity", control: methods.control });
  const paymentMethod = useWatch({
    name: "paymentMethod",
    control: methods.control,
  });

  useEffect(() => {
    // for the usdc icons to be visible for the required transition
    // on first load the default paymentMethod is set as usdc & then
    // immediately set to fiat.
    methods.setValue("paymentMethod", defaultPaymentMethod);
  }, []);

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

  const isQuantityValid = !quantity || Number(quantity) <= 0;

  const disableSubmit =
    isQuantityValid ||
    (paymentMethod === "fiat"
      ? Number(costs) < Number(fiatMinimum)
      : paymentMethod === "bank-transfer"
      ? Number(quantity) < Number(MINIMUM_TONNE_QUANTITY_BANK_TRANSFER)
      : Number(quantity) < Number(MINIMUM_TONNE_QUANTITY));

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
      project_address:
        isPool(product) && !product.isPoolDefault
          ? inputValues.projectTokenAddress
          : null,
      retirement_token: isPool(product)
        ? (product.poolName.toLowerCase() as PoolToken)
        : null,
      listing_id: isListing(product) ? product.id : null,
    };
    try {
      setIsRedirecting(true);
      await redirectFiatCheckout({
        cancelUrl: `${urls.baseUrl}${router.asPath}`,
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

  const handleBankTransfer = async () => {
    const values = methods.getValues();
    router.push({
      pathname: "/retire/pay-with-bank",
      query: {
        quantity,
        project_name: `${props?.project.name} (${props.project.registry}-${props.project.projectID}-${props.project.vintage})`,
        beneficiary_address: values.beneficiaryAddress || address || "",
        beneficiary_name: values.beneficiaryName || "",
        retirement_message: values.retirementMessage || "",
      },
    });
  };

  const onContinue = async (values: FormValues) => {
    if (values.paymentMethod === "bank-transfer") {
      setShowBankTransferModal(true);
      return;
    }

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
      inputValues.paymentMethod === "usdc" &&
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
        product: product,
        paymentMethod: inputValues.paymentMethod,
        maxAmountIn: getApprovalValue(),
        quantity: inputValues.quantity,
        beneficiaryAddress: inputValues.beneficiaryAddress,
        beneficiaryName: inputValues.beneficiaryName,
        retirementMessage: inputValues.retirementMessage,
        onStatus: onUpdateStatus,
      });

      receipt.transactionHash && setTransactionHash(receipt.transactionHash);
      receipt.blockNumber && setRetirementBlockNumber(receipt.blockNumber);
      receipt.retirementIndex && setRetirementIndex(receipt.retirementIndex);
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
        prefetch(`/retirements/${retirementAddress}/${retirementIndex}`);
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
              <Price price={product.singleUnitPrice} />
              <RetireInputs
                onSubmit={onContinue}
                values={inputValues}
                userBalance={userBalance}
                fiatBalance={fiatBalance}
                fiatMinimum={fiatMinimum}
                product={product}
                address={address}
                fiatAmountError={fiatAmountError}
                approvalValue={getApprovalValue()}
                enabledPaymentMethods={Array.from(CarbonmarkPaymentMethods)}
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
              <AssetDetails
                product={product}
                project={props.project}
                actionLabel={t`Retiring Token`}
                availableLabel={t`Available to retire`}
              />
            </Card>
            <div className={styles.reverseOrder}>
              <Card>
                <TotalValues
                  product={product}
                  userBalance={userBalance}
                  fiatMinimum={fiatMinimum}
                  fiatBalance={fiatBalance}
                  costs={costs}
                  setCosts={setCosts}
                  approvalValue={getApprovalValue()}
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
        amount={inputValues?.totalPrice || "0"}
        approvalValue={getApprovalValue()}
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
      <BankTransferModal
        showModal={showBankTransferModal}
        onSubmit={handleBankTransfer}
        onCancel={() => setShowBankTransferModal(false)}
      />
    </FormProvider>
  );
};

function isPool(product: Product): product is PoolProduct {
  return product.type === "pool";
}

function isListing(product: Product): product is ListingProduct {
  return product.type === "listing";
}
