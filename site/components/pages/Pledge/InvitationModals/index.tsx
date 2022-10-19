import React, { useState, useEffect } from "react";
import { Pledge } from "../types";
import { RemoveModal } from "./RemoveModal";
import { AcceptModal } from "./AcceptModal";

type Props = {
  pledge: Pledge;
  isUnverifiedSecondaryWallet: boolean;
  handleSubmit: (params: { message: (nonce: string) => string }) => void;
  setShowRemoveModal: (value: boolean) => void;
  showRemoveModal: boolean;
};

export const InvitationModals = (props: Props) => {
  const [showAcceptModal, setShowAcceptModal] = useState(false);

  useEffect(() => {
    props.isUnverifiedSecondaryWallet && setShowAcceptModal(true);
  }, [props.isUnverifiedSecondaryWallet]);

  return (
    <>
      <AcceptModal
        showAcceptModal={showAcceptModal}
        setShowAcceptModal={setShowAcceptModal}
        handleSubmit={props.handleSubmit}
        pledge={props.pledge}
      />
      <RemoveModal
        showRemoveModal={props.showRemoveModal}
        setShowRemoveModal={props.setShowRemoveModal}
        handleSubmit={props.handleSubmit}
      />
    </>
  );
};
