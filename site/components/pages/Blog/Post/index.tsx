import React from "react";

import Image from "next/image";
import Link from "next/link";

import { Trans } from "@lingui/macro";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import { Text } from "@klimadao/lib/components";

import { Post } from "lib/queries";
import { IS_PRODUCTION } from "lib/constants";

import { PageHead } from "components/PageHead";
import { Footer } from "components/Footer";
import { Navigation } from "components/Navigation";
import BlockContentRenderer from "components/BlockContentRenderer";

import defaultImage from "public/cover-default.png";

import * as styles from "./styles";

interface PostProps {
  post?: Post;
}

export const PostPage = (props: PostProps) => {
  if (!props.post) {
    return (
      <>
        <Navigation activePage="Resources" />
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
        production={IS_PRODUCTION}
        title={props.post.title}
        mediaTitle={props.post.title}
        metaDescription={props.post.summary}
        mediaImageSrc={props.post.imageUrl || "/og-media.png"}
        isArticle={true}
      />

      <Navigation activePage="Resources" />

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
            <Link href="/blog" passHref={true}>
              <a className={styles.backNavLink}>
                <ChevronLeftIcon fontSize="medium" />
                Blog
              </a>
            </Link>

            <Text t="h2" as="h1">
              {props.post.title}
            </Text>

            <Text t="h5" as="p" className={styles.date}>
              {publishedDate}
            </Text>
            <BlockContentRenderer blocks={props.post.body} />
            {props.post.showDisclaimer && (
              <div className={styles.disclaimer}>
                <Text t="caption">
                  <Trans id="blog.disclaimer.title">Disclaimer:</Trans>
                </Text>
                <Text t="caption">
                  <Trans
                    id="blog.disclaimer.description"
                    comment="Long sentence"
                  >
                    The information provided in this blog post pertaining to
                    Klima DAO (“Klima DAO”), its crypto-assets, business assets,
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
                    Klima DAO and its agents, advisors, directors, officers,
                    employees and shareholders make no representation or
                    warranties, expressed or implied, as to the accuracy of such
                    information and Klima DAO expressly disclaims any and all
                    liability that may be based on such information or errors or
                    omissions thereof. Klima DAO reserves the right to amend or
                    replace the information contained herein, in part or
                    entirely, at any time, and undertakes no obligation to
                    provide the recipient with access to the amended information
                    or to notify the recipient thereof. The information
                    contained in this blog post supersedes any prior blog post
                    or conversation concerning the same, similar or related
                    information. Any information, representations or statements
                    not contained herein shall not be relied upon for any
                    purpose. Neither Klima DAO nor any of its representatives
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
