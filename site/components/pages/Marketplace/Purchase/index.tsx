import React, { useState } from "react";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useWeb3 } from "@klimadao/lib/utils";
import { t, Trans } from "@lingui/macro";
import { Spinner, Text } from "@klimadao/lib/components";
import { Modal } from "components/Modal";

import ArrowBack from "@mui/icons-material/ArrowBack";
import { MarketplaceLayout } from "../Layout";
import { Card } from "components/pages/Marketplace/shared/Card";
import { ProjectImage } from "components/pages/Marketplace/shared/ProjectImage";
import { PurchaseForm, FormValues } from "./PurchaseForm";
import { PageHead } from "components/PageHead";
import { createProjectLink } from "components/pages/Marketplace/lib/createUrls";
import { Project, Listing } from "@klimadao/lib/types/marketplace";
import { createSellerLink } from "components/pages/Marketplace/lib/createUrls";

import { formatBigToPrice } from "components/pages/Marketplace/lib/formatNumbers";

import { Transaction } from "components/pages/Marketplace/shared/Transaction";
import {
  TransactionStatusMessage,
  TxnStatus,
} from "components/pages/Marketplace/lib/statusMessage";
import {
  getUSDCtokenToMarketplaceAllowance,
  onApproveMarketplaceTransaction,
  makePurchase,
} from "components/pages/Marketplace/lib/actions";

import * as styles from "./styles";

type Props = {
  project: Project;
  listing: Listing;
};

const FAKE_USDC = "0x284A5F4d90a49F7eb21C055eA3C824603314B1E7"; // TODO: delete me before switch to mainnet

export const MarketPlaceProjectPurchase: NextPage<Props> = (props) => {
  const { locale } = useRouter();
  const { address, provider } = useWeb3();
  const [isLoadingAllowance, setIsLoadingAllowance] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [inputValues, setInputValues] = useState<FormValues | null>(null);
  const [status, setStatus] = useState<TransactionStatusMessage | null>(null);
  const [allowanceValue, setAllowanceValue] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isPending =
    status?.statusType === "userConfirmation" ||
    status?.statusType === "networkConfirmation";

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
      if (!address || !provider) return;
      const allowance = await getUSDCtokenToMarketplaceAllowance({
        tokenAddress: FAKE_USDC,
        userAdress: address,
        provider,
      });

      console.log("allowance", allowance);

      setAllowanceValue(allowance);
      setInputValues(values);
    } catch (e) {
      console.error(e);
      setErrorMessage(
        t({
          id: "marketplace.purchase.loading.allowance.error",
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
      await onApproveMarketplaceTransaction({
        tokenAddress: FAKE_USDC,
        provider,
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
      console.log("result", result);
    } catch (e) {
      console.error("makePurchase error", e);
    } finally {
      setIsProcessing(false);
    }
  };

  console.log("status", status);

  console.log("hasApproval", hasApproval());

  return (
    <>
      <PageHead
        title={`KlimaDao - Purchase Marketplace Project: ${props.project.name}`}
        mediaTitle={`KlimaDao - Purchase Marketplace Project: ${props.project.name}`}
        metaDescription={`KlimaDao - Purchase Marketplace Project: ${props.project.name}`}
      />

      <MarketplaceLayout>
        <div className={styles.fullWidth}>
          <Link
            href={createProjectLink(props.project)}
            className={styles.backToResults}
          >
            <ArrowBack className="arrow" />
            <Trans id="marketplace.project.single.button.back_to_results">
              Back to Results
            </Trans>
          </Link>
        </div>

        <div className={styles.fullWidth}>
          <Card>
            <div className={styles.projectHeader}>
              <ProjectImage category={props.project.category.id} />
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
              <div className="stack">
                <Text
                  t="badge"
                  align="center"
                  className={styles.projectHeaderText}
                >
                  <Trans id="marketplace.project.single.header.seller">
                    Seller:
                  </Trans>{" "}
                  <Link href={createSellerLink(props.listing.seller.handle)}>
                    @
                    {props.listing.seller.username ||
                      props.listing.seller.handle ||
                      props.listing.seller.id}
                  </Link>
                </Text>
              </div>
            </div>
            <div className={styles.price}>
              <Text t="body4">
                {formatBigToPrice(props.listing.singleUnitPrice, locale)}{" "}
                <Trans id="marketplace.purchase.price_each">each</Trans>
              </Text>
            </div>
            <div className={styles.formContainer}>
              <PurchaseForm
                onSubmit={onContinue}
                listing={props.listing}
                values={inputValues}
                isLoading={isLoadingAllowance}
              />
            </div>

            {errorMessage && <Text>{errorMessage}</Text>}
          </Card>
        </div>

        <Modal
          title={
            !isProcessing
              ? t({
                  id: "marketplace.purchase.transaction.modal.title.confirm",
                  message: "Confirm Purchase",
                })
              : t({
                  id: "marketplace.purchase.transaction.modal.title.processing",
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
      </MarketplaceLayout>
    </>
  );
};
