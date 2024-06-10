import { Anchor, LogoWithClaim, Text } from "@klimadao/lib/components";
import GppMaybeOutlinedIcon from "@mui/icons-material/GppMaybeOutlined";
import { formatTonnes } from "lib/formatTonnes";
import Image from "next/image";
import { useState } from "react";
import { tokenInfoMap } from "../../../lib/getTokenInfo";
import { ButtonPrimary } from "../../Buttons/ButtonPrimary";
import { Connect } from "../../Connect";
import * as styles from "./styles";

function BaseIcon(props: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="146"
      height="146"
      fill="none"
      viewBox="0 0 146 146"
      aria-hidden
      role="presentation"
      className={props.className}
    >
      <circle cx="73" cy="73" r="73" fill="#0052FF"></circle>
      <path
        fill="#fff"
        d="M73.323 123.729c28.294 0 51.23-22.897 51.23-51.141 0-28.245-22.936-51.142-51.23-51.142-26.843 0-48.865 20.61-51.052 46.843h67.715v8.597H22.27c2.187 26.233 24.209 46.843 51.052 46.843z"
      ></path>
    </svg>
  );
}

export const Home = () => {
  const [quantity, setQuantity] = useState("0");
  const [retirementMessage, setRetirementMessage] = useState("");

  const handleQuantityChange = (value: string) => {
    const valueToWholeNumber = Math.ceil(Number(value)).toString();
    setQuantity(valueToWholeNumber);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <a href="https://app.klimadao.finance">
          <LogoWithClaim className={"logo"} />
        </a>
        <Connect />
      </div>
      <div className={styles.textHeading}>
        <Text t="badge" className="newBadge">
          ✨ New!
        </Text>
        <Text as="h1" t="h2">
          Retire carbon on <BaseIcon className="baseIcon" />
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
                placeholder={"e.g. 'The Planet LLC'"}
                onChange={() => console.log("onChange")}
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
              disabled
              label="Approve"
              onClick={() => {
                console.log("onApprove");
              }}
              className={styles.submitButton}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
