import Image from "next/legacy/image";
import Link from "next/link";
import { FC } from "react";

import { Text } from "@klimadao/lib/components";

import { FeaturedPost } from "lib/queries";

import defaultImage from "public/cover-default.png";

import { useRouter } from "next/router";
import * as styles from "./styles";

type Props = {
  article: FeaturedPost;
};

export const Article: FC<Props> = (props) => {
  const { locale } = useRouter();

  const publishedDate = new Date(props.article.publishedAt);

  const formattedDate = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(publishedDate);

  return (
    <div className={styles.article}>
      <Image
        alt={`${props.article.title} Image`}
        src={props.article.imageUrl || defaultImage}
        layout="fill"
        objectFit="cover"
      />
      <div className="stack">
        <div className={styles.stackContent}>
          <Text t="caption" className={styles.articleText}>
            {formattedDate}
          </Text>
          <Text t="h3" className={styles.articleText}>
            {props.article.title}
          </Text>
          <Text className={styles.articleText}>{props.article.summary}</Text>
        </div>
        <div className={styles.stackContent}>
          <Text t="h5" className={styles.articleText}>
            <Link href={`/blog/${props.article.slug}`} passHref>
              Read more
            </Link>
          </Text>
        </div>
      </div>
    </div>
  );
};