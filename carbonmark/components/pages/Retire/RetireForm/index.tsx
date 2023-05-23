import { ButtonPrimary, Text } from "@klimadao/lib/components";
import {
  addresses,
  PoolToken,
  poolTokens,
  urls,
} from "@klimadao/lib/constants";
import { breakpoints } from "@klimadao/lib/theme/breakpoints";
import { t, Trans } from "@lingui/macro";
import GppMaybeOutlined from "@mui/icons-material/GppMaybeOutlined";
import { ProjectImage } from "components/ProjectImage";
import { Col, TwoColLayout } from "components/TwoColLayout";
import { ethers, providers } from "ethers";
import { createLinkWithLocaleSubPath } from "lib/createUrls";
import { carbonmarkTokenInfoMap } from "lib/getTokenInfo";
import { TransactionStatusMessage, TxnStatus } from "lib/statusMessage";
import type { AssetForRetirement, CarbonmarkToken } from "lib/types/carbonmark";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { RetirementSidebar } from "../RetirementSidebar";
import { RetirementStatusModal } from "../RetirementStatusModal";
import { RetireModal } from "../RetireModal";
import {
  getApprovalValue,
  handleApprove,
  hasApproval,
} from "../utils/approval";
import { handleRetire } from "../utils/retire";
import { RetirementBanner } from "./RetirementBanner";
import * as styles from "./styles";

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

  const { tokenName, balance, tokenSymbol, project } = asset;

  const [retireModalOpen, setRetireModalOpen] = useState<boolean>(false);
  const [status, setStatus] = useState<TransactionStatusMessage | null>(null);
  const [isApproved, setIsApproved] = useState<boolean>(false);
  const [retirementTransactionHash, setRetirementTransactionHash] =
    useState<string>("");
  const [retirementTotals, setRetirementTotals] = useState<number>(0);
  const [readyForRetireModal, setReadyForRetireModal] =
    useState<boolean>(false);

  const [isLargeOrBelow, setIsLargeOrBelow] = useState(
    window.innerWidth <= breakpoints.large
  );

  const [retirement, setRetirement] = useState({
    quantity: "0",
    maxQuantity: parseFloat(balance),
    beneficiaryName: "",
    beneficiaryAddress: "",
    retirementMessage: "",
  });

  useEffect(() => {
    const handleResize = () => {
      setIsLargeOrBelow(window.innerWidth <= breakpoints.large);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (
      retirement.quantity > "0" &&
      retirement.beneficiaryName !== "" &&
      retirement.retirementMessage !== "" &&
      (retirement.beneficiaryAddress === "" ||
        ethers.utils.isAddress(retirement.beneficiaryAddress))
    ) {
      setReadyForRetireModal(true);
    } else {
      setReadyForRetireModal(false);
    }
  }, [
    retirement.quantity,
    retirement.beneficiaryName,
    retirement.retirementMessage,
    retirement.beneficiaryAddress,
  ]);

  const getTokenPrefix = (tokenName: string) => {
    const parts = tokenName.split("-");

    if (parts[0].toUpperCase() === "C3T") {
      return "c3";
    }

    return parts[0].toLowerCase();
  };

  const carbonTokenInfo =
    carbonmarkTokenInfoMap[getTokenPrefix(tokenSymbol) as CarbonmarkToken];

  const updateStatus = (status: TxnStatus, message?: string) => {
    setStatus({ statusType: status, message: message });
  };

  // const handleOnSuccessModalClose = () => {
  //   setRetirement({
  //     quantity: "0",
  //     maxQuantity: parseFloat(balance),
  //     beneficiaryName: "",
  //     beneficiaryAddress: "",
  //     retirementMessage: "",
  //   });
  //   setRetirementTransactionHash("");
  //   setRetirementTotals(0);
  //   setRetireModalOpen(false);
  //   setStatus(null);
  //   setIsApproved(false);
  // };

  useEffect(() => {
    async function getApproval() {
      if (provider && project.tokenAddress) {
        await hasApproval({
          quantity: retirement.quantity,
          address,
          provider,
          tokenAddress: project.tokenAddress,
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
    } else {
      setRetirement((prevState) => ({ ...prevState, [field]: newValue }));
    }
  };

  return (
    <div>
      <TwoColLayout>
        <Col>
          <div className={styles.offsetCard}>
            {project ? (
              <RetirementBanner
                projectName={project.name}
                category={project.methodologyCategory}
                vintageYear={project.vintageYear}
                projectKey={project.projectID}
              />
            ) : (
              <div className={styles.bannerImageContainer}>
                {project && <ProjectImage category="Other" />}
              </div>
            )}

            <div className={styles.offsetCard_ui}>
              <Text t="caption" color="lighter">
                <Trans>
                  Retire carbon credits for yourself, or on behalf of another
                  person or organization.
                </Trans>
              </Text>
              <Text t="caption" color="lighter">
                <Trans>
                  The information below will be broadcast publicly to verify
                  your environmental claim. This transaction is permanent; the
                  information cannot be changed once your transaction is
                  complete.
                </Trans>
              </Text>
              <Text t="body2" color="lightest" className={styles.required}>
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
                      t="body8"
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
                    onChange={(event) =>
                      handleRetirementChange("quantity", event)
                    }
                    placeholder={t({
                      id: "offset.offset_quantity",
                      message: "Enter quantity to offset",
                    })}
                    value={retirement.quantity}
                    className={
                      retirement.quantity > balance ? styles.error : ""
                    }
                    min="0"
                    max={retirement.maxQuantity}
                  />
                </div>
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
                      id="beneficiaryAddress"
                      data-error={
                        retirement.beneficiaryAddress &&
                        !ethers.utils.isAddress(retirement.beneficiaryAddress)
                      }
                    />
                  </div>
                  {retirement.beneficiaryAddress &&
                    !ethers.utils.isAddress(retirement.beneficiaryAddress) && (
                      <Text
                        t="caption"
                        color="lighter"
                        className={styles.warningText}
                      >
                        Please enter a valid wallet address
                      </Text>
                    )}
                  <Text
                    t="body8"
                    color="lightest"
                    className={styles.detailsText}
                  >
                    <Trans id="offset.default_retirement_address">
                      Defaults to the connected wallet address
                    </Trans>
                  </Text>
                </div>
              </div>
              <div className={styles.input}>
                <label>
                  <Text t="caption" color="lighter">
                    <Trans id="offset.retirement_message">
                      Retirement message
                    </Trans>
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
              {isLargeOrBelow ? (
                <RetirementSidebar
                  retirementAsset={asset}
                  icon={carbonTokenInfo.icon}
                />
              ) : null}
              <div className="disclaimer">
                <GppMaybeOutlined style={{ color: "#FFB800" }} />
                <Text t="caption">
                  <Trans id="offset_disclaimer">
                    Be careful not to expose any sensitive personal information.
                    Your message can not be edited and will permanently exist on
                    a public blockchain.
                  </Trans>
                </Text>
              </div>
              <div className={styles.buttonRow}>
                <div className={styles.buttonContainer}>
                  <ButtonPrimary
                    label={t({
                      id: "retire.submit_button",
                      message: "Retire Carbon",
                    })}
                    onClick={() => setRetireModalOpen(true)}
                    className={styles.submitButton}
                    disabled={!readyForRetireModal}
                  />
                  <ButtonPrimary
                    label={t({ id: "retire.back_button", message: "back" })}
                    href="/portfolio"
                    className={styles.backButton}
                  />
                </div>
              </div>
            </div>
          </div>
        </Col>
        {!isLargeOrBelow ? (
          <Col>
            <RetirementSidebar
              retirementAsset={asset}
              icon={carbonTokenInfo.icon}
            />
          </Col>
        ) : null}
      </TwoColLayout>

      {retireModalOpen && (
        <RetireModal
          title={
            <Text t="h4" className={styles.offsetCard_header_title}>
              <Trans id="offset.retire_carbon">Confirm Retirement</Trans>
            </Text>
          }
          token={carbonTokenInfo}
          value={retirement.quantity}
          approvalValue={getApprovalValue(retirement.quantity)}
          spenderAddress={addresses["mainnet"].retirementAggregatorV2}
          onCloseModal={() => setRetireModalOpen(false)}
          onApproval={() =>
            handleApprove({
              provider,
              retirementQuantity: retirement.quantity,
              updateStatus: updateStatus,
              tokenAddress: project.tokenAddress,
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
              tokenAddress: project.tokenAddress,
              setRetireModalOpen,
              setRetirementTransactionHash,
              setRetirementTotals,
            })
          }
          status={status}
          setStatus={setStatus}
          onResetStatus={() => setStatus(null)}
          isApproved={isApproved}
          showModal={retireModalOpen}
        />
      )}
      {retirementTransactionHash && (
        <RetirementStatusModal
          retirementUrl={createLinkWithLocaleSubPath(
            `${urls.retirements}/${
              retirement.beneficiaryAddress || props.address
            }/${retirementTotals}`,
            locale
          )}
          showModal={!!retirementTransactionHash}
        />
      )}
    </div>
  );
};
