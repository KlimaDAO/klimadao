import { Spinner } from "@klimadao/lib/components";
import { useWeb3 } from "@klimadao/lib/utils";
import { t, Trans } from "@lingui/macro";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { Card } from "components/Card";
import { Layout } from "components/Layout";
import { PageHead } from "components/PageHead";
import { ProjectImage } from "components/ProjectImage";
import { Modal } from "components/shared/Modal";
import { Text } from "components/Text";
import { Transaction } from "components/Transaction";
import { approveTokenSpend, makePurchase } from "lib/actions";
import { createProjectLink, createSellerLink } from "lib/createUrls";
import { formatBigToPrice } from "lib/formatNumbers";
import { getAllowance } from "lib/networkAware/getAllowance";
import { getContract } from "lib/networkAware/getContract";
import { getStaticProvider } from "lib/networkAware/getStaticProvider";
import { TransactionStatusMessage, TxnStatus } from "lib/statusMessage";
import { Listing, Project } from "lib/types/carbonmark";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { FormValues, PurchaseForm } from "./PurchaseForm";
import * as styles from "./styles";

type Props = {
  project: Project;
  listing: Listing;
};

export const ProjectPurchase: NextPage<Props> = (props) => {
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
            <Trans id="project.single.button.back_to_project">
              Back to Project
            </Trans>
          </Link>
        </div>

        <div className={styles.fullWidth}>
          <Card>
            <div className={styles.projectHeader}>
              {!!props.project.category?.id && (
                <ProjectImage category={props.project.category.id} />
              )}
              <div className={styles.imageGradient}></div>
              <div className="stack">
                <Text
                  t="h4"
                  align="center"
                  className={styles.projectHeaderText}
                >
                  {props.project.name}
                </Text>
              </div>

              {!!props.listing.seller && (
                <div className="stack">
                  <Text
                    t="body3"
                    align="center"
                    className={styles.projectHeaderText}
                  >
                    <Trans id="project.single.header.seller">Seller:</Trans>{" "}
                    <Link href={createSellerLink(props.listing.seller.handle)}>
                      @{props.listing.seller.handle}
                    </Link>
                  </Text>
                </div>
              )}
            </div>
            <div className={styles.price}>
              <Text t="body3">
                {formatBigToPrice(props.listing.singleUnitPrice, locale)}{" "}
                <Trans id="purchase.price_each">each</Trans>
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
