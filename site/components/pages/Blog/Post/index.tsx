import React from "react";
import Link from "next/link";
import Image from "next/image";

import BlockContent from "@sanity/block-content-to-react";

import styles from "./index.module.css";

interface PostProps {
  blog: {
    title: string;
    body: string;
    author: string;
    publishedAt: string;
    imageUrl: string;
  };
}

function Post(props: PostProps) {
  const date = new Date(props.blog.publishedAt).toDateString();

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
            src={props.blog.imageUrl}
            alt={props.blog.title}
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
          <h1 className={styles.title}>{props.blog.title}</h1>
          <p className={styles.date}>Published {date}</p>
          <BlockContent blocks={props.blog.body} serializers={serializers} />
        </div>
      </section>
    </div>
  );
}

export default Post;
