import { useWeb3 } from "@klimadao/lib/utils";
import { t, Trans } from "@lingui/macro";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { Card } from "components/Card";
import { Layout } from "components/Layout";
import { PageHead } from "components/PageHead";
import { Text } from "components/Text";
import { Col, TwoColLayout } from "components/TwoColLayout";
import { approveTokenSpend, makePurchase } from "lib/actions";
import { createProjectLink } from "lib/createUrls";
import { LO } from "lib/luckyOrange";
import { getAllowance } from "lib/networkAware/getAllowance";
import { getContract } from "lib/networkAware/getContract";
import { getStaticProvider } from "lib/networkAware/getStaticProvider";
import { TransactionStatusMessage, TxnStatus } from "lib/statusMessage";
import { Listing, Project } from "lib/types/carbonmark";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Price } from "./Price";
import { ProjectHeader } from "./ProjectHeader";
import { FormValues, PurchaseForm } from "./PurchaseForm";
import { PurchaseModal } from "./PurchaseModal";
import * as styles from "./styles";

export interface ProjectPurchasePageProps {
  project: Project;
  listing: Listing;
}

export const ProjectPurchase: NextPage<ProjectPurchasePageProps> = (props) => {
  const { push } = useRouter();
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
    LO.track("Purchase: Purchase Modal Closed");
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
    LO.track("Purchase: Approve Clicked");
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
    LO.track("Purchase: Submit Clicked");
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
        LO.track("Purchase: Purchase Completed");
      }
    } catch (e) {
      console.error("makePurchase error", e);
      setIsProcessing(false);
    }
  };

  return (
    <>
      <PageHead
        title={t`Purchase ${props.project.projectID} | Carbonmark`}
        mediaTitle={t`Purchase ${props.project.name} | Carbonmark`}
        metaDescription={`${props.project.description}`}
      />

      <Layout>
        <div className={styles.container}>
          <div className={styles.backToProjectButton}>
            <Link
              href={createProjectLink(props.project)}
              className={styles.backToResults}
            >
              <ArrowBack className="arrow" />
              <Trans>Back to Project</Trans>
            </Link>
          </div>

          <TwoColLayout>
            <Col>
              <Card>
                <ProjectHeader
                  project={props.project}
                  listing={props.listing}
                />
                <div className={styles.formContainer}>
                  <Price price={props.listing.singleUnitPrice} />

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

                  {errorMessage && <Text>{errorMessage}</Text>}
                </div>
              </Card>
            </Col>
            {/* <Col></Col> */}
          </TwoColLayout>
        </div>

        <PurchaseModal
          hasApproval={hasApproval()}
          amount={{
            value: inputValues?.price || "0",
            token: "usdc",
          }}
          isProcessing={isProcessing}
          status={status}
          showModal={showTransactionView}
          onModalClose={onModalClose}
          handleApproval={handleApproval}
          onSubmit={onMakePurchase}
          onCancel={resetStateAndCancel}
          onResetStatus={() => setStatus(null)}
        />
      </Layout>
    </>
  );
};
