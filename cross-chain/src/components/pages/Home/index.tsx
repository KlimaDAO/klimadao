import { ButtonPrimary, Text } from "@klimadao/lib/components";
import GppMaybeOutlinedIcon from "@mui/icons-material/GppMaybeOutlined";
import Image from "next/image";
import { useState } from "react";
import { Connect } from "src/components/Connect";
import { DropdownWithModal } from "./../../../components/DropdownWithModal";
import { RedeemablePoolToken, tokenInfoMap } from "./../../../lib/getTokenInfo";
import * as styles from "./styles";

export const Home = () => {
  const [isPoolTokenModalOpen, setPoolTokenModalOpen] = useState(false);
  const [pool, setPool] = useState<RedeemablePoolToken>("bct"); // only support bct initially...

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
                <input value={1000} type="number" min="0" onChange={() => {}} />
              </div>
              <div className={styles.formGroup}>
                <label>Who will this retirement be credited to?</label>
                <input placeholder={"The planet"} onChange={() => {}} />
              </div>
              <div className={styles.formGroup}>
                <label>Retirement message</label>
                <textarea
                  readOnly
                  value={"Doing my part to support climate action"}
                  placeholder={"The planet"}
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
                  <p>0</p>
                </div>
              </div>
              <div className={styles.disclaimer}>
                <GppMaybeOutlinedIcon />
                <Text>
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
