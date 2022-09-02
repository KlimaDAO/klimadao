import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Trans } from "@lingui/macro";
import { urls } from "@klimadao/lib/constants";
import { Text } from "@klimadao/lib/components";
import { Modal } from "components/Modal";
import hiker from "public/hiker.jpg";
import net from "public/net.jpg";
import building from "public/building.jpg";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import * as styles from "./styles";

export interface GetStardedModalProps {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
}

const GetStartedModal = (props: GetStardedModalProps) => {
  return (
    <Modal
      onToggleModal={() => props.setShowModal(false)}
      showModal={props.showModal}
      closeOnBackgroundClick={true}
      title="Get Started"
    >
      <div className={styles.modalContainer}>
        <Link href={urls.creolBusinessCalculator} passHref>
          <div className={styles.modalButtonContainer}>
            <div className="overlay" />
            <Image
              src={building}
              layout="fill"
              objectFit="cover"
              alt="building windows"
              className="image"
            />
            <Text t="h3" className="text">
              <Trans id="infinity.getStartedModal_imaBusiness">
                I'm a <br />
                business.
              </Trans>
              <ArrowForwardIcon fontSize="inherit" className="arrow" />
            </Text>
          </div>
        </Link>
        <Link href={urls.creolIndividualCalculator} passHref>
          <div className={styles.modalButtonContainer}>
            <div className="overlay" />
            <Image
              src={hiker}
              layout="fill"
              objectFit="cover"
              alt="hiker"
              className="image"
            />
            <Text t="h3" className="text">
              <Trans id="infinity.getStartedModal_individual">
                I'm an
                <br />
                individual.
              </Trans>
              <ArrowForwardIcon fontSize="inherit" className="arrow" />
            </Text>
          </div>
        </Link>
        <Link href={urls.cryptoOffsetCalculator} passHref>
          <div className={styles.modalButtonContainer}>
            <div className="overlay" />
            <Image
              src={net}
              layout="fill"
              objectFit="cover"
              alt="net"
              className="image"
            />
            <Text t="h3" className="text">
              <Trans id="infinity.getStartedModal_offsetCrypto">
                I want to
                <br />
                offset crypto.
              </Trans>
              <ArrowForwardIcon fontSize="inherit" className="arrow" />
            </Text>
          </div>
        </Link>
        <Link href={urls.klimaInfinityContactForm} passHref>
          <Text t="body6" className={styles.modalLink}>
            <Trans id="infinity.getStartedModal_notSure">
              I'm not sure which option is for me.
            </Trans>
          </Text>
        </Link>
      </div>
    </Modal>
  );
};

export default GetStartedModal;
