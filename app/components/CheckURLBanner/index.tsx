import React, { FC } from "react";

import styles from "./index.module.css";
import t from "@klimadao/lib/theme/typography.module.css";

interface Props {
  onHide: () => void;
}

export const CheckURLBanner: FC<Props> = ({ onHide }) => {
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
          <button onClick={onHide} className={styles.okButton}>
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
