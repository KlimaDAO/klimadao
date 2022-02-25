import React, { FC } from "react";

import styles from "./index.module.css";
import { Text } from "@klimadao/lib/components";
import { Trans } from "@lingui/macro";

interface Props {
  onHide: () => void;
}

export const skipCheckURLBanner = () => {
  if (typeof window === "undefined") return true;
  return window.localStorage.getItem("checkURLBanner") === "skip";
};

export const CheckURLBanner: FC<Props> = ({ onHide }) => {
  const onDontRemind = () => {
    window.localStorage.setItem("checkURLBanner", "skip");
    onHide();
  };
  return (
    <div className={styles.bg}>
      <div className={styles.banner}>
        <div className={styles.banner_text}>
          <Text t="h4" align="center">
            <Trans id="checkurlbanner.verify_url_and_bookmark">
              ⚠️ Verify the URL and bookmark this page!
            </Trans>
          </Text>
          <Text t="caption" color="lighter" align="center">
            <strong>dapp.klimadao.finance</strong>{" "}
            <Trans id="checkurlbanner.is_the_only_official_domain">
              is the only official domain.
            </Trans>
          </Text>
        </div>
        <div className={styles.okButtonWrap}>
          <button onClick={onDontRemind} className={styles.dontButton}>
            <Trans id="checkurlbanner.dont_remind_me">Don't Remind Me</Trans>
          </button>
          <button onClick={onHide} className={styles.okButton}>
            <Trans id="checkurlbanner.got_it">Got it</Trans>
          </button>
        </div>
      </div>
    </div>
  );
};
