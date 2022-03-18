import React, { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { providers } from "ethers";
import { Trans, t } from "@lingui/macro";
import ParkOutlined from "@mui/icons-material/ParkOutlined";
import ArrowRightAlt from "@mui/icons-material/ArrowRightAlt";

import { AppNotificationStatus, setAppState, TxnStatus } from "state/app";
import {
  selectNotificationStatus,
  selectCarbonRetired,
  selectBalances,
  selectCarbonRetiredAllowance,
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
import { useAppDispatch } from "state";
import {
  changeApprovalTransaction,
  getRetiredOffsetBalances,
  getRetirementAllowances,
  InputToken,
  inputTokens,
  RetirementToken,
  retirementTokens,
} from "actions/offset";
import { setCarbonRetiredAllowance } from "state/user";

interface ButtonProps {
  label: React.ReactElement | string;
  onClick: undefined | (() => void);
  disabled: boolean;
}

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

type CompatMap = { [token in InputToken]: RetirementToken[] };
const compatibility: CompatMap = {
  bct: ["bct", "nct"],
  nct: ["bct", "nct"],
  mco2: ["mco2"],
  usdc: ["bct", "nct", "mco2"],
  klima: ["bct", "mco2"],
  sklima: ["bct", "mco2"],
  wsklima: ["bct", "mco2"],
};

interface Props {
  provider: providers.JsonRpcProvider;
  address?: string;
  isConnected: boolean;
  loadWeb3Modal: () => void;
  onRPCError: () => void;
}

export const Offset = (props: Props) => {
  const dispatch = useAppDispatch();
  const balances = useSelector(selectBalances);
  const totalCarbonRetired = useSelector(selectCarbonRetired);
  const allowances = useSelector(selectCarbonRetiredAllowance);

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

  const isLoading = props.isConnected && (!balances?.bct || !allowances?.bct);
  console.log("rerender", allowances);

  const setStatus = (statusType: TxnStatus | null, message?: string) => {
    if (!statusType) return dispatch(setAppState({ notificationStatus: null }));
    dispatch(setAppState({ notificationStatus: { statusType, message } }));
  };

  useEffect(() => {
    if (props.isConnected && props.address) {
      dispatch(
        getRetiredOffsetBalances({
          address: props.address,
          provider: props.provider,
          onRPCError: props.onRPCError,
        })
      );
      dispatch(
        getRetirementAllowances({
          address: props.address,
          provider: props.provider,
          onRPCError: props.onRPCError,
        })
      );
    }
  }, [props.isConnected, props.address]);

  // effects
  useEffect(() => {
    // if input token changes, force a compatible retirement token
    if (!compatibility[selectedInputToken]?.includes(selectedRetirementToken)) {
      // never undefined, because universal tokens
      setSelectedRetirementToken(compatibility[selectedInputToken][0]);
    }
  }, [selectedInputToken]);

  useEffect(() => {
    if (debouncedQuantity === "" || !Number(debouncedQuantity)) {
      setCost("0");
      return;
    }
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
    awaitGetOffsetConsumptionCost();
  }, [debouncedQuantity]);

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

  const handleApprove = async () => {
    try {
      const value = await changeApprovalTransaction({
        provider: props.provider,
        token: selectedInputToken,
        onStatus: setStatus,
      });
      dispatch(setCarbonRetiredAllowance({ [selectedInputToken]: value }));
    } catch (e) {
      return;
    }
  };

  // const handleRetire = async () => {
  //   try {
  //     const value = await retireCarbonTransactions({
  //       provider: props.provider,
  //       token: selectedInputToken,
  //       onStatus: setStatus,
  //     });
  //     dispatch(setCarbonRetiredAllowance({ [selectedInputToken]: value }));
  //   } catch (e) {
  //     return;
  //   }
  // };

  const insufficientBalance =
    props.isConnected &&
    !isLoading &&
    Number(cost) > Number(balances?.[selectedInputToken] ?? "0");

  const getButtonProps = (): ButtonProps => {
    if (!props.isConnected) {
      return {
        label: <Trans id="shared.connect_wallet">Connect wallet</Trans>,
        onClick: props.loadWeb3Modal,
        disabled: false,
      };
    } else if (isLoading) {
      return {
        label: <Trans id="shared.loading">Loading...</Trans>,
        onClick: undefined,
        disabled: true,
      };
    } else if (!quantity || !Number(quantity)) {
      return {
        label: <Trans id="shared.enter_quantity">ENTER QUANTITY</Trans>,
        onClick: undefined,
        disabled: true,
      };
    } else if (insufficientBalance) {
      return {
        label: (
          <Trans id="shared.insufficient_balance">INSUFFICIENT BALANCE</Trans>
        ),
        onClick: undefined,
        disabled: true,
      };
    } else if (!Number(allowances?.[selectedInputToken])) {
      return {
        label: <Trans id="shared.approve">APPROVE</Trans>,
        onClick: handleApprove,
        disabled: false,
      };
    }
    return {
      label: <Trans id="shared.retire">RETIRE CARBON</Trans>,
      onClick: () => {
        console.log("retire");
      },
      disabled: false,
    };
  };

  const handleSelectInputToken = (tkn: string) => {
    if (tkn !== selectedInputToken) {
      setQuantity("");
      setDebouncedQuantity("");
      setCost("");
    }
    setSelectedInputToken(tkn as InputToken);
  };

  const handleSelectRetirementToken = (tkn: string) => {
    if (tkn !== selectedRetirementToken) {
      setQuantity("");
      setDebouncedQuantity("");
      setCost("");
    }
    setSelectedRetirementToken(tkn as RetirementToken);
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
    }, 500);
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
      description: (function () {
        if (isLoading) return <Trans id="shared.loading" />;
        if (!props.isConnected || !Number(balances?.[tkn])) return "0";
        return Number(balances?.[tkn]).toFixed(2);
      })(),
      disabled: !balances?.[tkn] || !Number(balances[tkn]),
    }))
    .sort((a, b) => Number(b.description ?? 0) - Number(a.description ?? 0));

  const retirementTokenItems = retirementTokens.map((tkn) => {
    const disabled = !compatibility[selectedInputToken]?.includes(tkn);
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
            onItemSelect={handleSelectInputToken}
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
            onItemSelect={handleSelectRetirementToken}
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
                max={balances?.[selectedInputToken]}
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
              amount={cost}
              icon={tokenInfo[selectedInputToken].icon}
              name={selectedInputToken}
              loading={cost === "loading"}
              warn={insufficientBalance}
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
                  BENEFICIARY ADDRESS (optional: defaults to connected address)
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
            <textarea
              value={retirementAddress}
              onChange={(e) => {
                if (e.target.value.length >= 280) {
                  return;
                }
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
