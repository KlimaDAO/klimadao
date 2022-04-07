import React, { useState } from "react";
import { NextPage } from "next";
import { ButtonPrimary, Text } from "@klimadao/lib/components";

import { Modal } from "components/Modal";

import {
  ActiveAssetsCard,
  AssetsOverTimeCard,
  FootprintCard,
  MethodologyCard,
  PledgeCard,
  RetiredAssetsCard,
} from "./Cards";
import { PledgeForm } from "./PledgeForm";
import { PledgeLayout } from "../PledgeLayout";
import * as styles from "./styles";

export const PledgeDashboard: NextPage = () => {
  const [showModal, setShowModal] = useState(false);

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
          <Text t="h4">Company name</Text>
        </div>

        <div className={styles.pledgeChart}>
          <AssetsOverTimeCard />
        </div>

        <div className={styles.column}>
          <PledgeCard />
          <FootprintCard />
          <MethodologyCard />
        </div>

        <div className={styles.column}>
          <ActiveAssetsCard />
          <RetiredAssetsCard />
        </div>
      </div>
    </PledgeLayout>
  );
};
