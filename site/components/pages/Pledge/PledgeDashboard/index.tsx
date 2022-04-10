import React, { useState } from "react";
import { NextPage } from "next";
import { ButtonPrimary, Text } from "@klimadao/lib/components";
import { concatAddress } from "@klimadao/lib/utils";

import { Modal } from "components/Modal";
import { Pledge } from "lib/moralis";
import { Retirements } from "lib/getRetirements";
import { Balances } from "lib/getBalances";

import {
  AssetBalanceCard,
  AssetsOverTimeCard,
  FootprintCard,
  MethodologyCard,
  PledgeCard,
  RetirementsCard,
} from "./Cards";
import { PledgeForm } from "./PledgeForm";
import { PledgeLayout } from "../PledgeLayout";
import * as styles from "./styles";

type Props = {
  balances: Balances;
  pageAddress: string;
  pledge: Pledge;
  retirements: Retirements;
};

const defaultValues = (pledge: Pledge): Pledge =>
  Object.assign(
    {
      address: "",
      description: "Write your pledge today!",
      footprint: [0],
      methodology: "How will you meet your pledge?",
      name: "",
    },
    pledge
  );

export const PledgeDashboard: NextPage<Props> = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [pledge, _setPledge] = useState<Pledge>(defaultValues(props.pledge));

  const ToggleModal = (
    <ButtonPrimary
      key="toggleModal"
      label="Toggle modal"
      onClick={() => setShowModal(!showModal)}
    />
  );

  return (
    <PledgeLayout buttons={[ToggleModal]}>
      <Modal
        title="Your pledge"
        showModal={showModal}
        onToggleModal={() => setShowModal(!showModal)}
      >
        <PledgeForm />
      </Modal>

      <div className={styles.contentContainer}>
        <div className={styles.profile}>
          <Text t="h3" className="profileImage" align="center">
            -
          </Text>
          <Text t="h4">
            {pledge.name || pledge.address || concatAddress(props.pageAddress)}
          </Text>
        </div>

        <div className={styles.pledgeChart}>
          <AssetsOverTimeCard />
        </div>

        <div className={styles.column}>
          <PledgeCard pledge={pledge.description} />
          <FootprintCard footprint={pledge.footprint} />
          <MethodologyCard methodology={pledge.methodology} />
        </div>

        <div className={styles.column}>
          <AssetBalanceCard balances={props.balances} />
          <RetirementsCard retirements={props.retirements} />
        </div>
      </div>
    </PledgeLayout>
  );
};
