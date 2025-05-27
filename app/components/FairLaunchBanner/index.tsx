import { Trans } from "@lingui/macro";
import Link from "next/link";
import * as styles from "./styles";

export const FairLaunchBanner = () => (
  <div className={styles.fairLaunchBanner}>
    <div>
      <Trans>The Klima 2.0 fair launch period has begun 🎉</Trans>
    </div>
    <div>
      <Trans>
        Go to{" "}
        <Link href="https://app.klimaprotocol.com">app.klimaprotocol.com</Link>{" "}
        to get started or see the{" "}
        <Link href="https://klimadao.finance/resources/how-to-join-the-klima-fair-launch-step-by-step-guide-for-klima-holders-and-future-ones">
          fair launch guide
        </Link>{" "}
        to learn more.
      </Trans>
    </div>
  </div>
);
