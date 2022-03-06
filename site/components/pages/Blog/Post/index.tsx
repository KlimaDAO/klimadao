import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Text } from "@klimadao/lib/components";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

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

  console.log(props.post);
  return (
    <>
      <PageHead
        production={IS_PRODUCTION}
        title={props.post.title}
        mediaTitle={props.post.title}
        metaDescription={props.post.summary}
        mediaImageSrc={props.post.imageUrl || "/og-media.png"}
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
          {/* <div className={styles.backContainer}> */}
          <Link href="/blog" passHref={true}>
            <a className={styles.backNav}>
              <ChevronLeftIcon /> Blog
            </a>
          </Link>
          {/* </div> */}

          <div className={styles.content}>
            <Text t="h2" as="h1">
              {props.post.title}
            </Text>
            <Text t="h5" as="p" className={styles.date}>
              {publishedDate}
            </Text>
            <BlockContentRenderer blocks={props.post.body} />
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
};
