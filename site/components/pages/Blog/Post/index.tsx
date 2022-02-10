import React from "react";
import Image from "next/image";

import { Text } from "@klimadao/lib/components";

import { Post } from "lib/queries";
import { IS_PRODUCTION } from "lib/constants";
import { PageHead } from "components/PageHead";
import { Footer } from "components/Footer";
import { Navigation } from "components/Navigation";
import BlockContentRenderer from "components/BlockContentRenderer";
import defaultImage from "public/og-media.png";

import styles from "./index.module.css";

interface PostProps {
  post?: Post;
}

export function PostPage(props: PostProps) {
  const body = props.post ? (
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
          <Text t="h2" as="h1" className={styles.title}>
            {props.post.title}
          </Text>
          <Text t="h5" as="p" className={styles.date}>
            Published {new Date(props.post.publishedAt).toDateString()}
          </Text>
          <BlockContentRenderer blocks={props.post.body} />
        </div>
      </section>
    </div>
  ) : (
    <div className={styles.fallbackContainer}>
      <Text className={styles.loadingArticle}>Loading article...</Text>
    </div>
  );

  return (
    <>
      {props.post && (
        <PageHead
          production={IS_PRODUCTION}
          title={props.post.title}
          mediaTitle={props.post.title}
          metaDescription={props.post.summary}
          mediaImageSrc={props.post.imageUrl}
        />
      )}
      <Navigation activePage="Resources" />
      {body}
      <Footer />
    </>
  );
}
