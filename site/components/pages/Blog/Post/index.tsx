import { Trans } from "@lingui/macro";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Image from "next/legacy/image";
import Link from "next/link";

import { Text } from "@klimadao/lib/components";
import { urls } from "@klimadao/lib/constants";

import { Footer } from "components/Footer";
import { Navigation } from "components/Navigation";
import { PageHead } from "components/PageHead";
import PortableTextRenderer from "components/PortableTextRenderer";
import { Post } from "lib/queries";

import defaultImage from "public/cover-default.png";

import * as styles from "./styles";

interface PostProps {
  post?: Post;
}

export const PostPage = (props: PostProps) => {
  if (!props.post) {
    return (
      <>
        <Navigation activePage="Resource Center" />
        <div className={styles.fallbackContainer}>
          {/* TODO: worth restyling this */}
          <Text className={styles.loadingArticle}>Loading article...</Text>
        </div>
        <Footer />
      </>
    );
  }

  const publishedDate = `Published ${new Date(
    props.post.publishedAt
  ).toDateString()}`;

  return (
    <>
      <PageHead
        title={props.post.title}
        mediaTitle={props.post.title}
        metaDescription={props.post.summary}
        mediaImageSrc={props.post.imageUrl || urls.mediaImage}
        isArticle={true}
      />

      <Navigation activePage="Resource Center" />

      <div className={styles.container}>
        <div className={styles.banner}>
          <div className={styles.bannerImage}>
            <Image
              priority={true}
              src={props.post.imageUrl || defaultImage}
              alt={props.post.title}
              objectFit="cover"
              layout="fill"
            />
          </div>
        </div>

        <section className={styles.blogContainer}>
          <div className={styles.content}>
            <Link href="/resources" passHref className={styles.backNavLink}>
              <ChevronLeftIcon fontSize="medium" />
              <Trans id="shared.resourcecenter">Resource Center</Trans>
            </Link>

            <Text t="h2" as="h1">
              {props.post.title}
            </Text>

            <Text t="h5" as="p" className={styles.date}>
              {publishedDate}
            </Text>
            <PortableTextRenderer value={props.post.body} />
            {props.post.showDisclaimer && (
              <div className={styles.disclaimer}>
                <Text t="caption" color="lighter">
                  <Trans id="blog.disclaimer.title">Disclaimer:</Trans>
                </Text>
                <Text t="caption" color="lighter">
                  <Trans
                    id="blog.disclaimer.description"
                    comment="Long sentence"
                  >
                    The information provided in this blog post pertaining to
                    KlimaDAO (“KlimaDAO”), its crypto-assets, business assets,
                    strategy, and operations, is for general informational
                    purposes only and is not a formal offer to sell or a
                    solicitation of an offer to buy any securities, options,
                    futures, or other derivatives related to securities in any
                    jurisdiction and its content is not prescribed by securities
                    laws. Information contained in this blog post should not be
                    relied upon as advice to buy or sell or hold such securities
                    or as an offer to sell such securities. This blog post does
                    not take into account nor does it provide any tax, legal or
                    investment advice or opinion regarding the specific
                    investment objectives or financial situation of any person.
                    KlimaDAO and its agents, advisors, directors, officers,
                    employees and shareholders make no representation or
                    warranties, expressed or implied, as to the accuracy of such
                    information and KlimaDAO expressly disclaims any and all
                    liability that may be based on such information or errors or
                    omissions thereof. KlimaDAO reserves the right to amend or
                    replace the information contained herein, in part or
                    entirely, at any time, and undertakes no obligation to
                    provide the recipient with access to the amended information
                    or to notify the recipient thereof. The information
                    contained in this blog post supersedes any prior blog post
                    or conversation concerning the same, similar or related
                    information. Any information, representations or statements
                    not contained herein shall not be relied upon for any
                    purpose. Neither KlimaDAO nor any of its representatives
                    shall have any liability whatsoever, under contract, tort,
                    trust or otherwise, to you or any person resulting from the
                    use of the information in this blog post by you or any of
                    your representatives or for omissions from the information
                    in this blog post. Additionally, KlimaDAO undertakes no
                    obligation to comment on the expectations of, or statements
                    made by, third parties in respect of the matters discussed
                    in this blog post.
                  </Trans>
                </Text>
              </div>
            )}
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
};
