import React, { useState } from "react";
import { NextPage } from "next";
import { ButtonPrimary, Text } from "@klimadao/lib/components";
import { concatAddress } from "@klimadao/lib/utils";

import { Modal } from "components/Modal";
import { useWeb3 } from "hooks/useWeb3/web3context";

import {
  AssetBalanceCard,
  FootprintCard,
  MethodologyCard,
  PledgeCard,
  RetirementsCard,
} from "./Cards";
import { PledgeForm } from "../PledgeForm";
import { PledgeLayout } from "../PledgeLayout";
import { PledgeFormValues } from "../types";
import * as styles from "./styles";

type Props = {
  pageAddress: string;
  pledge: PledgeFormValues;
};

export const PledgeDashboard: NextPage<Props> = (props) => {
  const { address, isConnected } = useWeb3();
  const [showModal, setShowModal] = useState(false);
  const [pledge, setPledge] = useState<PledgeFormValues>(props.pledge);

  const canEditPledge = address?.toLowerCase() === props.pageAddress;

  const buttons =
    canEditPledge && isConnected
      ? [
          <ButtonPrimary
            key="toggleModal"
            label="Edit Pledge"
            onClick={() => setShowModal(!showModal)}
          />,
        ]
      : [];

  const handleFormSubmit = async (data: PledgeFormValues) => {
    setPledge(data);
    setShowModal(false);
  };

  return (
    <PledgeLayout buttons={buttons}>
      <>
        <Modal
          title="Your pledge"
          showModal={showModal}
          onToggleModal={() => setShowModal(!showModal)}
        >
          <PledgeForm
            pageAddress={props.pageAddress}
            pledge={pledge}
            onFormSubmit={handleFormSubmit}
          />
        </Modal>

        <div className={styles.contentContainer}>
          <div className={styles.profile}>
            <Text t="h3" className="profileImage" align="center">
              -
            </Text>
            <Text t="h4">
              {pledge.name || concatAddress(pledge.ownerAddress)}
            </Text>
          </div>

          <div className={styles.column}>
            <PledgeCard pledge={pledge.description} />
            <FootprintCard footprint={pledge.footprint} />
            <MethodologyCard methodology={pledge.methodology} />
          </div>

          <div className={styles.column}>
            <AssetBalanceCard pageAddress={props.pageAddress} />
            <RetirementsCard pageAddress={props.pageAddress} />
          </div>
        </div>
      </>
    </PledgeLayout>
  );
};
