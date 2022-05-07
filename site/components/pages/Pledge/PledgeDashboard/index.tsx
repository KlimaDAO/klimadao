import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useMoralis } from "react-moralis";
import { ButtonPrimary, Text } from "@klimadao/lib/components";
import { concatAddress } from "@klimadao/lib/utils";

import { Modal } from "components/Modal";
import { PledgeFormValues } from "lib/moralis";

import {
  AssetBalanceCard,
  FootprintCard,
  MethodologyCard,
  PledgeCard,
  RetirementsCard,
} from "./Cards";
import { PledgeForm } from "./PledgeForm";
import { PledgeLayout } from "../PledgeLayout";
import * as styles from "./styles";

type Props = {
  pageAddress: string;
  pledge: PledgeFormValues;
};

const defaultValues = (pledge: PledgeFormValues): PledgeFormValues =>
  Object.assign(
    {
      address: "",
      pledge: "",
      footprint: [0],
      methodology: "",
      name: "",
      nonce: 33,
    },
    pledge
  );

export const PledgeDashboard: NextPage<Props> = (props) => {
  const router = useRouter();
  const { isAuthenticated, user } = useMoralis();
  const [showModal, setShowModal] = useState(false);
  const [validAddress, setValidAddress] = useState(false);
  const [pledge, setPledge] = useState<PledgeFormValues>(
    defaultValues(props.pledge)
  );

  const canEditPledge =
    isAuthenticated && user?.get("ethAddress") === props.pageAddress;

  const buttons = canEditPledge
    ? [
        <ButtonPrimary
          key="toggleModal"
          label="Edit Pledge"
          onClick={() => setShowModal(!showModal)}
        />,
      ]
    : [];

  useEffect(() => {
    try {
      ethers.utils.getAddress(props.pageAddress);
      setValidAddress(true);
    } catch {
      router.push("/pledge");
    }
  });

  const handleFormSubmit = async (data: PledgeFormValues) => {
    setPledge(data);
    setShowModal(false);
  };

  return (
    <PledgeLayout buttons={buttons}>
      {validAddress && (
        <>
          <Modal
            title="Your pledge"
            showModal={showModal}
            onToggleModal={() => setShowModal(!showModal)}
          >
            <PledgeForm pledge={pledge} onFormSubmit={handleFormSubmit} />
          </Modal>

          <div className={styles.contentContainer}>
            <div className={styles.profile}>
              <Text t="h3" className="profileImage" align="center">
                -
              </Text>
              <Text t="h4">{pledge.name || concatAddress(pledge.address)}</Text>
            </div>

            <div className={styles.column}>
              <PledgeCard pledge={pledge.pledge} />
              <FootprintCard footprint={pledge.footprint} />
              <MethodologyCard methodology={pledge.methodology} />
            </div>

            <div className={styles.column}>
              <AssetBalanceCard pageAddress={props.pageAddress} />
              <RetirementsCard pageAddress={props.pageAddress} />
            </div>
          </div>
        </>
      )}
    </PledgeLayout>
  );
};
