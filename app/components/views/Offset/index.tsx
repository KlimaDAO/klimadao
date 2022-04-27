import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { StaticImageData } from "components/Image";

import { useSelector } from "react-redux";
import { providers } from "ethers";
import { Trans, t } from "@lingui/macro";

import ParkOutlined from "@mui/icons-material/ParkOutlined";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import GppMaybeOutlined from "@mui/icons-material/GppMaybeOutlined";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import Add from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Cancel";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

import { useAppDispatch } from "state";
import { AppNotificationStatus, setAppState, TxnStatus } from "state/app";
import { setCarbonRetiredAllowance, updateRetirement } from "state/user";
import {
  selectNotificationStatus,
  selectBalances,
  selectCarbonRetiredAllowance,
} from "state/selectors";
import {
  changeApprovalTransaction,
  getOffsetConsumptionCost,
  getRetiredOffsetBalances,
  getRetirementAllowances,
  retireCarbonTransaction,
} from "actions/offset";

import {
  Anchor as A,
  Text,
  Spinner,
  ButtonPrimary,
  TextInfoTooltip,
} from "@klimadao/lib/components";
import {
  InputToken,
  inputTokens,
  offsetCompatibility,
  RetirementToken,
  retirementTokens,
} from "@klimadao/lib/constants";

import { CarbonTonnesRetiredCard } from "components/CarbonTonnesRetiredCard";
import { CarbonTonnesBreakdownCard } from "components/CarbonTonnesBreakdownCard";
import { MiniTokenDisplay } from "components/MiniTokenDisplay";
import { DropdownWithModal } from "components/DropdownWithModal";

import BCT from "public/icons/BCT.png";
import NCT from "public/icons/NCT.png";
import MCO2 from "public/icons/MCO2.png";
import KLIMA from "public/icons/KLIMA.png";
import USDC from "public/icons/USDC.png";
import UBO from "public/icons/UBO.png";
import NBO from "public/icons/NBO.png";

import * as styles from "./styles";
import { cx } from "@emotion/css";
import { useOffsetParams } from "lib/hooks/useOffsetParams";

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
  ubo: { key: "ubo", icon: UBO, label: "UBO" },
  nbo: { key: "nbo", icon: NBO, label: "NBO" },
  bct: { key: "bct", icon: BCT, label: "BCT" },
  nct: { key: "nct", icon: NCT, label: "NCT" },
  mco2: { key: "mco2", icon: MCO2, label: "MCO2" },
  usdc: { key: "usdc", icon: USDC, label: "USDC" },
  klima: { key: "klima", icon: KLIMA, label: "KLIMA" },
  sklima: { key: "sklima", icon: KLIMA, label: "sKLIMA" },
  wsklima: { key: "wsklima", icon: KLIMA, label: "wsKLIMA" },
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
  const allowances = useSelector(selectCarbonRetiredAllowance);
  const params = useOffsetParams();
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
  const [retirementMessage, setRetirementMessage] = useState("");
  // for selective retirement
  const [specificAddresses, setSpecificAddresses] = useState([""]);
  const validSpecificAddresses = specificAddresses.filter(
    (str) => str.length === 42 && str.startsWith("0x")
  );
  const [retirementTransactionHash, setRetirementTransactionHash] =
    useState("");

  const isLoading = props.isConnected && (!balances?.bct || !allowances?.bct);
  const setStatus = (statusType: TxnStatus | null, message?: string) => {
    if (!statusType) return dispatch(setAppState({ notificationStatus: null }));
    dispatch(setAppState({ notificationStatus: { statusType, message } }));
  };

  /** Initialize input from params after they are extracted, validated & stripped */
  useEffect(() => {
    if (params.inputToken) {
      setSelectedInputToken(params.inputToken);
    }
    if (params.retirementToken) {
      setSelectedRetirementToken(params.retirementToken);
    }
    if (params.message) {
      setRetirementMessage(params.message);
    }
    if (params.beneficiary) {
      setBeneficiary(params.beneficiary);
    }
    if (params.beneficiaryAddress) {
      setBeneficiaryAddress(params.beneficiaryAddress);
    }
    if (params.projectTokens) {
      setSpecificAddresses(params.projectTokens);
    }
    if (params.quantity) {
      setQuantity(params.quantity);
      setDebouncedQuantity(params.quantity);
    }
  }, [params]);

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
    if (
      !offsetCompatibility[selectedInputToken]?.includes(
        selectedRetirementToken
      )
    ) {
      // never undefined, because universal tokens
      setSelectedRetirementToken(offsetCompatibility[selectedInputToken][0]);
    }
  }, [selectedInputToken]);

  useEffect(() => {
    if (debouncedQuantity === "" || !Number(debouncedQuantity)) {
      setCost("0");
      return;
    }
    const awaitGetOffsetConsumptionCost = async () => {
      setCost("loading");
      const [consumptionCost] = await getOffsetConsumptionCost({
        inputToken: selectedInputToken,
        retirementToken: selectedRetirementToken,
        quantity: debouncedQuantity,
        amountInCarbon: true,
        provider: props.provider,
        getSpecific: !!validSpecificAddresses.length,
      });
      setCost(consumptionCost);
    };
    awaitGetOffsetConsumptionCost();
  }, [
    debouncedQuantity,
    validSpecificAddresses.length,
    selectedInputToken,
    selectedRetirementToken,
  ]);

  const handleOnSuccessModalClose = () => {
    setQuantity("0");
    setDebouncedQuantity("0");
    setCost("0");
    setBeneficiary("");
    setBeneficiaryAddress("");
    setRetirementMessage("");
    setRetirementTransactionHash("");
  };

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

  const handleRetire = async () => {
    try {
      if (!props.isConnected || !props.address) return;
      const receipt = await retireCarbonTransaction({
        address: props.address,
        provider: props.provider,
        inputToken: selectedInputToken,
        retirementToken: selectedRetirementToken,
        quantity,
        amountInCarbon: true,
        beneficiaryAddress,
        beneficiaryName: beneficiary,
        retirementMessage,
        onStatus: setStatus,
        specificAddresses: validSpecificAddresses,
      });
      dispatch(
        updateRetirement({
          inputToken: selectedInputToken,
          retirementToken: selectedRetirementToken,
          cost,
          quantity,
        })
      );
      setStatus(null);
      // this opens RetirementSuccessModal
      setRetirementTransactionHash(receipt.transactionHash);
    } catch (e) {
      return;
    }
  };

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
        handleRetire();
      },
      disabled: false,
    };
  };

  const handleSelectInputToken = (tkn: string) => {
    setSelectedInputToken(tkn as InputToken);
  };

  const handleSelectRetirementToken = (tkn: string) => {
    setSelectedRetirementToken(tkn as RetirementToken);
  };

  const handleChangeQuantity = (e: ChangeEvent<HTMLInputElement>) => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    if (Number(e.target.value) > 0 && Number(e.target.value) < 0.0001) {
      setQuantity("0.0001");
    } else {
      setQuantity(e.target.value);
    }
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
    const disabled = !offsetCompatibility[selectedInputToken]?.includes(tkn);
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
      <div className={styles.columnRight}>
        <CarbonTonnesRetiredCard />
        <CarbonTonnesBreakdownCard />
      </div>

      <div className={styles.offsetCard}>
        <div className={styles.offsetCard_header}>
          <Text t="h4" className={styles.offsetCard_header_title}>
            <ParkOutlined />
            <Trans id="offset.retire_carbon">Retire Carbon</Trans>
          </Text>
          <Text t="caption" color="lightest">
            <Trans id="offset.go_carbon_neutral">
              Go carbon neutral by retiring carbon and claiming the underlying
              environmental benefit of the carbon offset. Choose to retire{" "}
              <A href="https://docs.klimadao.finance/references/glossary#mco2">
                Moss Carbon Credits
              </A>{" "}
              (MCO2),{" "}
              <A href="https://docs.klimadao.finance/references/glossary#bct">
                Base Carbon Tonnes
              </A>{" "}
              (BCT), or{" "}
              <A href="https://docs.klimadao.finance/references/glossary#nct">
                Nature Carbon Tonnes
              </A>{" "}
              (NCT), with more coming soon.
            </Trans>
          </Text>
        </div>

        <div className={styles.offsetCard_ui}>
          <div className={styles.input}>
            <label>
              <Text t="caption" color="lighter">
                <Trans id="offset.amount_in_tonnes">
                  How many tonnes of carbon would you like to offset?
                </Trans>
              </Text>
            </label>
            <div className="number_input_container">
              <input
                type="number"
                min="0"
                value={quantity}
                onKeyDown={(e) => {
                  // dont let user enter these special characters into the number input
                  if (["e", "E", "+", "-"].includes(e.key)) {
                    e.preventDefault();
                  }
                }}
                onChange={handleChangeQuantity}
                placeholder={t({
                  id: "offset.offset_quantity",
                  message: "Enter quantity to offset",
                })}
              />
            </div>
          </div>
          {/* Input Token */}
          <DropdownWithModal
            label={t({
              id: "offset.dropdown_payWith.label",
              message: "Pay with",
            })}
            modalTitle={t({
              id: "offset.modal_payWith.title",
              message: "Select Token",
            })}
            currentItem={selectedInputToken}
            items={inputTokenItems}
            isModalOpen={isInputTokenModalOpen}
            onToggleModal={() => setInputTokenModalOpen((s) => !s)}
            onItemSelect={handleSelectInputToken}
          />

          {/* Retire Token  */}
          <DropdownWithModal
            label={t({
              id: "offset.dropdown_retire.label",
              message: "Select carbon offset token to retire",
            })}
            modalTitle={t({
              id: "offset.modal_retire.title",
              message: "Select Carbon Type",
            })}
            currentItem={selectedRetirementToken}
            items={retirementTokenItems}
            isModalOpen={isRetireTokenModalOpen}
            onToggleModal={() => setRetireTokenModalOpen((s) => !s)}
            onItemSelect={handleSelectRetirementToken}
          />
          <AdvancedTextInput
            value={specificAddresses}
            onChange={setSpecificAddresses}
          />

          <div className={styles.beneficiary}>
            <Text t="caption" color="lighter">
              <Trans id="offset.retirement_credit">
                Who will this retirement be credited to?
              </Trans>
            </Text>
            <div className={styles.input}>
              <input
                value={beneficiary}
                onChange={(e) => setBeneficiary(e.target.value)}
                placeholder={t({
                  id: "offset.retirement_beneficiary",
                  message: "Name or organisation",
                })}
              />
            </div>

            <div className={styles.input}>
              <input
                value={beneficiaryAddress}
                onChange={(e) => setBeneficiaryAddress(e.target.value)}
                placeholder={t({
                  id: "offset.enter_address",
                  message: "Enter 0x address",
                })}
              />
              <Text t="caption" color="lightest" className="defaultAddress">
                <Trans id="offset.default_retirement_address">
                  Defaults to the connected wallet address
                </Trans>
              </Text>
            </div>
          </div>
          <div className={styles.input}>
            <label>
              <Text t="caption" color="lighter">
                <Trans id="offset.retirement_message">Retirement message</Trans>
              </Text>
            </label>
            <textarea
              value={retirementMessage}
              onChange={(e) => {
                if (e.target.value.length >= 280) return;
                setRetirementMessage(e.target.value);
              }}
              placeholder={t({
                id: "offset.retirement_purpose",
                message: "Describe the purpose of this retirement",
              })}
            />
          </div>
          <MiniTokenDisplay
            label={
              <div className="mini_token_label">
                <Text t="caption" color="lighter">
                  <Trans id="offset_cost">Cost</Trans>
                </Text>
                <TextInfoTooltip
                  content={
                    <Trans id="offset.aggregation_fee_tooltip">
                      This cost includes slippage and the aggregation fee of 1%.
                    </Trans>
                  }
                >
                  <InfoOutlined />
                </TextInfoTooltip>
              </div>
            }
            amount={cost}
            icon={tokenInfo[selectedInputToken].icon}
            name={selectedInputToken}
            loading={cost === "loading"}
            warn={insufficientBalance}
          />
          <MiniTokenDisplay
            label={
              <Text t="caption" color="lighter">
                <Trans id="offset.retiring">Retiring</Trans>
              </Text>
            }
            amount={quantity}
            icon={tokenInfo[selectedRetirementToken].icon}
            name={selectedRetirementToken}
            labelAlignment="start"
          />
          <div className="disclaimer">
            <GppMaybeOutlined />
            <Text t="caption">
              <Trans id="offset_disclaimer">
                Be careful not to expose any sensitive personal information.
                Your message can not be edited and will permanently exist on a
                public blockchain.
              </Trans>
            </Text>
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

      {retirementTransactionHash && (
        <RetirementSuccessModal
          onSuccessModalClose={handleOnSuccessModalClose}
          beneficiaryName={beneficiary}
          beneficiaryAddress={beneficiaryAddress || props.address || ""}
          message={retirementMessage}
          quantityCarbonRetired={quantity}
          retirementTransactionHash={retirementTransactionHash}
        />
      )}
    </>
  );
};

interface RetirementSuccessModalProps {
  onSuccessModalClose: () => void;
  beneficiaryName: string;
  beneficiaryAddress: string;
  message: string;
  quantityCarbonRetired: string;
  retirementTransactionHash: string;
}

const RetirementSuccessModal = (props: RetirementSuccessModalProps) => {
  return (
    <div className={styles.retirementSuccessModal}>
      <div className="card">
        <button onClick={props.onSuccessModalClose} className="close-icon">
          <CloseIcon />
        </button>
        <div className="content">
          <div className="success">
            <Text>
              <Trans>Retirement Successful</Trans>
            </Text>
            <CheckIcon />
          </div>
          <div className="stack">
            <Text t="badge">
              <Trans>Name</Trans>
            </Text>
            <Text t="caption">{props.beneficiaryName}</Text>
          </div>
          <div className="stack">
            <Text t="badge">
              <Trans>Beneficiary Address</Trans>
            </Text>
            <Text t="caption" className="address">
              {props.beneficiaryAddress}
            </Text>
          </div>
          <div className="stack">
            <Text t="badge">
              <Trans>Message</Trans>
            </Text>
            <Text t="caption">{props.message}</Text>
          </div>
          <div className="stack">
            <Text t="badge">
              <Trans>Tonnes Retired</Trans>
            </Text>
            <Text t="caption">{props.quantityCarbonRetired}</Text>
          </div>
          <div className="stack">
            <Text t="badge">
              <Trans>Download certificate</Trans>
            </Text>
            <Text t="caption">
              <Trans>[coming soon]</Trans>
            </Text>
          </div>
          <div className="stack">
            <Text t="badge">
              <Trans>Share retirement</Trans>
            </Text>
            <Text t="caption">
              <Trans>[coming soon]</Trans>
            </Text>
          </div>
          <Text t="caption">
            <Trans>
              View on{" "}
              <A
                href={`https://polygonscan.com/tx/${props.retirementTransactionHash}`}
              >
                polygonscan.com
              </A>
            </Trans>
          </Text>
        </div>
      </div>
    </div>
  );
};

const AdvancedTextInput: FC<{
  value: string[];
  onChange: (val: string[]) => void;
}> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const concatValue = props.value.join("");

  /** when query params are loaded we force the toggle open */
  useEffect(() => {
    if (!isOpen && concatValue.length > 1) {
      setIsOpen(true);
    }
  }, [concatValue]);

  const handleEdit = (i: number) => (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = [
      ...props.value.slice(0, i),
      e.target.value,
      ...props.value.slice(i + 1),
    ];
    props.onChange(newValue);
  };

  const handleAddInput = () => {
    props.onChange([...props.value, ""]);
  };

  const handleDelete = (i: number) => () => {
    const newValue = [...props.value.slice(0, i), ...props.value.slice(i + 1)];
    props.onChange(newValue);
  };

  return (
    <>
      <button
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
        className={styles.advancedButton}
      >
        {isOpen ? <KeyboardArrowDown /> : <KeyboardArrowRight />}
        <Text t="caption" className="advancedButton_label" uppercase>
          <Trans id="advanced">ADVANCED</Trans>
        </Text>
      </button>
      {isOpen && (
        <div className={styles.input}>
          <label>
            <Text t="caption" color="lighter">
              <Trans id="offset.retire_specific">
                Retire specific project tokens
              </Trans>
            </Text>
            <TextInfoTooltip
              content={
                <Trans id="offset.retire_specific_tooltip">
                  Subject to additional fee, determined by the selected pool and
                  paid to the bridge provider.
                </Trans>
              }
            >
              <InfoOutlined />
            </TextInfoTooltip>
          </label>
          {props.value.map((address, i) => {
            return (
              <div key={i} className={styles.advancedButtonInput}>
                <div className="advancedButtonInput_iconAligner">
                  <input
                    value={address}
                    onChange={handleEdit(i)}
                    placeholder={t({
                      id: "offset.enter_address",
                      message: "Enter 0x address",
                    })}
                    pattern="^0x[a-fA-F0-9]{40}$"
                  />
                  {props.value.length > 1 && (
                    <button onClick={handleDelete(i)} className="deletebutton">
                      <CancelIcon />
                    </button>
                  )}
                </div>
                <button
                  onClick={handleAddInput}
                  className={cx("plusbutton", {
                    hidden: i !== props.value.length - 1,
                  })}
                >
                  <Add />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};
