import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { ButtonPrimary, Text } from "@klimadao/lib/components";
import { concatAddress } from "@klimadao/lib/utils";

import { Modal } from "components/Modal";
import { PledgeFormValues } from "../types";

import {
  AssetBalanceCard,
  FootprintCard,
  MethodologyCard,
  PledgeCard,
  RetirementsCard,
} from "./Cards";
import { PledgeForm } from "../PledgeForm";
import { PledgeLayout } from "../PledgeLayout";
import * as styles from "./styles";
import { useWeb3 } from "hooks/useWeb3/web3context";

type Props = {
  pageAddress: string;
  pledge: PledgeFormValues;
};

// TODO - might not need this due to pledgeResolver
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
  const { address, isConnected } = useWeb3();
  const [showModal, setShowModal] = useState(false);
  const [validAddress, setValidAddress] = useState(false);
  const [pledge, setPledge] = useState<PledgeFormValues>(
    defaultValues(props.pledge)
  );

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
      )}
    </PledgeLayout>
  );
};
