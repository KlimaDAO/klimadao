import { ButtonPrimary, Spinner, Text } from "@klimadao/lib/components";
import {
  PoolToken,
  addresses,
  poolTokens,
  urls,
} from "@klimadao/lib/constants";
import { Trans, t } from "@lingui/macro";
import GppMaybeOutlined from "@mui/icons-material/GppMaybeOutlined";
import { ethers, providers } from "ethers";
import type {
  AppNotificationStatus,
  AssetForRetirement,
  TxnStatus,
} from "lib/types/carbonmark";
import { useEffect, useState } from "react";
import { RetirementSuccessModal } from "../RetirementSuccessModal";
// import TCO2 from "public/icons/TCO2.png";
import { ParkOutlined } from "@mui/icons-material";
import { ProjectImage } from "components/ProjectImage";

import { createLinkWithLocaleSubPath } from "lib/listingsGetter";
import { useRouter } from "next/router";
import { RetireModal } from "../RetireModal";
import {
  getApprovalValue,
  handleApprove,
  hasApproval,
} from "../utils/approval";
import { handleRetire } from "../utils/retire";
import { RetirementBanner } from "./RetirementBanner/RetirementBanner";
import * as styles from "./styles";

// import { CarbonBalancesCard } from "components/CarbonBalancesCard";
// import { tokenInfo } from "lib/getTokenInfo";

export const isPoolToken = (str: string): str is PoolToken =>
  !!poolTokens.includes(str as PoolToken);

interface RetireFormProps {
  address: string;
  asset: AssetForRetirement;
  isConnected: boolean;
  onUpdateUser: () => void;
  provider?: providers.JsonRpcProvider;
}

export const RetireForm = (props: RetireFormProps) => {
  const { address, asset, provider } = props;
  const { locale } = useRouter();

  const {
    tokenAddress,
    tokenName,
    balance,
    tokenType,
    tokenSymbol,
    project
  } = asset;

  const [retireModalOpen, setRetireModalOpen] = useState<boolean>(false);
  const [status, setStatus] = useState<AppNotificationStatus | null>(null);
  const [isApproved, setIsApproved] = useState<boolean>(false);
  const [retirementTransactionHash, setRetirementTransactionHash] =
    useState<string>("");
  const [retirementTotals, setRetirementTotals] = useState<number>(0);

  const updateStatus = (statusType: TxnStatus | null, message?: string) => {
    if (!statusType) {
      setStatus(null);
    } else {
      setStatus({ statusType, message });
    }
  };

  const [retirement, setRetirement] = useState({
    quantity: "0",
    maxQuantity: parseFloat(balance),
    beneficiaryName: "",
    beneficiaryAddress: "",
    retirementMessage: "",
  });

  const handleOnSuccessModalClose = () => {
    setRetirement({
      quantity: "0",
      maxQuantity: parseFloat(balance),
      beneficiaryName: "",
      beneficiaryAddress: "",
      retirementMessage: "",
    });
    setRetirementTransactionHash("");
    setRetirementTotals(0);
    setRetireModalOpen(false);
    setStatus(null);
    setIsApproved(false);
  };

  const showSpinner =
    props.isConnected &&
    (status?.statusType === "userConfirmation" ||
      status?.statusType === "networkConfirmation");

  useEffect(() => {
    async function getApproval() {
      if (provider && tokenAddress) {
        await hasApproval({
          quantity: retirement.quantity,
          address,
          provider,
          projectAddress: tokenAddress,
        }).then((isApproved) => {
          setIsApproved(isApproved);
        });
      }
    }
    getApproval();
  }, [retirement.quantity, provider]);

  const handleRetirementChange = (
    field: string,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newValue = event.target.value;

    if (field === "quantity") {
      if (newValue === "") {
        setRetirement((prevState) => ({ ...prevState, quantity: newValue }));
      } else {
        const newQuantity = parseFloat(newValue);

        if (newQuantity >= 0) {
          if (newQuantity <= retirement.maxQuantity) {
            setRetirement((prevState) => ({
              ...prevState,
              quantity: newValue,
            }));
          } else {
            setRetirement((prevState) => ({
              ...prevState,
              quantity: prevState.maxQuantity.toString(),
            }));
          }
        }
      }
    } else if (field === "beneficiaryAddress") {
      // only allows valid address
      if (ethers.utils.isAddress(newValue)) {
        setRetirement((prevState) => ({
          ...prevState,
          beneficiaryAddress: newValue,
        }));
      } else {
        setRetirement((prevState) => ({
          ...prevState,
          beneficiaryAddress: "",
        }));
      }
    } else {
      setRetirement((prevState) => ({ ...prevState, [field]: newValue }));
    }
  };

  return (
    <div>
      <div className={styles.offsetCard}>
        {project ? (
          <RetirementBanner
            projectName={project?.name}
            category={project.category}
            vintage={project.vintage}
            projectKey={project.key}
          />
        ) : (
          <div className={styles.bannerImageContainer}>
            {project && <ProjectImage category="Other" />}
          </div>
        )}

        <div className={styles.offsetCard_ui}>
          <Text t="caption" color="lightest">
            <Trans>
              Retire carbon credits for yourself, or on behalf of another person
              or organization.
            </Trans>
          </Text>
          <Text t="caption" color="lightest">
            <Trans>
              The information below will be broadcast publicly to verify your
              environmental claim. This transaction is permanent; the
              information cannot be changed once your transaction is complete.
            </Trans>
          </Text>
          <Text t="caption" color="lightest">
            <Trans>
              <span style={{ color: "red" }}>* </span> Required Field
            </Trans>
          </Text>
          <div className={styles.input}>
            <label>
              <div className={styles.stackText}>
                <Text t="caption" color="lighter">
                  <Trans id="offset.amount_in_tonnes">
                    How many tonnes of carbon would you like to offset?
                  </Trans>
                </Text>
                <Text
                  t="caption"
                  color="lightest"
                  className={styles.detailsText}
                >
                  <Trans id="offset.amount_in_tonnes_2">
                    Available: {balance}
                  </Trans>
                </Text>
              </div>
            </label>

            <div className="number_input_container">
              <input
                type="number"
                onChange={(event) => handleRetirementChange("quantity", event)}
                placeholder={t({
                  id: "offset.offset_quantity",
                  message: "Enter quantity to offset",
                })}
                value={retirement.quantity}
                className={retirement.quantity > balance ? styles.error : ""}
                min="0"
                max={retirement.maxQuantity}
              />
            </div>
            <button onClick={() => console.log("retirement", retirement)}>
              Retirement
            </button>
          </div>

          {/* attr: beneficiaryName  */}
          <div className={styles.beneficiary}>
            <div className={styles.input}>
              {" "}
              <label>
                <Text t="caption" color="lighter">
                  <Trans id="offset.retirement_credit">
                    Who will this retirement be credited to?
                  </Trans>
                </Text>
              </label>
              <div>
                <input
                  type="text"
                  onChange={(event) =>
                    handleRetirementChange("beneficiaryName", event)
                  }
                  placeholder={t({
                    id: "offset.retirement_beneficiary_name",
                    message: "Beneficiary Name",
                  })}
                  value={retirement.beneficiaryName}
                />
              </div>
              <div>
                <input
                  type="text"
                  onChange={(event) =>
                    handleRetirementChange("beneficiaryAddress", event)
                  }
                  placeholder={t({
                    id: "offset.retirement_beneficiary_address",
                    message: "Beneficiary wallet address (optional)",
                  })}
                  value={retirement.beneficiaryAddress}
                />
              </div>
              <Text t="body8" color="lightest">
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
              value={retirement.retirementMessage}
              maxLength={280}
              onChange={(event) =>
                handleRetirementChange("retirementMessage", event)
              }
              placeholder={t({
                id: "offset.retirement_purpose",
                message: "Describe the purpose of this retirement",
              })}
            />
          </div>

          <div className="disclaimer">
            <GppMaybeOutlined style={{ color: "#FFB800" }} />
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
              <div className={styles.buttonContainer}>
                <ButtonPrimary
                  label={t({
                    id: "retire.submit_button",
                    message: "Retire Carbon",
                  })}
                  onClick={() => setRetireModalOpen(true)}
                  className={styles.submitButton}
                  disabled={retirement.quantity === "0"}
                />
                <ButtonPrimary
                  label={t({ id: "retire.back_button", message: "back" })}
                  href="/portfolio"
                  className={styles.backButton}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      {retireModalOpen && (
        <RetireModal
          title={
            <Text t="h4" className={styles.offsetCard_header_title}>
              <ParkOutlined />
              <Trans id="offset.retire_carbon">Retire Carbon</Trans>
            </Text>
          }
          value={retirement.quantity}
          approvalValue={getApprovalValue(retirement.quantity)}
          tokenName={tokenName}
          spenderAddress={addresses["mainnet"].retirementAggregatorV2}
          onCloseModal={() => setRetireModalOpen(false)}
          onApproval={() =>
            handleApprove({
              provider,
              retirementQuantity: retirement.quantity,
              updateStatus: updateStatus,
              projectAddress: tokenAddress,
            })
          }
          onSubmit={() =>
            handleRetire({
              address,
              provider,
              quantity: retirement.quantity,
              beneficiaryAddress: retirement.beneficiaryAddress,
              beneficiaryName: retirement.beneficiaryName,
              retirementMessage: retirement.retirementMessage,
              onStatus: updateStatus,
              retirementToken: tokenName,
              tokenSymbol: tokenSymbol,
              projectAddress: tokenAddress,
              setRetireModalOpen,
              setRetirementTransactionHash,
              setRetirementTotals,
            })
          }
          status={status}
          onResetStatus={() => setStatus(null)}
          isApproved={isApproved}
        />
      )}
      {/* {console.log("retirementTransactionHash", retirementTransactionHash)}
      {console.log('retirementTotals', retirementTotals)} */}
      {retirementTransactionHash && (
        <RetirementSuccessModal
          onSuccessModalClose={handleOnSuccessModalClose}
          retirementUrl={createLinkWithLocaleSubPath(
            `${urls.retirements}/${
              retirement.beneficiaryAddress || props.address
            }/${retirementTotals}`,
            locale
          )}
        />
      )}
    </div>
  );
};
