import { FC } from "react";

import { Text } from "@klimadao/lib/components";
import { Trans } from "@lingui/macro";
import * as styles from "./styles";

interface Props {
  onHide: () => void;
}

export const skipCheckURLBanner = () => {
  if (typeof window === "undefined") return true;
  return window.localStorage.getItem("checkURLBanner_app") === "skip";
};

export const CheckURLBanner: FC<Props> = ({ onHide }) => {
  const onDontRemind = () => {
    window.localStorage.setItem("checkURLBanner_app", "skip");
    onHide();
  };
  return (
    <div className={styles.container}>
      <div className="banner">
        <div className="banner_text">
          <Text t="h4" align="center">
            <Trans id="checkurlbanner.verify_url_and_bookmark_this_page">
              ⚠️ Verify the URL and bookmark this page!
            </Trans>
          </Text>
          <Text t="caption" color="lighter" align="center">
            <Trans
              id="checkurlbanner.is_the_only_official_domain"
              comment="<0>app.klimadao.finance</0> is the only official domain."
            >
              <strong>app.klimadao.finance</strong> is the only official domain.
            </Trans>
          </Text>
          <Text t="caption" color="lightest">
            <Trans>
              On April 12, 2022 we migrated from "dapp" to "app". Please update
              your bookmarks.
            </Trans>
          </Text>
        </div>
        <div className="okButtonWrap">
          <button onClick={onDontRemind} className="dontButton">
            <Trans id="checkurlbanner.dont_remind_me">Don't Remind Me</Trans>
          </button>
          <button onClick={onHide} className="okButton">
            <Trans id="checkurlbanner.got_it">Got it</Trans>
          </button>
        </div>
      </div>
    </div>
  );
};
