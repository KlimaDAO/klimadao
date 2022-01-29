import React, { FC } from "react";
import Image from "next/image";

import { Text } from "@klimadao/lib/components";

import BlockContent, {
  BlockContentProps,
} from "@sanity/block-content-to-react";

import styles from "./index.module.css";

interface BlockContentRendererProps {
  blocks: {
    children: {
      text: string;
    }[];
  }[];
}

const BlockRenderer = (params: {
  node: { style: "h1" | "h2" | "h3" | "h4" | "normal" | "quote" };
  children: JSX.Element;
}) => {
  const { style } = params.node;
  if (style === "normal") {
    return (
      <Text t="body1" className={styles.paragraph}>
        {params.children}
      </Text>
    );
  }
  if (style === "quote") {
    // Fall back to default handling https://www.sanity.io/docs/portable-text-to-react#customizing-the-default-serializer-for
    return BlockContent.defaultSerializers.types.block(params);
  }
  if (style === "h1") {
    return (
      <Text t="h2" as="h2" className={styles.heading}>
        {params.children}
      </Text>
    );
  }
  return (
    <Text t={style} as={style} className={styles.heading}>
      {params.children}
    </Text>
  );
};

const serializers: BlockContentProps["serializers"] = {
  list: (params) => {
    const { type, level } = params;
    if (type === "bullet") {
      return (
        <ul className={level === 2 ? styles.nestedUl : styles.ul}>
          {params.children}
        </ul>
      );
    }
    return (
      <ol className={level === 2 ? styles.nestedOl : styles.ol}>
        {params.children}
      </ol>
    );
  },
  listItem: (params) => {
    return (
      <li className={styles.li}>
        <Text t="body1" className={styles.li_content}>
          {/* content of current list item */}
          {params.children[0]}
        </Text>
        {/* nested list items if any */}
        {params.children?.[1]}
      </li>
    );
  },
  marks: {
    link: ({ children, mark }) => {
      const { href } = mark;
      return (
        <a className={styles.link} href={href}>
          {children}
        </a>
      );
    },
  },
  types: {
    block: BlockRenderer,
    image: (params: { node: { asset: { url: string } } }) => {
      return (
        <div className={styles.inlineImage}>
          <Image
            src={params.node.asset.url}
            alt="inline image"
            objectFit="contain"
            width={640}
            height={480}
          />
        </div>
      );
    },
  },
};

const BlockContentRenderer: FC<BlockContentRendererProps> = (props) => {
  return <BlockContent blocks={props.blocks} serializers={serializers} />;
};

export default BlockContentRenderer;
