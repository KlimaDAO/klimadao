import React from "react";
import Image from "next/image";
import {
  HeaderDesktop,
  NavItemDesktop,
  HeaderMobile,
  NavItemMobile,
  ButtonPrimary,
  PageWrap,
  Footer,
} from "@klimadao/lib/components";
import BlockContent from "@sanity/block-content-to-react";

import styles from "./index.module.css";
import { Post } from "lib/queries";
import { PageHead } from "components/PageHead";
import { urls } from "@klimadao/lib/constants";
import { IS_PRODUCTION } from "lib/constants";

interface PostProps {
  post: Post;
}

export function PostPage(props: PostProps) {
  console.log(
    `rendering postPage ${props.post?.slug}`,
    JSON.stringify(props.post, undefined, " ")
  );
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
    <>
      <PageHead
        production={IS_PRODUCTION}
        title={props.post.title}
        mediaTitle={props.post.title}
        metaDescription={props.post.summary}
        mediaImageSrc={props.post.imageUrl}
      />
      <PageWrap>
        <HeaderDesktop
          buttons={[
            <ButtonPrimary key="Enter App" label="Enter App" href={urls.app} />,
          ]}
        >
          <NavItemDesktop url={urls.home} name="Home" active={true} />
          <NavItemDesktop
            url={urls.tutorial}
            name="Buy Klima"
            target="_blank"
            rel="noreferrer noopener"
          />
          <NavItemDesktop url={urls.stake} name="Stake" />
          <NavItemDesktop url={urls.wrap} name="Wrap" />
          <NavItemDesktop url={urls.bond} name="Bond" />
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
              <p className={styles.date}>Published {date}</p>
              <BlockContent
                blocks={props.post.body}
                serializers={serializers}
              />
            </div>
          </section>
        </div>
        <Footer />
      </PageWrap>
    </>
  );
}
