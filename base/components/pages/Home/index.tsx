import GppMaybeOutlinedIcon from "@mui/icons-material/GppMaybeOutlined";
import { formatTonnes } from "lib/formatTonnes";
import Image from "next/image";
import { useState } from "react";
import { RedeemablePoolToken, tokenInfoMap } from "../../../lib/getTokenInfo";
import { ButtonPrimary } from "../../Buttons/ButtonPrimary";
import { Connect } from "../../Connect";
import { DropdownWithModal } from "../../DropdownWithModal";
import { Text } from "../../Text";
import * as styles from "./styles";

export const Home = () => {
  const [quantity, setQuantity] = useState(0);
  const [retirementMessage, setRetirementMessage] = useState(
    "Doing my part to support climate action"
  );
  const [pool, setPool] = useState<RedeemablePoolToken>("bct"); // only support bct initially...
  const [isPoolTokenModalOpen, setPoolTokenModalOpen] = useState(false);

  const handleQuantityChange = (value: number) => {
    const valueToWholeNumber = Math.ceil(Number(value)).toString();
    setQuantity(valueToWholeNumber);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Connect />
      </div>
      <div className={`${styles.ctaCard} ${styles.offsetCard}`}>
        <div className={styles.ctaCard_header}>
          <div className={styles.stakeCard_ui}>
            <div className={styles.inputsContainer}>
              <div className={styles.formGroup}>
                <DropdownWithModal
                  label="Carbon token to retire"
                  modalTitle="Carbon token to retire"
                  currentItem={pool}
                  items={[tokenInfoMap.bct]}
                  isModalOpen={isPoolTokenModalOpen}
                  onToggleModal={() => setPoolTokenModalOpen((s) => !s)}
                  onItemSelect={() => setPool("bct")}
                />
              </div>
              <div className={styles.formGroup}>
                <label>
                  How many tonnes of carbon would you like to retire?
                </label>
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
                  placeholder={"The planet"}
                  onChange={() => console.log("onChange")}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Retirement message</label>
                <textarea
                  value={retirementMessage}
                  placeholder="The planet"
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
                  <Text>
                    {formatTonnes({ amount: quantity, locale: "en" })}
                  </Text>
                </div>
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
    </div>
  );
};
