import { useWeb3 } from "@klimadao/lib/utils";
import { t, Trans } from "@lingui/macro";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { Card } from "components/Card";
import { Category } from "components/Category";
import { Layout } from "components/Layout";
import { PageHead } from "components/PageHead";
import { ProjectImage } from "components/ProjectImage";
import { Modal } from "components/shared/Modal";
import { Spinner } from "components/shared/Spinner";
import { Text } from "components/Text";
import { Transaction } from "components/Transaction";
import { Vintage } from "components/Vintage";
import { approveTokenSpend, makePurchase } from "lib/actions";
import { createProjectLink, createSellerLink } from "lib/createUrls";
import { formatBigToPrice } from "lib/formatNumbers";
import { getAllowance } from "lib/networkAware/getAllowance";
import { getContract } from "lib/networkAware/getContract";
import { getStaticProvider } from "lib/networkAware/getStaticProvider";
import { getCategoryFromProject } from "lib/projectGetter";
import { TransactionStatusMessage, TxnStatus } from "lib/statusMessage";
import { Listing, Project } from "lib/types/carbonmark";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { FormValues, PurchaseForm } from "./PurchaseForm";
import * as styles from "./styles";

export interface ProjectPurchasePageProps {
  project: Project;
  listing: Listing;
}

export const ProjectPurchase: NextPage<ProjectPurchasePageProps> = (props) => {
  const { locale, push } = useRouter();
  const { address, provider } = useWeb3();
  const [isLoadingAllowance, setIsLoadingAllowance] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [inputValues, setInputValues] = useState<FormValues | null>(null);
  const [status, setStatus] = useState<TransactionStatusMessage | null>(null);
  const [allowanceValue, setAllowanceValue] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isActiveListing = props.listing.active && !props.listing.deleted;

  const isPending =
    status?.statusType === "userConfirmation" ||
    status?.statusType === "networkConfirmation" ||
    isProcessing;

  const showTransactionView = !!inputValues && !!allowanceValue;

  const resetStateAndCancel = () => {
    setInputValues(null);
    setAllowanceValue(null);
    setStatus(null);
    setIsLoadingAllowance(false);
    setIsProcessing(false);
  };

  const onModalClose = !isPending ? resetStateAndCancel : undefined;

  const onUpdateStatus = (status: TxnStatus, message?: string) => {
    setStatus({ statusType: status, message: message });
  };

  const onContinue = async (values: FormValues) => {
    setIsLoadingAllowance(true);
    try {
      if (!address) return;
      const allowance = await getAllowance({
        contract: getContract({
          contractName: "usdc",
          provider: getStaticProvider(),
        }),
        address,
        spender: "carbonmark",
        token: "usdc",
      });
      setAllowanceValue(allowance.usdc.carbonmark);
      setInputValues(values);
    } catch (e) {
      console.error(e);
      setErrorMessage(
        t({
          id: "purchase.loading.allowance.error",
          message: "something went wrong loading the allowance",
        })
      );
    } finally {
      setIsLoadingAllowance(false);
    }
  };

  const hasApproval = () => {
    return (
      !!allowanceValue &&
      !!inputValues &&
      Number(allowanceValue) >= Number(inputValues.price)
    );
  };

  const handleApproval = async () => {
    if (!provider || !inputValues) return;

    try {
      await approveTokenSpend({
        tokenName: "usdc",
        spender: "carbonmark",
        signer: provider.getSigner(),
        value: inputValues.price,
        onStatus: onUpdateStatus,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const onMakePurchase = async () => {
    if (!provider || !inputValues) return;

    try {
      setIsProcessing(true);
      const result = await makePurchase({
        listingId: inputValues.listingId,
        amount: inputValues.amount,
        price: inputValues.price,
        provider,
        onStatus: onUpdateStatus,
      });

      if (result.hash) {
        push(`/purchases/${result.hash}`);
      }
    } catch (e) {
      console.error("makePurchase error", e);
      setIsProcessing(false);
    }
  };

  const PurchaseApproval = () => {
    return (
      <div className={styles.formatParagraph}>
        <Text t="body1" color="lighter">
          <Trans id="purchase.approval_1">
            You are about to purchase a carbon asset.
          </Trans>
        </Text>
        <Text t="body1" color="lighter">
          <Trans id="purchase.approval_2">
            The first step is to grant the approval to transfer your payment
            asset from your wallet to Carbonmark, the next step is to approve
            the actual transfer and complete your purchase.
          </Trans>
        </Text>
        <Text t="body1" color="lighter">
          <Trans id="purchase.approval_3">
            Carbon assets you purchase can be listed for sale on Carbonmark at
            any time from your{" "}
            <Link href="/portfolio" target="blank">
              portfolio
            </Link>
            .
          </Trans>
        </Text>
        <Text t="body1" color="lighter">
          <Trans id="purchase.approval_4">
            Verify all information is correct and click 'approve' to continue.
          </Trans>
        </Text>
      </div>
    );
  };

  const PurchaseSubmit = () => {
    return (
      <div className={styles.formatParagraph}>
        <Text t="body1" color="lighter">
          <Trans id="purchase.submit_1">
            The previous step granted the approval to transfer your payment
            asset from your wallet to Carbonmark.
          </Trans>
        </Text>
        <Text t="body1" color="lighter">
          <Trans id="purchase.submit_2">
            Your purchase has not been completed yet. To finalize your purchase,
            verify all information is correct and then click 'submit' below.
          </Trans>
        </Text>
      </div>
    );
  };

  return (
    <>
      <PageHead
        title={t`Purchase ${props.project.projectID} | Carbonmark`}
        mediaTitle={t`Purchase ${props.project.name} | Carbonmark`}
        metaDescription={`${props.project.description}`}
      />

      <Layout>
        <div className={styles.fullWidthBack}>
          <Link
            href={createProjectLink(props.project)}
            className={styles.backToResults}
          >
            <ArrowBack className="arrow" />
            <Trans>Back to Project</Trans>
          </Link>
        </div>

        <div className={styles.fullWidth}>
          <Card>
            <div className={styles.projectHeader}>
              <ProjectImage category={getCategoryFromProject(props.project)} />
              <div className={styles.imageGradient}></div>
              <div className="stack">
                {!!props.listing.seller && (
                  <div className="stack">
                    <Text t="h5" className={styles.projectHeaderText}>
                      <Link
                        href={createSellerLink(props.listing.seller.handle)}
                      >
                        @{props.listing.seller.handle}
                      </Link>
                    </Text>
                  </div>
                )}
                <Text t="h3" className={styles.projectHeaderText}>
                  {props.project.name}
                </Text>
                <div className={styles.projectHeaderTags}>
                  <Text t="body1" className={styles.projectHeaderText}>
                    {props.project.registry}-{props.project.projectID}
                  </Text>
                  <Vintage vintage={props.project.vintage} />
                  <Category category={getCategoryFromProject(props.project)} />
                </div>
              </div>
            </div>
            <div className={styles.price}>
              <Text t="h4">
                {formatBigToPrice(props.listing.singleUnitPrice, locale)}{" "}
                <Trans>each</Trans>
              </Text>
            </div>
            <div className={styles.formContainer}>
              {isActiveListing ? (
                <PurchaseForm
                  onSubmit={onContinue}
                  listing={props.listing}
                  values={inputValues}
                  isLoading={isLoadingAllowance}
                />
              ) : (
                <Text>
                  <Trans>This offer no longer exists.</Trans>
                </Text>
              )}
            </div>

            {errorMessage && <Text>{errorMessage}</Text>}
          </Card>
        </div>

        <Modal
          title={
            !isProcessing
              ? t({
                  id: "purchase.transaction.modal.title.confirm",
                  message: "Confirm Purchase",
                })
              : t({
                  id: "purchase.transaction.modal.title.processing",
                  message: "Processing Purchase",
                })
          }
          showModal={showTransactionView}
          onToggleModal={onModalClose}
        >
          {!!inputValues && !isProcessing && (
            <Transaction
              hasApproval={hasApproval()}
              amount={{
                value: inputValues.price,
                token: "usdc",
              }}
              approvalText={<PurchaseApproval />}
              submitText={<PurchaseSubmit />}
              onApproval={handleApproval}
              onSubmit={onMakePurchase}
              onCancel={resetStateAndCancel}
              status={status}
              onResetStatus={() => setStatus(null)}
            />
          )}
          {isProcessing && (
            <div className={styles.spinnerWrap}>
              <Spinner />
            </div>
          )}
        </Modal>
      </Layout>
    </>
  );
};
