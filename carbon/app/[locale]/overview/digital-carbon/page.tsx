import { t } from "@lingui/macro";

import { PageHeader } from "components/PageHeader/PageHeader";
import { PageLinks } from "lib/PageLinks";
import Image from "next/image";
import banner from "./banner.png";
import styles from "./styles.module.scss";

function title() {
  return t`What is digital carbon?`;
}
function description() {
  return t`What is digital carbon?`;
}

export async function generateMetadata() {
  return {
    title: title(),
    description: description(),
  };
}

/** Overview page (index/landing page) captured via rewrite in next.config.js*/
export default function OverviewPage() {
  return (
    <>
      <PageHeader title={title()} backButtonHref={PageLinks.Overview} />
      <div className={styles.content}>
        <div className={styles.bannerContainer}>
          <Image
            className={styles.banner}
            src={banner}
            alt={t`Banner image`}
            width={1132}
            height={320}
          />
        </div>
        <article className={styles.article}>
          <h2>{t`What is digital carbon?`}</h2>
          <p>
            {t`The term 'digital carbon' refers to a carbon credit that has been
            bridged from an off-chain carbon registry and tokenized, so that the
            credit now exists solely on a public blockchain (e.g. Polygon). In
            being brought on chain, digital carbon inherits the immutability,
            transparency, and trust of the underlying blockchain database.`}
          </p>
          <p>
            {t`Just like off-chain carbon credits, a digital carbon credit
            represents a verified metric ton of carbon removed or avoided by an
            individual carbon reduction project at a certain point in time. Also
            like traditional credits, digital carbon can be bought, sold, and
            retired – but with much greater transparency and ease. A further
            advantage of digital carbon is that it is a 'money Lego' – it is
            programmable and can be used to power applications, enable new use cases,
            and ultimately, dramatically scale financing to carbon reduction projects.`}
          </p>
        </article>
      </div>
    </>
  );
}
