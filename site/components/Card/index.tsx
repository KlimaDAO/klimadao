import React from "react";
import Link from "next/link";
import Image from "next/image";

import { Text } from "@klimadao/lib/components";
import defaultImage from "public/cover-default.png";
import { PostDetails } from "lib/queries";

import styles from "./index.module.css";

interface CardProps {
  post: PostDetails;
}

export function Card(props: CardProps) {
  const date = new Date(props.post.publishedAt).toLocaleDateString("en");

  return (
    <Link href={`/blog/${props.post.slug}`}>
      <a className={styles.card}>
        <div className={styles.content}>
          <Text t="body3" className={styles.date}>
            {date}
          </Text>
          <Text t="body1">{props.post.title}</Text>
          <Text t="body2" className={styles.summary}>
            {props.post.summary}
          </Text>
          <Text
            t="caption"
            className={styles.read_more}
            style={{ marginTop: "auto" }}
          >
            Read more
          </Text>
        </div>
        <div className={styles.image}>
          <Image
            src={props.post.imageUrl || defaultImage}
            alt={props.post.title}
            objectFit="cover"
            layout="fill"
          />
        </div>
      </a>
    </Link>
  );
}
