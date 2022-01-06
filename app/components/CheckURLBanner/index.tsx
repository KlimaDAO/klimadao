import React, { FC } from "react";

import styles from "./index.module.css";
import t from "@klimadao/lib/theme/typography.module.css";

interface Props {
  onHide: () => void;
}

<<<<<<< HEAD
export const CheckURLBanner: FC<Props> = ({ onHide }) => {
=======
export const skipCheckURLBanner = () => {
  if (typeof window === "undefined") return true;
  return window.localStorage.getItem("checkURLBanner") === "skip";
};

export const CheckURLBanner: FC<Props> = ({ onHide }) => {
  const onDontRemind = () => {
    window.localStorage.setItem("checkURLBanner", "skip");
    onHide();
  };
>>>>>>> d159e4628282c6975be991c2186993dc40fd21da
  return (
    <div className={styles.bg}>
      <div className={styles.banner}>
        <div className={styles.banner_text}>
          <p className={t.body1}>⚠️ Verify the URL and bookmark this page!</p>
          <p className={t.body2}>
            <strong>klimadao.finance</strong> is the only official domain
          </p>
        </div>
        <div className={styles.okButtonWrap}>
<<<<<<< HEAD
=======
          <button onClick={onDontRemind} className={styles.dontButton}>
            Don't Remind Me
          </button>
>>>>>>> d159e4628282c6975be991c2186993dc40fd21da
          <button onClick={onHide} className={styles.okButton}>
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
