import React, { useState } from "react";
import { useSelector } from "react-redux";
import { providers } from "ethers";
import { Trans, t } from "@lingui/macro";
import ParkOutlined from "@mui/icons-material/ParkOutlined";
import ArrowRightAlt from "@mui/icons-material/ArrowRightAlt";

import { AppNotificationStatus } from "state/app";
import { selectNotificationStatus } from "state/selectors";
import { selectStakeAllowance } from "state/selectors";

import { Text, Spinner, ButtonPrimary } from "@klimadao/lib/components";
import { CarbonTonsRetiredCard } from "components/CarbonTonsRetiredCard";
import { CarbonTonsBreakdownCard } from "components/CarbonTonsBreakdownCard";
import { MiniTokenDisplay } from "components/MiniTokenDisplay";
import { DropdownWithModal } from "components/DropdownWithModal";

import BCT from "public/icons/BCT.png";
import MCO2 from "public/icons/MCO2.png";

import * as styles from "./styles";

const inputTokens = [
  { name: "BCT", icon: BCT },
  { name: "MCO2", icon: MCO2 },
];
const retireTokens = [
  { name: "BCT", icon: BCT },
  { name: "MCO2", icon: MCO2 },
];

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
  // local state
  const [isRetireTokenModalOpen, setRetireTokenModalOpen] = useState(false);
  const [isInputTokenModalOpen, setInputTokenModalOpen] = useState(false);

  const [currentTokenToRetire, setCurrentTokenToRetire] = useState(
    retireTokens[0]
  );
  const [currentInputToken, setCurrentInputToken] = useState(inputTokens[0]);

  // methods
  const getButtonProps = (): ButtonProps => {
    return {
      label: <Trans id="shared.connect_wallet">Connect wallet</Trans>,
      onClick: props.loadWeb3Modal,
      disabled: false,
    };
  };
  const stakeAllowance = useSelector(selectStakeAllowance);
  const fullStatus: AppNotificationStatus | null = useSelector(
    selectNotificationStatus
  );
  const status = fullStatus && fullStatus.statusType;

  const isLoading =
    !stakeAllowance || typeof stakeAllowance.klima === "undefined";
  const showSpinner =
    props.isConnected &&
    (status === "userConfirmation" ||
      status === "networkConfirmation" ||
      isLoading);

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
            label="Select input token"
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
                value=""
                placeholder={t({
                  id: "offset.how_many_retire",
                  message: "How many carbon tonnes would you like to retire?",
                })}
                type="number"
              />
              <button className="button_max" type="button">
                <Trans id="shared.max">Max</Trans>
              </button>
            </div>
          </div>
          <div className="mini_token_display_row">
            <MiniTokenDisplay
              label="cost"
              amount={0}
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
              amount={0}
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
              value=""
              placeholder={t({
                id: "offset.who_beneficiary",
                message: "Who is the beneficiary?",
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
              value=""
              placeholder={t({
                id: "offset.which_address_retiring",
                message: "Which address are you retiring on behalf of?",
              })}
            />
          </div>
          <div className={styles.input}>
            <label>
              <Text t="caption" color="lightest">
                <Trans id="offset.retirement_message">
                  RETIREMENT MESSAGE (optional)
                </Trans>
              </Text>
            </label>
            <input
              value=""
              placeholder={t({
                id: "offset.retirement_additional_info",
                message: "Any additional info for your retirement?",
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
      <CarbonTonsRetiredCard />
      <CarbonTonsBreakdownCard />
    </>
  );
};
