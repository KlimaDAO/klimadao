import React, { FC } from "react";
import Image from "next/image";

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
  if (style === "h1") {
    return <h1 className={styles.h1}>{params.children}</h1>;
  }
  if (style === "h2") {
    return <h2 className={styles.h2}>{params.children}</h2>;
  }
  if (style === "h3") {
    return <h3 className={styles.h3}>{params.children}</h3>;
  }
  if (style === "h4") {
    return <h4 className={styles.h4}>{params.children}</h4>;
  }
  // Fall back to default handling https://www.sanity.io/docs/portable-text-to-react#customizing-the-default-serializer-for
  return BlockContent.defaultSerializers.types.block(params);
};

const serializers: BlockContentProps["serializers"] = {
  list: (params) => {
    const { type } = params;
    const bullet = type === "bullet";
    if (bullet) {
      return <ul className={styles.ul}>{params.children}</ul>;
    }
    return <ol className={styles.ol}>{params.children}</ol>;
  },
  listItem: (params) => <li className={styles.li}>{params.children}</li>,
  types: {
    block: BlockRenderer,
    image: (params: { node: { asset: { url: string } } }) => {
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

const BlockContentRenderer: FC<BlockContentRendererProps> = (props) => {
  return <BlockContent blocks={props.blocks} serializers={serializers} />;
};

export default BlockContentRenderer;
