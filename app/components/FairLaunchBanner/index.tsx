import Link from "next/link";
import * as styles from "./styles";

export const FairLaunchBanner = () => (
  <div className={styles.fairLaunchBanner}>
    <div>The Klima 2.0 fair launch period has begun 🎉</div>
    <div>
      Go to{" "}
      <Link href="https://app.klimaprotocol.com">app.klimaprotocol.com</Link> to
      get started or see the{" "}
      <Link href="klimadao.finance/resources/how-to-join-the-klima-fair-launch-step-by-step-guide-for-klima-holders-and-future-ones">
        fair launch guide
      </Link>{" "}
      to learn more.
    </div>
  </div>
);
