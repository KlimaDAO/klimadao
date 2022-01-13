import React from "react";
import Link from "next/link";
import Image from "next/image";

import { Blog } from "components/pages/Blog/types";
import styles from "./index.module.css";

interface CardProps {
  blog: Blog;
}

function Card(props: CardProps) {
  const date = new Date(props.blog.publishedAt).toLocaleDateString();
  return (
    <Link href={`/blog/${props.blog.slug}`}>
      <a className={styles.card}>
        <div className={styles.content}>
          <span className={styles.date}>{date}</span>
          <h2>{props.blog.title}</h2>
          <p className={styles.body}>{props.blog.summary}</p>
        </div>
        <div className={styles.image}>
          <Image
            src={props.blog.imageUrl}
            alt={props.blog.title}
            objectFit="cover"
            layout="fill"
          />
        </div>
      </a>
    </Link>
  );
}

export default Card;
