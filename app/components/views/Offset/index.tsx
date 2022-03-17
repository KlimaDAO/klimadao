import React, { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { providers } from "ethers";
import { Trans, t } from "@lingui/macro";
import ParkOutlined from "@mui/icons-material/ParkOutlined";
import ArrowRightAlt from "@mui/icons-material/ArrowRightAlt";

import { AppNotificationStatus } from "state/app";
import {
  selectNotificationStatus,
  selectCarbonRetired,
  selectBalances,
} from "state/selectors";

import { getOffsetConsumptionCost } from "@klimadao/lib/utils";
import { addresses } from "@klimadao/lib/constants";
import { Text, Spinner, ButtonPrimary } from "@klimadao/lib/components";

import { CarbonTonnesRetiredCard } from "components/CarbonTonnesRetiredCard";
import { CarbonTonnesBreakdownCard } from "components/CarbonTonnesBreakdownCard";
import { MiniTokenDisplay } from "components/MiniTokenDisplay";
import { DropdownWithModal } from "components/DropdownWithModal";

import BCT from "public/icons/BCT.png";
import NCT from "public/icons/NCT.png";
import MCO2 from "public/icons/MCO2.png";
import KLIMA from "public/icons/KLIMA.png";
import USDC from "public/icons/USDC.png";

import * as styles from "./styles";

interface ButtonProps {
  label: React.ReactElement | string;
  onClick: undefined | (() => void);
  disabled: boolean;
}

interface Props {
  provider: providers.JsonRpcProvider;
  address?: string;
  isConnected: boolean;
  loadWeb3Modal: () => void;
}

const inputTokens = [
  "bct",
  "nct",
  "mco2",
  "usdc",
  "klima",
  "sklima",
  "wsklima",
] as const;
type InputToken = typeof inputTokens[number];

const retirementTokens = ["bct", "nct", "mco2"] as const;
type RetirementToken = typeof retirementTokens[number];

type TokenInfoMap = {
  [key in RetirementToken | InputToken]: {
    key: string;
    icon: StaticImageData;
    label: string;
  };
};
const tokenInfo: TokenInfoMap = {
  bct: { key: "bct", icon: BCT, label: "BCT" },
  nct: { key: "nct", icon: NCT, label: "NCT" },
  mco2: { key: "mco2", icon: MCO2, label: "MCO2" },
  usdc: { key: "usdc", icon: USDC, label: "USDC" },
  klima: { key: "klima", icon: KLIMA, label: "KLIMA" },
  sklima: { key: "sklima", icon: KLIMA, label: "sKLIMA" },
  wsklima: { key: "wsklima", icon: KLIMA, label: "wsKLIMA" },
};

type CompatMap = { [token in InputToken]?: RetirementToken[] };
const compatability: CompatMap = {
  bct: ["bct", "nct"],
  nct: ["bct", "nct"],
  mco2: ["mco2"],
  usdc: ["bct", "nct", "mco2"],
  klima: ["bct", "nct"],
  sklima: ["bct", "nct"],
  wsklima: ["bct", "nct"],
};

export const Offset = (props: Props) => {
  const balances = useSelector(selectBalances);
  const totalCarbonRetired = useSelector(selectCarbonRetired);

  // local state
  const [isRetireTokenModalOpen, setRetireTokenModalOpen] = useState(false);
  const [isInputTokenModalOpen, setInputTokenModalOpen] = useState(false);
  const [selectedInputToken, setSelectedInputToken] =
    useState<InputToken>("bct");
  const [selectedRetirementToken, setSelectedRetirementToken] =
    useState<RetirementToken>("bct");

  // form state
  const [quantity, setQuantity] = useState("");
  const [debouncedQuantity, setDebouncedQuantity] = useState("");
  const debounceTimerRef = React.useRef<NodeJS.Timeout | undefined>();
  const [cost, setCost] = useState("");
  const [beneficiary, setBeneficiary] = useState("");
  const [beneficiaryAddress, setBeneficiaryAddress] = useState("");
  const [retirementAddress, setRetirementAddress] = useState("");

  // effects
  useEffect(() => {
    if (
      selectedInputToken === "bct" ||
      selectedInputToken === "mco2" ||
      selectedInputToken === "nct"
    ) {
      setSelectedRetirementToken(selectedInputToken);
    }
  }, [selectedInputToken]);

  useEffect(() => {
    const awaitGetOffsetConsumptionCost = async () => {
      const [consumptionCost] = await getOffsetConsumptionCost({
        inputTokenAddress: addresses["mainnet"][selectedInputToken],
        poolTokenAddress: addresses["mainnet"][selectedRetirementToken],
        curInputTokenAmount: debouncedQuantity,
        currentCoin: selectedInputToken,
        amountInCarbon: true,
      });
      setCost(consumptionCost);
    };
    if (debouncedQuantity === "") {
      setCost("0");
      return;
    }
    if (
      (selectedInputToken === "bct" && selectedRetirementToken !== "bct") ||
      (selectedInputToken === "mco2" && selectedRetirementToken !== "mco2") ||
      (selectedInputToken === "nct" && selectedRetirementToken !== "nct")
    ) {
      return;
    }
    if (debouncedQuantity === "0") {
      setCost("0");
    }
    awaitGetOffsetConsumptionCost();
  }, [debouncedQuantity, selectedInputToken, selectedRetirementToken]);

  // methods
  // const handleClickMax = async () => {
  //   if (!balances?.[selectedInputToken]) {
  //     setQuantity("0");
  //   } else if (selectedInputToken === selectedRetirementToken) {
  //     // TODO: consider fee
  //     setQuantity(balances?.[selectedInputToken]);
  //   } else {
  //     const [_cost, tonnesToRetire] = await getOffsetConsumptionCost({
  //       inputTokenAddress: addresses["mainnet"][selectedInputToken],
  //       poolTokenAddress: addresses["mainnet"][selectedRetirementToken],
  //       curInputTokenAmount: balances?.[selectedInputToken],
  //       currentCoin: selectedRetirementToken,
  //       amountInCarbon: selectedInputToken === selectedRetirementToken,
  //     });
  //     console.log(tonnesToRetire);
  //     setQuantity(tonnesToRetire);
  //   }
  // };

  const getButtonProps = (): ButtonProps => {
    if (!props.isConnected) {
      return {
        label: <Trans id="shared.connect_wallet">Connect wallet</Trans>,
        onClick: props.loadWeb3Modal,
        disabled: false,
      };
    } else {
      return {
        label: <Trans id="shared.approve">Approve</Trans>,
        onClick: () => {
          console.log("appr");
        },
        disabled: false,
      };
    }
  };

  const handleChangeQuantity = (e: ChangeEvent<HTMLInputElement>) => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    setQuantity(e.target.value);
    if (e.target.value === "") {
      setDebouncedQuantity("");
      setCost("");
      return;
    }
    setCost("loading");
    const timerId = setTimeout(() => {
      setDebouncedQuantity(e.target.value);
      debounceTimerRef.current = undefined;
    }, 1000);
    debounceTimerRef.current = timerId;
  };

  const fullStatus: AppNotificationStatus | null = useSelector(
    selectNotificationStatus
  );
  const status = fullStatus?.statusType;

  const showSpinner =
    props.isConnected &&
    (status === "userConfirmation" || status === "networkConfirmation");

  const inputTokenItems = inputTokens
    .map((tkn) => ({
      ...tokenInfo[tkn],
      description:
        Number(balances?.[tkn]) > 0 ? Number(balances?.[tkn]).toFixed(2) : "0",
      disabled: !balances?.[tkn] || !Number(balances[tkn]),
    }))
    .sort((a, b) => Number(b.description ?? 0) - Number(a.description ?? 0));

  const retirementTokenItems = retirementTokens.map((tkn) => {
    const disabled = !compatability[selectedInputToken]?.includes(tkn);
    return {
      ...tokenInfo[tkn],
      disabled,
      description: disabled ? (
        <Trans id="offset.incompatible">INPUT TOKEN INCOMPATIBLE</Trans>
      ) : (
        ""
      ),
    };
  });

  return (
    <>
      <div className={styles.offsetCard}>
        <div className={styles.offsetCard_header}>
          <Text t="h4" className={styles.offsetCard_header_title}>
            <ParkOutlined />
            <Trans id="offset.retire_carbon">Retire Carbon</Trans>
          </Text>
          <Text t="caption" color="lightest">
            <Trans id="offset.retire_carbon_description">
              Retire carbon and claim the underlying environmental benefit of
              the carbon offset.
            </Trans>
          </Text>
        </div>
        <div className={styles.offsetCard_ui}>
          {/* Input Token */}
          <DropdownWithModal
            label="Pay with"
            modalTitle="Select Token"
            currentItem={selectedInputToken}
            items={inputTokenItems}
            isModalOpen={isInputTokenModalOpen}
            onToggleModal={() => {
              setInputTokenModalOpen((s) => !s);
            }}
            onItemSelect={(tkn) => setSelectedInputToken(tkn as InputToken)}
          />
          {/* Retire Token  */}
          <DropdownWithModal
            label="Select carbon offset token to retire"
            modalTitle="Select Carbon Type"
            currentItem={selectedRetirementToken}
            items={retirementTokenItems}
            isModalOpen={isRetireTokenModalOpen}
            onToggleModal={() => {
              setRetireTokenModalOpen((s) => !s);
            }}
            onItemSelect={(tkn) =>
              setSelectedRetirementToken(tkn as RetirementToken)
            }
          />
          <div className={styles.input}>
            <label>
              <Text t="caption" color="lightest">
                <Trans id="offset.amount_in_tonnes">
                  AMOUNT IN CARBON TONNES
                </Trans>
              </Text>
            </label>
            <div className="number_input_container">
              <input
                type="number"
                min={0}
                value={quantity}
                onKeyDown={(e) => {
                  // dont let user enter these special characters into the number input
                  if (["e", "E", "+", "-"].includes(e.key)) {
                    e.preventDefault();
                  }
                }}
                onChange={handleChangeQuantity}
                placeholder={t({
                  id: "offset.how_many_retire",
                  message: "How many carbon tonnes would you like to retire?",
                })}
              />
              {/* <button
                className="button_max"
                type="button"
                onClick={handleClickMax}
              >
                <Trans id="shared.max">Max</Trans>
              </button> */}
            </div>
          </div>
          <div className="mini_token_display_row">
            <MiniTokenDisplay
              label="cost"
              amount={cost === "loading" ? <Spinner /> : cost}
              icon={tokenInfo[selectedInputToken].icon}
              name={selectedInputToken}
            />
            <ArrowRightAlt className="mini_token_display_icon" />
            <MiniTokenDisplay
              label="retiring"
              amount={quantity}
              icon={tokenInfo[selectedRetirementToken].icon}
              name={selectedRetirementToken}
              labelAlignment="end"
            />
          </div>
          <div className={styles.input}>
            <label>
              <Text t="caption" color="lightest">
                <Trans id="offset.beneficiary">BENEFICIARY</Trans>
              </Text>
            </label>
            <input
              value={beneficiary}
              onChange={(e) => {
                setBeneficiary(e.target.value);
              }}
              placeholder={t({
                id: "offset.who_beneficiary",
                message: "To whom will this retirement be credited?",
              })}
            />
          </div>
          <div className={styles.input}>
            <label>
              <Text t="caption" color="lightest">
                <Trans id="offset.beneficiary_address">
                  BENEFICIARY ADDRESS (optional; defaults to connected address)
                </Trans>
              </Text>
            </label>
            <input
              value={beneficiaryAddress}
              onChange={(e) => {
                setBeneficiaryAddress(e.target.value);
              }}
              placeholder={t({
                id: "offset.which_address_retiring",
                message: "Which address are you retiring on behalf of?",
              })}
            />
          </div>
          <div className={styles.input}>
            <label>
              <Text t="caption" color="lightest">
                <Trans id="offset.retirement_message">RETIREMENT MESSAGE</Trans>
              </Text>
            </label>
            <input
              value={retirementAddress}
              onChange={(e) => {
                setRetirementAddress(e.target.value);
              }}
              placeholder={t({
                id: "offset.describe_the_purpose_of_retirement",
                message: "Describe the purpose of this retirement",
              })}
            />
          </div>
          <div className={styles.buttonRow}>
            {showSpinner ? (
              <div className={styles.buttonRow_spinner}>
                <Spinner />
              </div>
            ) : (
              <ButtonPrimary
                {...getButtonProps()}
                className={styles.submitButton}
              />
            )}
          </div>
        </div>
      </div>
      <CarbonTonnesRetiredCard totalCarbonRetired={totalCarbonRetired} />
      <CarbonTonnesBreakdownCard totalCarbonRetired={totalCarbonRetired} />
    </>
  );
};
