import React from "react";
import Image from "next/image";
import {
  HeaderDesktop,
  NavItemDesktop,
  HeaderMobile,
  NavItemMobile,
  ButtonPrimary,
} from "@klimadao/lib/components";
import BlockContent from "@sanity/block-content-to-react";

import styles from "./index.module.css";
import { Post } from "lib/queries";
import { PageHead } from "components/PageHead";
import { Footer } from "components/Footer";
import { urls } from "@klimadao/lib/constants";
import { IS_PRODUCTION } from "lib/constants";
import { t } from "@lingui/macro";
import Link from "next/link";

interface PostProps {
  post?: Post;
}

export function PostPage(props: PostProps) {
  const serializers = {
    types: {
      image: (params: any) => {
        return (
          <div className={styles.inlineImage}>
            <Image
              src={params.node.asset.url}
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
  const body = props.post ? (
    <div className={styles.container}>
      <div className={styles.banner}>
        <div className={styles.bannerImage}>
          <Image
            src={props.post.imageUrl}
            alt={props.post.title}
            objectFit="cover"
            layout="fill"
          />
        </div>
      </div>
      <section className={styles.blogContainer}>
        <div className={styles.content}>
          <h1 className={styles.title}>{props.post.title}</h1>
          <p className={styles.date}>
            Published {new Date(props.post.publishedAt).toDateString()}
          </p>
          <BlockContent blocks={props.post.body} serializers={serializers} />
        </div>
      </section>
    </div>
  ) : (
    <div className={styles.fallbackContainer}>
      <p className={styles.loadingArticle}>Loading article...</p>
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
      <HeaderDesktop
        link={Link}
        buttons={[
          <ButtonPrimary
            key="Enter App"
            label={t`Enter App`}
            href={urls.app}
          />,
        ]}
      >
        <NavItemDesktop
          url={"/"}
          name={t({ message: "Home", id: "mainNav.home" })}
          link={Link}
        />
        <NavItemDesktop
          url={urls.tutorial}
          name={t`Get Klima`}
          rel="noopener noreferrer"
          target="_blank"
        />
        <NavItemDesktop
          url={urls.stake}
          name={t({ message: "Stake", id: "mainNav.stake" })}
        />
        <NavItemDesktop
          url={urls.bond}
          name={t({ message: "Bond", id: "mainNav.bond" })}
        />
        <NavItemDesktop
          url="/resources"
          name={t`Resources`}
          link={Link}
          active={true}
        />
      </HeaderDesktop>
      <HeaderMobile>
        <NavItemMobile url={urls.home} name="Home" />
        <NavItemMobile
          url={urls.tutorial}
          name="Buy Klima"
          target="_blank"
          rel="noreferrer noopener"
        />
        <NavItemMobile url={urls.stake} name="Stake" />
        <NavItemMobile url={urls.stake} name="Wrap" />
        <NavItemMobile url={urls.bond} name="Bond" />
      </HeaderMobile>
      {body}
      <Footer />
    </>
  );
}
