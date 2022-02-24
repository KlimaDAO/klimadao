import React, { FC } from "react";
import Image from "next/image";

import { Anchor as A, Text } from "@klimadao/lib/components";

import BlockContent, {
  BlockContentProps,
} from "@sanity/block-content-to-react";

import * as styles from "./styles";

interface BlockContentRendererProps {
  blocks: {
    children: {
      text: string;
    }[];
  }[];
}

const BlockRenderer = (params: {
  node: { style: "h1" | "h2" | "h3" | "h4" | "normal" | "blockquote" };
  children: JSX.Element;
}) => {
  const { style } = params.node;
  if (style === "h1") {
    return (
      <Text t="h3" as="h2" className={styles.heading}>
        {params.children}
      </Text>
    );
  }
  if (style === "h2" || style === "h3" || style === "h4") {
    return (
      <Text t="h4" as="h3" className={styles.heading}>
        {params.children}
      </Text>
    );
  }
  if (style === "normal") {
    return (
      <Text t="body2" className={styles.paragraph}>
        {params.children}
      </Text>
    );
  }
  if (style === "blockquote") {
    return (
      <Text t="body2" className={styles.blockQuote}>
        {params.children}
      </Text>
    );
  }
  // Fall back to default handling https://www.sanity.io/docs/portable-text-to-react#customizing-the-default-serializer-for
  return BlockContent.defaultSerializers.types.block(params);
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
    return <li className={styles.li}>{params.children}</li>;
  },
  marks: {
    link: ({ children, mark }) => {
      const { href } = mark;
      return (
        <A className={styles.link} href={href}>
          {children}
        </A>
      );
    },
  },
  types: {
    block: BlockRenderer,
    image: (params: {
      node: { asset: { url: string; width: number; height: number } };
    }) => {
      return (
        <div className={styles.inlineImage}>
          <Image
            src={params.node.asset.url}
            alt="inline image"
            objectFit="contain"
            layout="responsive"
            width={params.node.asset.width}
            height={params.node.asset.height}
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
