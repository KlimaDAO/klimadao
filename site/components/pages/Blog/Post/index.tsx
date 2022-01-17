import React from "react";
import Link from "next/link";
import Image from "next/image";

import BlockContent from "@sanity/block-content-to-react";

import styles from "./index.module.css";
import { Post } from "lib/queries";

interface PostProps {
  post: Post;
}

export function PostPage(props: PostProps) {
  const date = new Date(props.post.publishedAt).toDateString();

  const serializers = {
    types: {
      image: (props: any) => {
        return (
          <div className={styles.inlineImage}>
            <Image
              src={props.node.asset.url}
              alt="inline image"
              objectFit="contain"
              width={320}
              height={240}
            />
          </div>
        );
      },
    },
  };
  return (
    <div className={styles.container}>
      <div className={styles.banner}>
        <div className={styles.bannerImage}>
          <Image
            src={props.post.imageUrl}
            alt={props.post.title}
            objectFit="cover"
            layout="fill"
          />
          <Link href="/resources/blog">
            <a className={styles.backButton}>&lt;</a>
          </Link>
        </div>
      </div>
      <section className={styles.blogContainer}>
        <div className={styles.content}>
          <h1 className={styles.title}>{props.post.title}</h1>
          <p className={styles.date}>Published {date}</p>
          <BlockContent blocks={props.post.body} serializers={serializers} />
        </div>
      </section>
    </div>
  );
}
