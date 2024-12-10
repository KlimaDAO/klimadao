import { ButtonPrimary, Text } from "@klimadao/lib/components";
import { useScrollLock } from "@klimadao/lib/utils";
import { Modal } from "components/Modal";
import { isNil } from "lodash";
import { FC, useEffect, useState } from "react";
import * as styles from "./styles";

export const DisclaimerModal: FC = () => {
  const [showModal, setShowModal] = useState(false);
  useScrollLock(showModal);

  useEffect(() => {
    if (isNil(window?.sessionStorage?.getItem("disclaimer_accepted"))) {
      setShowModal(true);
    }
  }, []);

  const setDisclaimer = async () => {
    window.sessionStorage.setItem("disclaimer_accepted", "");
    setShowModal(false);
  };

  if (!showModal) {
    return null;
  }

  return (
    <Modal title="Risk Disclaimer" className={styles.modal}>
      <div className={styles.content}>
        <Text t="body2">
          Purchasing cryptocurrencies, including the $KLIMA token, involves a
          high degree of risk and should be considered extremely speculative.
          Here are some important points to consider:
        </Text>
        <Text t="body2">
          Loss of Investment: The value of $KLIMA and other cryptocurrencies can
          rapidly increase or decrease at any time. As a result, you could
          experience significant and rapid losses, including the loss of all
          money invested.
        </Text>
        <Text t="body2">
          Lack of Liquidity: There may be no active market for $KLIMA, which may
          result in losses if you need to sell your tokens quickly.
        </Text>
        <Text t="body2">
          Regulatory Actions and Changes: The regulatory environment for
          cryptocurrencies is evolving and changes in regulation could adversely
          affect your investment.
        </Text>
        <Text t="body2">
          Operational Risks: The KlimaDAO platform relies on various
          technologies related to the Base network and other digital assets.
          These technologies are subject to change, and such changes could
          adversely affect your investment.
        </Text>
        <Text t="body2">
          No Guarantee: There is no guarantee that the KlimaDAO platform or the
          $KLIMA token will achieve its objectives or that any value will be
          retained in the Protocol.
        </Text>
        <Text t="body2">
          This summary risk warning does not disclose all the risks associated
          with investing in $KLIMA. You should conduct your own due diligence
          and consult with a financial advisor before making any investment
          decisions.
        </Text>
        <ButtonPrimary
          className={styles.dislaimerButton}
          label="Acknowledge and Accept"
          onClick={setDisclaimer}
        />
      </div>
    </Modal>
  );
};
