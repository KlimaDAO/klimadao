import { Text } from "@klimadao/lib/components";
import { PoolToken, poolTokens, urls } from "@klimadao/lib/constants";
import { useWeb3 } from "@klimadao/lib/utils";
import { Trans, t } from "@lingui/macro";
import GppMaybeOutlined from "@mui/icons-material/GppMaybeOutlined";
import { CarbonmarkButton } from "components/CarbonmarkButton";
import { Category } from "components/Category";
import { ProjectImage } from "components/ProjectImage";
import { Registry } from "components/Registry";
import { Col, TwoColLayout } from "components/TwoColLayout";
import { Vintage } from "components/Vintage";
import { InputField, TextareaField } from "components/shared/Form";
import { ethers, providers } from "ethers";
import { getPolygonScanBaseUrl } from "lib/createUrls";
import { formatToDecimals } from "lib/formatNumbers";
import { carbonmarkTokenInfoMap } from "lib/getTokenInfo";
import { getAddress } from "lib/networkAware/getAddress";
import { TransactionStatusMessage, TxnStatus } from "lib/statusMessage";
import type {
  AssetForRetirement,
  CarbonmarkToken,
  DigitalCarbonCredit,
} from "lib/types/carbonmark.types";
import { CategoryName, User } from "lib/types/carbonmark.types";
import { getUnlistedBalance } from "lib/utils/listings.utils";
import { waitForIndexStatus } from "lib/waitForIndexStatus";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { RetireModal } from "../RetireModal";
import { RetirementSidebar } from "../RetirementSidebar";
import { RetirementStatusModal } from "../RetirementStatusModal";
import { handleApprove, hasApproval } from "../utils/approval";
import { handleRetire } from "../utils/retire";
import * as styles from "./styles";

export const isPoolToken = (str: string): str is PoolToken =>
  !!poolTokens.includes(str as PoolToken);

interface RetireFormProps {
  address: string;
  user: User | null;
  asset: AssetForRetirement;
  provider?: providers.JsonRpcProvider;
}

export const RetireForm = (props: RetireFormProps) => {
  const router = useRouter();
  const { address, asset, provider } = props;
  const { networkLabel } = useWeb3();
  const { tokenName, tokenSymbol, credit } = asset;
  const [retireModalOpen, setRetireModalOpen] = useState<boolean>(false);
  const [status, setStatus] = useState<TransactionStatusMessage | null>(null);
  const [isApproved, setIsApproved] = useState<boolean>(false);
  const [retirementTransactionHash, setRetirementTransactionHash] =
    useState<string>("");
  const [retirementBlockNumber, setRetirementBlockNumber] = useState<number>(0);
  const [subgraphIndexStatus, setSubgraphIndexStatus] = useState<
    "indexed" | "pending" | "timeout"
  >("pending");
  const [retirementTotals, setRetirementTotals] = useState<number>(0);
  const [readyForRetireModal, setReadyForRetireModal] =
    useState<boolean>(false);
  const [processingRetirement, setProcessingRetirement] = useState(false);
  const [quantityError, setQuantityError] = useState<string | undefined>(
    undefined
  );

  const unlistedBalance = formatToDecimals(
    getUnlistedBalance(props.asset, props.user?.listings || [])
  );

  const [retirement, setRetirement] = useState({
    quantity: "0",
    maxQuantity: parseFloat(unlistedBalance),
    beneficiaryName: "",
    beneficiaryAddress: "",
    retirementMessage: "",
  });

  useEffect(() => {
    if (
      retirement.quantity > "0" &&
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
    } else if (parts[0].toUpperCase() === "ICR") {
      return "icr";
    }
    return parts[0].toLowerCase();
  };

  const carbonTokenInfo =
    carbonmarkTokenInfoMap[getTokenPrefix(tokenSymbol) as CarbonmarkToken];

  // temporary until digital-carbon subgraph credit ids for ICR projects follow registry-vintage format
  const constructProjectId = (credit: DigitalCarbonCredit): string => {
    if (credit.project.registry.startsWith("ICR")) {
      return credit.project.registry + "-" + credit.vintage;
    } else {
      return credit.project.projectID;
    }
  };

  const updateStatus = (status: TxnStatus, message?: string) => {
    setStatus({ statusType: status, message: message });
  };

  useEffect(() => {
    async function getApproval() {
      if (provider && credit.tokenAddress) {
        await hasApproval({
          tokenStandard: credit.tokenStandard,
          quantity: retirement.quantity,
          address,
          provider,
          tokenAddress: credit.tokenAddress,
          network: networkLabel,
        }).then((isApproved) => {
          setIsApproved(isApproved);
        });
      }
    }
    getApproval();
  }, [retirement.quantity, provider]);

  const validateQuantity = (value: string) => {
    if (props.asset.credit.project.registry.startsWith("ICR")) {
      return (
        Number.isInteger(parseFloat(value)) ||
        t`ICR credits can only be retired in whole tonnes`
      );
    }
    return true;
  };

  const handleRetirementChange = (
    field: string,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newValue = event.target.value;

    if (field === "quantity") {
      const validationResponse = validateQuantity(newValue);
      setQuantityError(
        typeof validationResponse === "string" ? validationResponse : undefined
      );
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

  useEffect(() => {
    const handleInitialIndexing = async () => {
      const status = await waitForIndexStatus(retirementBlockNumber);
      if (status === "indexed") {
        router.prefetch(
          `/retirements/${retirement.beneficiaryAddress}/${retirementTotals}`
        );
        setSubgraphIndexStatus("indexed");
      } else if (status === "timeout") {
        setSubgraphIndexStatus("timeout");
      }
    };
    if (retirementBlockNumber !== 0 && address) {
      handleInitialIndexing();
    }
  }, [retirementBlockNumber]);

  return (
    <div>
      <TwoColLayout>
        <Col>
          <div className={styles.offsetCard}>
            <div className={styles.projectHeader}>
              <ProjectImage
                category={credit.project.category as CategoryName}
              />
              <div className={styles.imageGradient} />
              <Text t="h3" className={styles.projectHeaderText}>
                {credit.project.name || "Error - No project name found"}
              </Text>
              <div className={styles.tags}>
                <Text t="h5" className={styles.projectIDText}>
                  {constructProjectId(credit)}
                </Text>
                <Vintage vintage={credit.vintage.toString()} />
                <Category
                  category={
                    (credit.project.category as CategoryName) || "Other"
                  }
                />
                <Registry registry={credit.project.registry} />
              </div>
            </div>

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
              <div>
                <label>
                  <div className={styles.stackText}>
                    <Text t="caption" color="lighter">
                      <Trans id="offset.amount_in_tonnes">
                        How many tonnes of carbon would you like to offset?{" "}
                        <span style={{ color: "red" }}>* </span>
                      </Trans>
                    </Text>
                    <Text
                      t="body8"
                      color="lightest"
                      className={styles.detailsText}
                    >
                      <Trans>Available: {unlistedBalance}</Trans>
                    </Text>
                  </div>
                </label>
                <div className="number_input_container">
                  <InputField
                    id="quantity"
                    inputProps={{
                      type: "number",
                      min: "0",
                      max: retirement.maxQuantity.toString(),
                      onChange: (event) =>
                        handleRetirementChange("quantity", event),
                      placeholder: t({
                        id: "offset.offset_quantity",
                        message: "Enter quantity to offset",
                      }),
                      value: retirement.quantity,
                    }}
                    label={"quantity"}
                    hideLabel
                    required
                    errorMessage={quantityError}
                  />
                </div>
              </div>

              {/* attr: beneficiaryName  */}
              <div className={styles.beneficiary}>
                <div className={styles.input}>
                  <label>
                    <Text t="caption" color="lighter">
                      <Trans id="offset.retirement_credit">
                        Who will this retirement be credited to?
                      </Trans>
                    </Text>
                  </label>
                  <div>
                    <InputField
                      id="beneficiaryName"
                      inputProps={{
                        type: "text",
                        onChange: (event) =>
                          handleRetirementChange("beneficiaryName", event),
                        placeholder: t({
                          id: "offset.retirement_beneficiary_name",
                          message: "Beneficiary Name",
                        }),
                        value: retirement.beneficiaryName,
                      }}
                      label={"beneficiaryName"}
                      hideLabel
                    />
                  </div>
                  <div>
                    <InputField
                      id="beneficiaryAddress"
                      inputProps={{
                        type: "text",
                        onChange: (event) =>
                          handleRetirementChange("beneficiaryAddress", event),
                        placeholder: t({
                          message: "Beneficiary wallet address (optional)",
                        }),
                        value: retirement.beneficiaryAddress,
                      }}
                      label={"beneficiaryAddress"}
                      errorMessage={
                        retirement.beneficiaryAddress &&
                        !ethers.utils.isAddress(retirement.beneficiaryAddress)
                          ? "Please enter a valid wallet address"
                          : ""
                      }
                      hideLabel
                    />
                  </div>
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
                <TextareaField
                  id="retirementMessage"
                  textareaProps={{
                    rows: 6,
                    onChange: (event) =>
                      handleRetirementChange("retirementMessage", event),
                    placeholder: t({
                      id: "offset.retirement_retirement_message",
                      message: "Retirement Message",
                    }),
                    value: retirement.retirementMessage,
                  }}
                  label={""}
                />
              </div>
              <div className={styles.sideBarBelowLarge}>
                {" "}
                <RetirementSidebar
                  balance={unlistedBalance}
                  retirementAsset={asset}
                  icon={carbonTokenInfo.icon}
                />
              </div>

              <div className="disclaimer">
                <GppMaybeOutlined style={{ color: "#FFB800" }} />
                <Text t="caption">
                  <Trans id="offset_disclaimer">
                    Be careful not to include any sensitive personal information
                    (such as an email address) in your retirement name or
                    message. The information you enter here cannot be edited
                    once it is submitted and will permanently exist on a public
                    blockchain.
                  </Trans>
                </Text>
              </div>
              <div className={styles.buttonRow}>
                <div className={styles.buttonContainer}>
                  <CarbonmarkButton
                    label={t({
                      id: "retire.submit_button",
                      message: "Retire Carbon",
                    })}
                    onClick={() => setRetireModalOpen(true)}
                    className={styles.submitButton}
                    disabled={!readyForRetireModal}
                  />
                  <CarbonmarkButton
                    label={t({ id: "retire.back_button", message: "back" })}
                    href="/portfolio"
                    className={styles.backButton}
                  />
                </div>
              </div>
            </div>
          </div>
        </Col>

        <Col className={styles.sideBarLargeAndAbove}>
          <RetirementSidebar
            balance={unlistedBalance}
            retirementAsset={asset}
            icon={carbonTokenInfo.icon}
          />
        </Col>
      </TwoColLayout>

      <RetireModal
        title={
          <Text t="h4" className={styles.offsetCard_header_title}>
            <Trans id="offset.retire_carbon">Confirm Retirement</Trans>
          </Text>
        }
        token={carbonTokenInfo}
        processingRetirement={processingRetirement}
        setProcessingRetirement={setProcessingRetirement}
        value={retirement.quantity}
        spenderAddress={getAddress("retirementAggregatorV2")}
        onCloseModal={() => setRetireModalOpen(false)}
        onApproval={() =>
          handleApprove({
            provider,
            retirementQuantity: retirement.quantity,
            updateStatus: updateStatus,
            tokenAddress: credit.tokenAddress,
            tokenStandard: credit.tokenStandard,
            network: networkLabel,
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
            tokenAddress: credit.tokenAddress,
            tokenId: credit.tokenId || "",
            tokenStandard: credit.tokenStandard,
            network: networkLabel,
            setRetireModalOpen,
            setRetirementTransactionHash,
            setRetirementTotals,
            setRetirementBlockNumber,
          }).catch((e) => {
            console.error("Error handling retirement:", e);
            setProcessingRetirement(false);
          })
        }
        status={status}
        setStatus={setStatus}
        onResetStatus={() => setStatus(null)}
        isApproved={isApproved}
        showModal={retireModalOpen}
      />
      {retirementTransactionHash &&
        (subgraphIndexStatus === "indexed" ||
          subgraphIndexStatus === "timeout") && (
          <RetirementStatusModal
            retirementUrl={`${urls.retirements_carbonmark}/${
              retirement.beneficiaryAddress || props.address
            }/${retirementTotals}`}
            polygonScanUrl={`${getPolygonScanBaseUrl(
              networkLabel
            )}/tx/${retirementTransactionHash}`}
            showModal={!!retirementTransactionHash}
            user={props.address}
            retirementIndex={retirementTotals}
            subgraphIndexStatus={subgraphIndexStatus}
          />
        )}
    </div>
  );
};
