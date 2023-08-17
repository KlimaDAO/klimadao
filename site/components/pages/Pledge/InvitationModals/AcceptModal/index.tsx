import {
  ButtonPrimary,
  ButtonSecondary,
  Spinner,
  Text,
} from "@klimadao/lib/components";
import { concatAddress, useWeb3 } from "@klimadao/lib/utils";
import { t, Trans } from "@lingui/macro";
import { useState } from "react";

import { Modal } from "components/Modal";
import {
  pledgeFormAdapter,
  putPledge,
  waitForGnosisSignature,
} from "../../lib";
import {
  approveSecondaryWallet,
  removeSecondaryWallet,
} from "../../lib/editPledgeMessage";
import { getErrorMessage } from "../../PledgeForm";
import { Pledge } from "../../types";
import * as styles from "../styles";
type Props = {
  setShowAcceptModal: (value: boolean) => void;
  showAcceptModal: boolean;
  pledge: Pledge;
  pageAddress: string;
  handleModalFormSubmit: () => void;
  address?: string;
};
type Step = "accept" | "confirm" | "error" | "loading" | "signing";

export const AcceptModal = (props: Props) => {
  const [step, setStep] = useState<Step>("accept");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const shortenedAddress = concatAddress(props.pledge.ownerAddress);

  const getTitle = (step: string) =>
    ({
      accept: t({
        id: "pledge.invitation.accept",
        message: "Accept Invitation",
      }),
      confirm: t({
        id: "shared.confirm",
        message: "Confirm",
      }),
      error: t({
        id: "pledge.invitation.error_title",
        message: "Server Error",
      }),
      loading: t`Loading...`,
      signing: t({
        id: "pledge.invitation.signing",
        message: "Signing",
      }),
    })[step];
  const { signer, address } = useWeb3();

  const handleSubmit = async (params: { message: string }) => {
    try {
      if (!signer) return;
      setStep("signing");
      const signature = await signer.signMessage(params.message);
      setStep("loading");
      if (signature === "0x" && props.address) {
        await waitForGnosisSignature({
          message: params.message,
          address: props.address,
        });
      }
      const data = await putPledge({
        pageAddress: props.pageAddress,
        secondaryWalletAddress: address,
        pledge: pledgeFormAdapter(props.pledge),
        signature,
        urlPath: `/pledge/${props.pageAddress}`,
        action: "accepting",
      });
      if (data.pledge) {
        props.handleModalFormSubmit();
      }
      props.setShowAcceptModal(false);
    } catch (e: any) {
      setStep("error");
      setErrorMessage(getErrorMessage(e.name));
    }
  };
  return (
    <Modal
      title={getTitle(step)}
      showModal={props.showAcceptModal}
      onToggleModal={() => props.setShowAcceptModal(false)}
    >
      {step === "accept" && (
        <>
          <Text className={styles.modalMessage} t="body2">
            <Trans id="pledge.invitation.join_message">
              {shortenedAddress} has invited you to add your wallet to this
              pledge. If you accept, then your carbon retirements will count
              toward {shortenedAddress}'s pledge. You may remove your wallet
              from this pledge at any time.
            </Trans>
          </Text>
          <div className={styles.modalButtons}>
            <ButtonPrimary
              label={t({
                id: "pledge.invitation.accept",
                message: "Accept Invitation",
              })}
              onClick={() => setStep("confirm")}
            />
            <ButtonSecondary
              label={t({
                id: "pledge.invitation.reject",
                message: "Reject Invitation",
              })}
              onClick={() =>
                handleSubmit({
                  message: removeSecondaryWallet(props.pledge.nonce),
                })
              }
              variant="red"
            />
            <ButtonSecondary
              label={t({
                id: "pledge.invitation.later",
                message: "Remind me later",
              })}
              onClick={() => props.setShowAcceptModal(false)}
              variant="gray"
            />
          </div>
        </>
      )}

      {step === "confirm" && (
        <>
          <Text t="body2" className={styles.modalMessage}>
            <Trans id="pledge.modal.wallet_add_confirm">
              You may only have one pledge page per wallet address. If you have
              already created a pledge page with this wallet, visitors will be
              redirected to this pledge instead. You can remove this wallet at
              any time.
            </Trans>
          </Text>
          <div className={styles.modalButtons}>
            <ButtonPrimary
              label={t({ id: "pledge.modal.confirm", message: "Confirm" })}
              onClick={() =>
                handleSubmit({
                  message: approveSecondaryWallet(props.pledge.nonce),
                })
              }
            />
            <ButtonSecondary
              label={t({ id: "shared.cancel", message: "Cancel" })}
              onClick={() => setStep("accept")}
              variant="gray"
            />
          </div>
        </>
      )}
      {step === "error" && (
        <>
          <Text t="body2" className={styles.modalMessage}>
            {errorMessage ?? "Error"}
          </Text>
          <div className={styles.modalButtons}>
            <ButtonSecondary
              label={t({ id: "shared.okay", message: "Okay" })}
              onClick={() => {
                props.setShowAcceptModal(false);
              }}
            />
          </div>
        </>
      )}
      {step === "loading" && (
        <div className={styles.spinnerContainer}>
          <Spinner />
        </div>
      )}
      {step === "signing" && (
        <div className={styles.signingContainer}>
          <div className={styles.spinnerContainer}>
            <Spinner />
            <Text t="caption" className={styles.signatureTitle}>
              <Trans id="pledge.invitations.awaiting_signature">
                Awaiting Signature...
              </Trans>
            </Text>
          </div>
          <Text t="caption">
            <Trans id="pledge.invitations.signature_instructions">
              Use your wallet to sign and confirm this edit.
            </Trans>
          </Text>
        </div>
      )}
    </Modal>
  );
};
