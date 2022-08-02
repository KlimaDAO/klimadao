import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { StaticImageData } from "components/Image";
import { useSelector } from "react-redux";
import { utils, providers } from "ethers";
import { Trans, t } from "@lingui/macro";

import ParkOutlined from "@mui/icons-material/ParkOutlined";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import GppMaybeOutlined from "@mui/icons-material/GppMaybeOutlined";
import Add from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Cancel";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

import { Modal } from "components/Modal";

import { useAppDispatch } from "state";
import { AppNotificationStatus, setAppState, TxnStatus } from "state/app";
import { setAllowance, updateRetirement } from "state/user";
import {
  selectNotificationStatus,
  selectBalances,
  selectAllowancesWithParams,
  selectLocale,
} from "state/selectors";

import { useTypedSelector } from "lib/hooks/useTypedSelector";

import {
  getOffsetConsumptionCost,
  getRetiredOffsetBalances,
  getRetirementAllowances,
  retireCarbonTransaction,
} from "actions/offset";
import { changeApprovalTransaction } from "actions/utils";

import {
  Anchor as A,
  Text,
  Spinner,
  ButtonPrimary,
  TextInfoTooltip,
} from "@klimadao/lib/components";
import {
  OffsetInputToken,
  offsetInputTokens,
  offsetCompatibility,
  RetirementToken,
  retirementTokens,
  urls,
} from "@klimadao/lib/constants";

import { CarbonTonnesRetiredCard } from "components/CarbonTonnesRetiredCard";
import { CarbonTonnesBreakdownCard } from "components/CarbonTonnesBreakdownCard";
import { MiniTokenDisplay } from "components/MiniTokenDisplay";
import { DropdownWithModal } from "components/DropdownWithModal";

import BCT from "public/icons/BCT.png";
import NCT from "public/icons/NCT.png";
import MCO2 from "public/icons/MCO2.png";
import USDC from "public/icons/USDC.png";
import UBO from "public/icons/UBO.png";
import NBO from "public/icons/NBO.png";

import * as styles from "./styles";
import { cx } from "@emotion/css";
import { useOffsetParams } from "lib/hooks/useOffsetParams";
import { createLinkWithLocaleSubPath } from "lib/i18n";
import SendRounded from "@mui/icons-material/SendRounded";

interface ButtonProps {
  label: React.ReactElement | string;
  onClick: undefined | (() => void);
  disabled: boolean;
}

type TokenInfoMap = {
  [key in RetirementToken | OffsetInputToken]: {
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
  // klima: { key: "klima", icon: KLIMA, label: "KLIMA" },
  // sklima: { key: "sklima", icon: KLIMA, label: "sKLIMA" },
  // wsklima: { key: "wsklima", icon: KLIMA, label: "wsKLIMA" },
};

interface Props {
  provider?: providers.JsonRpcProvider;
  address?: string;
  isConnected: boolean;
  loadWeb3Modal: () => void;
  onRPCError: () => void;
}

export const Offset = (props: Props) => {
  const dispatch = useAppDispatch();
  const locale = useSelector(selectLocale);
  const balances = useSelector(selectBalances);
  const allowances = useTypedSelector((state) =>
    selectAllowancesWithParams(state, {
      tokens: offsetInputTokens,
      spender: "retirementAggregator",
    })
  );

  const params = useOffsetParams();
  // local state
  const [isRetireTokenModalOpen, setRetireTokenModalOpen] = useState(false);
  const [isInputTokenModalOpen, setInputTokenModalOpen] = useState(false);
  const [selectedInputToken, setSelectedInputToken] =
    useState<OffsetInputToken>("bct");
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
  const validSpecificAddresses = specificAddresses.filter((addr) =>
    utils.isAddress(addr)
  );
  const [retirementTransactionHash, setRetirementTransactionHash] =
    useState("");
  const [retirementTotals, setRetirementTotals] = useState<number | null>(null);

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
    if (props.isConnected && props.address && props.provider) {
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
  }, [props.isConnected, props.address, props.provider]);

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
      if (!props.provider) return;
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
    setRetirementTotals(null);
  };

  const handleBeneficiaryAddressChange = (address: string) => {
    setBeneficiaryAddress(address);
  };

  const handleApprove = async () => {
    try {
      if (!props.provider) return;
      const value = cost.toString();
      const token = selectedInputToken;
      const spender = "retirementAggregator";

      const approvedValue = await changeApprovalTransaction({
        value,
        provider: props.provider,
        token,
        spender,
        onStatus: setStatus,
      });
      dispatch(
        setAllowance({
          token,
          spender,
          value: approvedValue,
        })
      );
    } catch (e) {
      return;
    }
  };

  const handleRetire = async () => {
    try {
      if (!props.isConnected || !props.address || !props.provider) return;
      const { receipt, retirementTotals } = await retireCarbonTransaction({
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
      setRetirementTotals(retirementTotals);
    } catch (e) {
      return;
    }
  };

  const insufficientBalance =
    props.isConnected &&
    !isLoading &&
    Number(cost) > Number(balances?.[selectedInputToken] ?? "0");

  const hasApproval = () => {
    return (
      allowances?.[selectedInputToken] &&
      !!Number(allowances?.[selectedInputToken]) &&
      Number(cost) <= Number(allowances?.[selectedInputToken]) // Caution: Number trims values down to 17 decimal places of precision
    );
  };

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
    } else if (
      (!!beneficiaryAddress && !utils.isAddress(beneficiaryAddress)) ||
      specificAddresses.find((addr) => !!addr && !utils.isAddress(addr))
    ) {
      return {
        label: <Trans id="shared.invalid_inputs">INVALID INPUTS</Trans>,
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
    } else if (!hasApproval()) {
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
    setSelectedInputToken(tkn as OffsetInputToken);
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

  const inputTokenItems = offsetInputTokens
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
              (BCT),{" "}
              <A href="https://docs.klimadao.finance/references/glossary#nct">
                Nature Carbon Tonnes
              </A>{" "}
              (NCT),{" "}
              <A href="https://docs.c3.app/c3-pool-specifications-and-carbon-methodologies/ubo">
                Universal Basic Offsets
              </A>{" "}
              (UBO), or{" "}
              <A href="https://docs.c3.app/c3-pool-specifications-and-carbon-methodologies/nbo">
                Nature Based Offsets
              </A>{" "}
              (NBO), with more coming soon.{" "}
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
            label={<Trans id="offset.dropdown_payWith.label">Pay with</Trans>}
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
            label={
              <Trans id="offset.dropdown_retire.label">
                Select carbon offset token to retire
              </Trans>
            }
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
            addressArray={specificAddresses}
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
                data-error={
                  !!beneficiaryAddress && !utils.isAddress(beneficiaryAddress)
                }
                onChange={(e) => handleBeneficiaryAddressChange(e.target.value)}
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
          url={createLinkWithLocaleSubPath(
            `${urls.retirements}/${
              beneficiaryAddress || props.address
            }/${retirementTotals}`,
            locale
          )}
        />
      )}
    </>
  );
};

interface RetirementSuccessModalProps {
  onSuccessModalClose: () => void;
  url: string;
}

const RetirementSuccessModal = (props: RetirementSuccessModalProps) => {
  return (
    <Modal
      title={
        <Trans id="offset.successModal.title">Retirement Successful!</Trans>
      }
      onToggleModal={props.onSuccessModalClose}
    >
      <div className={styles.modalContent}>
        <div className="stack">
          <Text t="caption">
            <Trans id="offset.successModal.body1">
              Thank you. By participating in the voluntary carbon market, you
              are making conservation more profitable and climate mitigation
              more impactful
            </Trans>
          </Text>
        </div>
        <div className="stack">
          <Text t="caption">
            <Trans id="offset.successModal.body2">
              Click the button below to view your retirement. Consider sharing
              the page to support us on our journey towards a more transparent,
              accessible and rewarding carbon market!
            </Trans>
          </Text>
        </div>
        <ButtonPrimary
          variant="icon"
          href={props.url}
          target="_blank"
          label={
            <>
              <SendRounded />
              <Trans id="offset.successModal.cta">VIEW RETIREMENT</Trans>
            </>
          }
        />
      </div>
    </Modal>
  );
};

const AdvancedTextInput: FC<{
  addressArray: string[];
  onChange: (val: string[]) => void;
}> = (props: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const concatValue = props.addressArray.join("");

  /** when query params are loaded we force the toggle open */
  useEffect(() => {
    if (!isOpen && concatValue.length > 1) {
      setIsOpen(true);
    }
  }, [concatValue]);

  const handleEdit = (i: number) => (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = [
      ...props.addressArray.slice(0, i),
      e.target.value,
      ...props.addressArray.slice(i + 1),
    ];
    props.onChange(newValue);
  };

  const handleAddInput = () => {
    props.onChange([...props.addressArray, ""]);
  };

  const handleDelete = (i: number) => () => {
    const newValue = [
      ...props.addressArray.slice(0, i),
      ...props.addressArray.slice(i + 1),
    ];
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
          {props.addressArray.map((address: string, i: number) => {
            return (
              <div key={i} className={styles.advancedButtonInput}>
                <div className={"advancedButtonInput_iconAligner"}>
                  <input
                    value={address}
                    onChange={handleEdit(i)}
                    placeholder={t({
                      id: "offset.enter_address",
                      message: "Enter 0x address",
                    })}
                    data-error={!!address && !utils.isAddress(address)}
                    pattern="^0x[a-fA-F0-9]{40}$"
                  />
                  {props.addressArray.length > 1 && (
                    <button onClick={handleDelete(i)} className="deletebutton">
                      <CancelIcon />
                    </button>
                  )}
                </div>
                <button
                  onClick={handleAddInput}
                  className={cx("plusbutton", {
                    hidden: i !== props.addressArray.length - 1,
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
