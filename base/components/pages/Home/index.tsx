import {
  Anchor,
  BaseLogo,
  LogoWithClaim,
  Text,
} from "@klimadao/lib/components";
import GppMaybeOutlinedIcon from "@mui/icons-material/GppMaybeOutlined";
import { BrowserProvider, JsonRpcSigner, Signer } from "ethers";
import { formatTonnes } from "lib/formatTonnes";
import { submitCrossChain } from "lib/submitCrossChain";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { tokenInfoMap } from "../../../lib/getTokenInfo";
import { ButtonPrimary } from "../../Buttons/ButtonPrimary";
import { Connect } from "../../Connect";
import * as styles from "./styles";

export const Home = () => {
  const { address, connector } = useAccount();
  const [signer, setSigner] = useState<Signer | undefined>();
  const [quantity, setQuantity] = useState("0");
  const [beneficiaryString, setBeneficiaryString] = useState("");
  const [retirementMessage, setRetirementMessage] = useState(
    "Doing my part to support climate action"
  );

  const handleQuantityChange = (value: string) => {
    const valueToWholeNumber = Math.ceil(Number(value)).toString();
    setQuantity(valueToWholeNumber);
  };

  useEffect(() => {
    if (!connector) {
      console.error("No connector found");
      return;
    }
    connector
      .getProvider()
      .then((provider) => {
        const browserProvider = new BrowserProvider(provider);
        setSigner(new JsonRpcSigner(browserProvider, address as string));
      })
      .catch((e) => console.error("An error occurred", e));
  }, [connector]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <a href="https://app.klimadao.finance">
          <LogoWithClaim className="logo" />
        </a>
        <Connect />
      </div>
      <div className={styles.textHeading}>
        <Text t="badge" className="newBadge">
          ✨ New!
        </Text>
        <Text as="h1" t="h2">
          Retire carbon on <BaseLogo className="baseIcon" />
          <span className="base">BASE</span>
        </Text>
        <Text t="body8">
          KlimaDAO is officially{" "}
          <Anchor href="https://forum.klimadao.finance/d/321-kip-62-build-on-base">
            building on Base
          </Anchor>
          . This proof-of-concept cross-chain retirement application gives Base
          users access to the 17 million tokenized carbon credits already on
          Polygon.
        </Text>
        <Text t="body8">
          Stay tuned as we continue to deploy more advanced Base integrations
          across the entire KlimaDAO and{" "}
          <Anchor href="https://www.carbonmark.com">Carbonmark</Anchor>{" "}
          ecosystem 🌍.
        </Text>
      </div>
      <div className={styles.cardBg}>
        <div className={styles.stakeCard_ui}>
          <div className={styles.inputsContainer}>
            <div className={styles.formGroup}>
              <label>How many tonnes of carbon would you like to retire?</label>
              <input
                min="0"
                step="1"
                value={quantity}
                type="number"
                onChange={(e) => handleQuantityChange(e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Who will this retirement be credited to?</label>
              <input
                value={beneficiaryString}
                placeholder={"e.g. 'The Planet LLC'"}
                onChange={(e) => setBeneficiaryString(e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Retirement message</label>
              <textarea
                value={retirementMessage}
                placeholder="e.g. 'Offsetting my company's annual emissions.'"
                onChange={(e) => setRetirementMessage(e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Retiring</label>
              <div className="field">
                <Image
                  width={42}
                  height={42}
                  className="icon"
                  src={tokenInfoMap.bct.icon}
                  alt={tokenInfoMap.bct.label || ""}
                />
                <Text>{formatTonnes({ amount: quantity, locale: "en" })} </Text>
              </div>
              <Text t="caption" color="lightest">
                Base Carbon Tonne (BCT)
              </Text>
            </div>
            <div className={styles.disclaimer}>
              <GppMaybeOutlinedIcon />
              <Text t="caption">
                Be careful not to expose any sensitive personal information.
                Your message can not be edited and will permanently exist on a
                public blockchain.
              </Text>
            </div>
            <ButtonPrimary
              disabled={
                // TODO clean this up
                !signer ||
                Number(quantity) === 0 ||
                !retirementMessage ||
                beneficiaryString === ""
              }
              label="Submit"
              className={styles.submitButton}
              onClick={() =>
                // todo - show approval button if not approved
                // otherwise show cross chain button
                submitCrossChain({
                  signer,
                  quantity: Number(quantity),
                  beneficiaryAddress: address as string,
                  retirementMessage,
                  beneficiaryString,
                })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};
