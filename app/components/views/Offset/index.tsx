import React, { useEffect, useState } from "react";
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

export const Offset = (props: Props) => {
  const balances = useSelector(selectBalances);
  const totalCarbonRetired = useSelector(selectCarbonRetired);

  // local state
  const [isRetireTokenModalOpen, setRetireTokenModalOpen] = useState(false);
  const [isInputTokenModalOpen, setInputTokenModalOpen] = useState(false);
  const [currentInputToken, setCurrentInputToken] = useState({
    name: "BCT",
    icon: BCT,
    balance: balances?.bct,
    disabled: false,
    address: addresses["mainnet"].bct,
  });

  const [currentTokenToRetire, setCurrentTokenToRetire] = useState({
    name: "BCT",
    icon: BCT,
    address: addresses["mainnet"].bct,
    disabled:
      currentInputToken.name === "NCT" || currentInputToken.name === "MCO2",
  });
  const inputTokens = [
    {
      name: "BCT",
      icon: BCT,
      balance: balances?.bct,
      disabled: false,
      address: addresses["mainnet"].bct,
    },
    {
      name: "NCT",
      icon: NCT,
      balance: balances?.nct,
      disabled: false,
      address: addresses["mainnet"].nct,
    },
    {
      name: "MCO2",
      icon: MCO2,
      balance: balances?.mco2,
      disabled: false,
      address: addresses["mainnet"].mco2,
    },
    {
      name: "USDC",
      icon: USDC,
      balance: balances?.usdc,
      disabled: false,
      address: addresses["mainnet"].usdc,
    },
    {
      name: "KLIMA",
      icon: KLIMA,
      balance: balances?.klima,
      disabled: false,
      address: addresses["mainnet"].klima,
    },
    {
      name: "sKLIMA",
      icon: KLIMA,
      balance: balances?.sklima,
      disabled: false,
      address: addresses["mainnet"].sklima,
    },
    {
      name: "wsKLIMA",
      icon: KLIMA,
      balance: balances?.wsklima,
      address: addresses["mainnet"].wsklima,
      disabled: false,
    },
  ];
  const retireTokens = [
    {
      name: "BCT",
      icon: BCT,
      address: addresses["mainnet"].bct,
      disabled: currentInputToken.name === "MCO2",
    },
    {
      name: "NCT",
      icon: NCT,
      address: addresses["mainnet"].nct,
      disabled: currentInputToken.name === "MCO2",
    },
    {
      name: "MCO2",
      icon: MCO2,
      address: addresses["mainnet"].mco2,
      disabled:
        currentInputToken.name === "NCT" || currentInputToken.name === "BCT",
    },
  ];

  // form state
  const [numCarbonTonnesToRetire, setNumCarbonTonnesToRetire] = useState("");
  const [costCarbonTonnesToRetire, setCostCarbonTonnesToRetire] = useState("");
  const [beneficiary, setBeneficiary] = useState("");
  const [beneficiaryAddress, setBeneficiaryAddress] = useState("");
  const [retirementAddress, setRetirementAddress] = useState("");

  // effects
  useEffect(() => {
    if (
      currentInputToken.name === "BCT" ||
      currentInputToken.name === "MCO2" ||
      currentInputToken.name === "NCT"
    ) {
      setCurrentTokenToRetire(currentInputToken);
    }
  }, [currentInputToken]);
  useEffect(() => {
    const awaitGetOffsetConsumptionCost = async () => {
      const [cost] = await getOffsetConsumptionCost({
        inputTokenAddress: currentInputToken.address,
        poolTokenAddress: currentTokenToRetire.address,
        curInputTokenAmount: numCarbonTonnesToRetire,
        currentCoin: currentInputToken.name,
        amountInCarbon: true,
      });
      setCostCarbonTonnesToRetire(cost);
    };
    if (numCarbonTonnesToRetire === "") {
      return;
    }
    if (
      (currentInputToken.name === "BCT" &&
        currentTokenToRetire.name !== "BCT") ||
      (currentInputToken.name === "MCO2" &&
        currentTokenToRetire.name !== "MCO2") ||
      (currentInputToken.name === "NCT" && currentTokenToRetire.name !== "NCT")
    ) {
      return;
    }
    if (numCarbonTonnesToRetire === "0") {
      setCostCarbonTonnesToRetire("0");
    }
    awaitGetOffsetConsumptionCost();
  }, [numCarbonTonnesToRetire, currentInputToken, currentTokenToRetire]);

  // methods
  const handleClickMax = async () => {
    if (!currentInputToken.balance) {
      setNumCarbonTonnesToRetire("0");
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_unused, tonnesToRetire] = await getOffsetConsumptionCost({
        inputTokenAddress: currentInputToken.address,
        poolTokenAddress: currentTokenToRetire.address,
        curInputTokenAmount: currentInputToken.balance,
        currentCoin: currentTokenToRetire.name,
        amountInCarbon: currentInputToken.name === currentTokenToRetire.name,
      });
      console.log(tonnesToRetire);
      setNumCarbonTonnesToRetire(tonnesToRetire);
    }
  };
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
          console.log(
            "currentTokenToRetire:",
            currentTokenToRetire,
            "currentInputToken:",
            currentInputToken,
            "costCarbonTonnesToRetire",
            costCarbonTonnesToRetire,
            "numCarbonTonnesToRetire:",
            numCarbonTonnesToRetire,
            "beneficiary:",
            beneficiary,
            "beneficiaryAddress:",
            beneficiaryAddress,
            "retirementAddress:",
            retirementAddress
          );
        },
        disabled: false,
      };
    }
  };

  const fullStatus: AppNotificationStatus | null = useSelector(
    selectNotificationStatus
  );
  const status = fullStatus?.statusType;

  const showSpinner =
    props.isConnected &&
    (status === "userConfirmation" || status === "networkConfirmation");

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
              Retire carbon and claim the underlying enviromental benefit of the
              carbon offset.
            </Trans>
          </Text>
        </div>
        <div className={styles.offsetCard_ui}>
          {/* Input Token */}
          <DropdownWithModal
            label="Pay with"
            modalTitle="Select Token"
            currentItem={currentInputToken}
            items={inputTokens}
            isModalOpen={isInputTokenModalOpen}
            onToggleModal={() => {
              setInputTokenModalOpen((s) => !s);
            }}
            onItemSelect={(tokenName) => {
              setCurrentInputToken(
                inputTokens.find((token) => tokenName === token.name) ||
                  inputTokens[0]
              );
            }}
          />
          {/* Retire Token  */}
          <DropdownWithModal
            label="Select carbon offset token to retire"
            modalTitle="Select Carbon Type"
            currentItem={currentTokenToRetire}
            items={retireTokens}
            isModalOpen={isRetireTokenModalOpen}
            onToggleModal={() => {
              setRetireTokenModalOpen((s) => !s);
            }}
            onItemSelect={(tokenName) => {
              setCurrentTokenToRetire(
                retireTokens.find((token) => tokenName === token.name) ||
                  retireTokens[0]
              );
            }}
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
                value={numCarbonTonnesToRetire}
                onKeyDown={(e) => {
                  // dont let user enter these special characters into the number input
                  if (["e", "E", "+", "-"].includes(e.key)) {
                    e.preventDefault();
                  }
                }}
                onChange={(e) => {
                  setNumCarbonTonnesToRetire(e.target.value);
                }}
                placeholder={t({
                  id: "offset.how_many_retire",
                  message: "How many carbon tonnes would you like to retire?",
                })}
              />
              <button
                className="button_max"
                type="button"
                onClick={handleClickMax}
              >
                <Trans id="shared.max">Max</Trans>
              </button>
            </div>
          </div>
          <div className="mini_token_display_row">
            <MiniTokenDisplay
              label="cost"
              amount={costCarbonTonnesToRetire}
              icon={currentInputToken.icon}
              name={currentInputToken.name}
            />
            <ArrowRightAlt
              style={{
                marginTop: 24,
                width: 48,
                height: 48,
                color: "white",
              }}
            />
            <MiniTokenDisplay
              label="retiring"
              amount={numCarbonTonnesToRetire}
              icon={currentTokenToRetire.icon}
              name={currentTokenToRetire.name}
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
                  BENEFICIARY ADDRESS (optional; defaults to connnected address)
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
