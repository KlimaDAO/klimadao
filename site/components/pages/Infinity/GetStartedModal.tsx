import React from "react";
import Link from "next/link";
import Image from "next/legacy/image";
import { Trans, t } from "@lingui/macro";
import { urls } from "@klimadao/lib/constants";
import { Text } from "@klimadao/lib/components";
import { Modal } from "components/Modal";
import hiker from "public/hiker.jpg";
import net from "public/net.jpg";
import building from "public/building.jpg";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import * as styles from "./styles";
import { getImageSizes } from "@klimadao/lib/utils";

interface Props {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
}

const GetStartedModal = (props: Props) => {
  return (
    <Modal
      onToggleModal={() => props.setShowModal(false)}
      showModal={props.showModal}
      closeOnBackgroundClick={true}
      title={t({
        id: "shared.get_started",
        message: "Get Started",
      })}
    >
      <div className={styles.modalContainer}>
        <Link
          href={urls.creolBusinessCalculator}
          className={styles.modalButtonContainer}
        >
          <div className="overlay" />
          <Image
            src={building}
            layout="fill"
            objectFit="cover"
            alt="building windows"
            className="image"
            sizes={getImageSizes({ large: "486px" })}
            placeholder="blur"
          />
          <Text t="h3" className="text">
            <Trans id="infinity.getStartedModal_business">
              I'm a <br />
              business.
            </Trans>
            <ArrowForwardIcon fontSize="inherit" />
          </Text>
        </Link>
        <Link
          href={urls.creolIndividualCalculator}
          className={styles.modalButtonContainer}
        >
          <div className="overlay" />
          <Image
            src={hiker}
            layout="fill"
            objectFit="cover"
            alt="hiker"
            className="image"
            sizes={getImageSizes({ large: "486px" })}
            placeholder="blur"
          />
          <Text t="h3" className="text">
            <Trans id="infinity.getStartedModal_individual">
              I'm an
              <br />
              individual.
            </Trans>
            <ArrowForwardIcon fontSize="inherit" />
          </Text>
        </Link>
        <Link
          href={urls.cryptoOffsetCalculator}
          className={styles.modalButtonContainer}
        >
          <div className="overlay" />
          <Image
            src={net}
            layout="fill"
            objectFit="cover"
            alt="net"
            className="image"
            sizes={getImageSizes({ large: "486px" })}
            placeholder="blur"
          />
          <Text t="h3" className="text">
            <Trans id="infinity.getStartedModal_offsetCrypto">
              I want to
              <br />
              offset crypto.
            </Trans>
            <ArrowForwardIcon fontSize="inherit" />
          </Text>
        </Link>
        <Link href={urls.klimaInfinityContactForm}>
          <Text t="caption" className={styles.modalLink}>
            <Trans id="infinity.getStartedModal_needAssistance">
              I'd like assistance with my organization's carbon footprint.
            </Trans>
          </Text>
        </Link>
      </div>
    </Modal>
  );
};

export default GetStartedModal;
