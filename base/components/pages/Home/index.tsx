import { Anchor, LogoWithClaim, Text } from "@klimadao/lib/components";
import { OffsetInputToken } from "@klimadao/lib/constants";
import {
  getTokenDecimals,
  safeAdd,
  trimStringDecimals,
} from "@klimadao/lib/utils";
import GppMaybeOutlinedIcon from "@mui/icons-material/GppMaybeOutlined";
import { BaseLogo } from "components/Logos/BaseLogo";
import { TransactionModal } from "components/TransactionModal";
import {
  BrowserProvider,
  JsonRpcSigner,
  Signer,
  formatUnits,
  parseUnits,
} from "ethers";
import { useIsMounted } from "hooks/useIsMounted";
import { formatTonnes } from "lib/formatTonnes";
import {
  getOffsetConsumptionCost,
  submitCrossChain,
} from "lib/submitCrossChain";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Address, useAccount, useBalance, useNetwork } from "wagmi";
import { addresses } from "../../../lib/constants";
import { tokenInfoMap } from "../../../lib/getTokenInfo";
import { ButtonPrimary } from "../../Buttons/ButtonPrimary";
import { Connect } from "../../Connect";
import * as styles from "./styles";

export type TxnStatus = "networkConfirmation" | "done" | "error" | null;

export type StatusMessage = {
  statusType: TxnStatus;
  message?: string;
} | null;

const initialFormState = {
  quantity: "0",
  beneficiaryString: "",
  retirementMessage: "Doing my part to support climate action",
};

// TODO: add lingui for translations
export const Home = () => {
  const { chain } = useNetwork();
  const isMounted = useIsMounted();
  const { address, isConnected, connector } = useAccount();
  const { data } = useBalance({
    address,
    token: addresses.base.klima as Address,
  });
  const [paymentToken] = useState<OffsetInputToken>("klima");
  const [status, setStatus] = useState<StatusMessage>(null);
  const [signer, setSigner] = useState<Signer | undefined>();
  const [showTransactionModal, setShowTransactionModal] = useState(false);

  const [cost, setCost] = useState("");
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(initialFormState.quantity);
  const [beneficiaryString, setBeneficiaryString] = useState(
    initialFormState.beneficiaryString
  );
  const [retirementMessage, setRetirementMessage] = useState(
    initialFormState.retirementMessage
  );

  useEffect(() => {
    if (!connector) return;
    connector
      .getProvider()
      .then((provider) => {
        const browserProvider = new BrowserProvider(provider);
        setSigner(new JsonRpcSigner(browserProvider, address as Address));
      })
      .catch((e) => console.error("An error occurred", e));
  }, [connector]);

  useEffect(() => {
    if (Number(quantity) === 0) return;
    const offsetConsumptionCost = async () => {
      const [cost] = await getOffsetConsumptionCost({
        inputToken: paymentToken,
        retirementToken: "bct",
        quantity: quantity,
      });
      // handle error when calculating cost
      if (cost === "e") {
        setError("Quantity too large");
        return;
      }
      setError("");
      setCost(cost);
    };
    offsetConsumptionCost();
  }, [quantity]);

  const handleQuantityChange = (value: string) => {
    // only allow up to 10 digits in input field
    const truncatedValue = value.slice(0, 10);
    const valueToWholeNumber = Math.ceil(Number(truncatedValue)).toString();
    setQuantity(valueToWholeNumber);
  };

  const resetFormState = () => {
    // TODO - code smell - clean this up with react-hook-form or useReducer
    setCost("");
    setQuantity(initialFormState.quantity);
    setBeneficiaryString(initialFormState.beneficiaryString);
    setRetirementMessage(initialFormState.retirementMessage);
  };

  const closeModal = () => {
    setStatus(null);
    setShowTransactionModal(false);
  };

  const getRetirementCost = (): string => {
    if (!cost) return "0";
    const onePercent =
      BigInt(parseUnits(cost, getTokenDecimals(paymentToken))) / BigInt("100");
    return safeAdd(
      cost,
      formatUnits(onePercent, getTokenDecimals(paymentToken))
    );
  };

  const insufficientBalance = data?.value
    ? Number(cost) > Number(formatUnits(data.value.toString(), 9))
    : "0";

  const wrongNetworkOrNotConnected =
    !isConnected || !address || !!chain?.unsupported;

  const getButtonProps = () => {
    if (!quantity || !Number(quantity)) {
      return {
        label: `Enter quantity`,
        disabled: true,
      };
    } else if (error !== "") {
      return {
        label: error,
        disabled: true,
      };
    } else if (insufficientBalance) {
      return {
        label: "Insufficient balance",
        disabled: true,
      };
    } else if (beneficiaryString === "") {
      return {
        label: "Beneficiary required",
        disabled: true,
      };
    } else if (retirementMessage === "") {
      return {
        label: "Retirment message required",
        disabled: true,
      };
    }
    return {
      label: "Retire Carbon",
      onClick: () => setShowTransactionModal(true),
    };
  };

  const handleCrossChainRetirement = async () => {
    await submitCrossChain({
      signer,
      quantity,
      beneficiaryString,
      retirementMessage,
      maxAmountIn: getRetirementCost(),
      beneficiaryAddress: address as string,
      onStatus: (statusType, message) => setStatus({ statusType, message }),
    });
    resetFormState();
  };

  const formattedCost = () => {
    const cost = getRetirementCost();
    return !cost
      ? "0"
      : Number(cost) > 1
      ? trimStringDecimals(cost, 3)
      : trimStringDecimals(cost, 5);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <a href="https://app.klimadao.finance">
          <LogoWithClaim className="logo" />
        </a>
        <Connect />
      </div>
      <div className={styles.textHeading}>
        <Text t="badge" className="newBadge">
          ✨ New!
        </Text>
        <Text as="h1" t="h2">
          Retire carbon on <BaseLogo className="baseIcon" />
          <span className="base">BASE</span>
        </Text>
        <Text t="body8">
          KlimaDAO is officially{" "}
          <Anchor href="https://forum.klimadao.finance/d/321-kip-62-build-on-base">
            building on Base
          </Anchor>
          . This proof-of-concept cross-chain retirement application gives Base
          users access to the 17 million tokenized carbon credits already on
          Polygon.
        </Text>
        <Text t="body8">
          Stay tuned as we continue to deploy more advanced Base integrations
          across the entire KlimaDAO and{" "}
          <Anchor href="https://www.carbonmark.com">Carbonmark</Anchor>{" "}
          ecosystem 🌍.
        </Text>
      </div>
      <div className={styles.cardBg}>
        <div className={styles.card}>
          <div className={styles.inputsContainer}>
            <div className={styles.formGroup}>
              <label>How many tonnes of carbon would you like to retire?</label>
              <input
                min="0"
                step="1"
                maxLength={10}
                value={quantity}
                type="number"
                onChange={(e) => handleQuantityChange(e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Who will this retirement be credited to?</label>
              <input
                value={beneficiaryString}
                placeholder={"e.g. 'The Planet LLC'"}
                onChange={(e) => setBeneficiaryString(e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Retirement message</label>
              <textarea
                value={retirementMessage}
                placeholder="e.g. 'Offsetting my company's annual emissions.'"
                onChange={(e) => setRetirementMessage(e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Cost</label>
              <div className="field">
                <Image
                  width={42}
                  height={42}
                  className="icon"
                  src={tokenInfoMap.klima.icon}
                  alt={tokenInfoMap.klima.label || ""}
                />
                <Text>{formattedCost()}</Text>
              </div>
            </div>
            <div className={styles.formGroup}>
              <label>Retiring</label>
              <div className="field">
                <Image
                  width={42}
                  height={42}
                  className="icon"
                  src={tokenInfoMap.bct.icon}
                  alt={tokenInfoMap.bct.label || ""}
                />
                <Text>{formatTonnes({ amount: quantity, locale: "en" })} </Text>
              </div>
              <Text t="caption" color="lightest">
                Base Carbon Tonne (BCT)
              </Text>
            </div>
            <div className={styles.disclaimer}>
              <GppMaybeOutlinedIcon />
              <Text t="caption">
                Be careful not to expose any sensitive personal information.
                Your message can not be edited and will permanently exist on a
                public blockchain.
              </Text>
            </div>
          </div>
          {/* ensure the component isMounted to avoid hydration error when conditionally rendering buttons */}
          {isMounted() && (
            <>
              {wrongNetworkOrNotConnected ? (
                <Connect className={styles.submitButton} />
              ) : (
                <ButtonPrimary suppressHydrationWarning {...getButtonProps()} />
              )}
            </>
          )}
          {showTransactionModal && (
            <TransactionModal
              title={
                <Text t="h4" className={styles.headerTitle}>
                  Retire Carbon on Base
                </Text>
              }
              status={status}
              tokenName="klima"
              onCloseModal={closeModal}
              tokenIcon={tokenInfoMap.klima.icon}
              spenderAddress={addresses.base.interchainTokenService}
              value={getRetirementCost()}
              onSubmit={handleCrossChainRetirement}
            />
          )}
        </div>
      </div>
    </div>
  );
};
