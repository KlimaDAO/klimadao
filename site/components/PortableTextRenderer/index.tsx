import React, { FC } from "react";
import Image from "next/image";

import { Anchor as A, Text } from "@klimadao/lib/components";
import {
  PortableText,
  PortableTextComponents,
  PortableTextProps,
} from "@portabletext/react";
import * as styles from "./styles";

// interface Props {
//   children: {
//     text: string;
// }[];
// }

const BlockRenderer = {
  h1: ({ children }: { children: JSX.Element[] }) => (
    <Text t="h3" as="h2" className={styles.heading}>
      {children}
    </Text>
  ),
  h2: ({ children }: { children: JSX.Element[] }) => (
    <Text t="h4" as="h3" className={styles.heading}>
      {children}
    </Text>
  ),
  h3: ({ children }: { children: JSX.Element[] }) => (
    <Text t="h4" as="h3" className={styles.heading}>
      {children}
    </Text>
  ),
  h4: ({ children }: { children: JSX.Element[] }) => (
    <Text t="h4" as="h3" className={styles.heading}>
      {children}
    </Text>
  ),

  normal: ({ children }: { children: JSX.Element[] }) => (
    <Text t="body2" className={styles.paragraph}>
      {children}
    </Text>
  ),

  blockquote: ({ children }: { children: JSX.Element[] }) => (
    <Text t="body2" className={styles.blockQuote}>
      {children}
    </Text>
  ),
};

const components: PortableTextComponents = {
  list: {
    bullet: ({ children, value }) => {
      return (
        <ul className={value.level === 2 ? styles.nestedUl : styles.ul}>
          {children}
        </ul>
      );
    },
    number: ({ children, value }) => {
      return (
        <ol className={value.level === 2 ? styles.nestedOl : styles.ol}>
          {children}
        </ol>
      );
    },
  },
  listItem: ({ children }) => <li className={styles.li}>{children}</li>,

  marks: {
    link: ({ children, value }) => {
      const { href } = value;
      return (
        <A className={styles.link} href={href}>
          {children}
        </A>
      );
    },
    internalLink: ({ children, value }) => {
      const { href } = value;
      return (
        <A className={styles.link} href={href}>
          {children}
        </A>
      );
    },
  },
  // this was inside of types before
  block: BlockRenderer,
  types: {
    image: ({ value }) => {
      return (
        <div className={styles.inlineImage}>
          <Image
            src={value.asset.url}
            alt="inline image"
            objectFit="contain"
            layout="responsive"
            width={value.asset.width}
            height={value.asset.height}
          />
        </div>
      );
    },
  },
};

const PortableTextRenderer: FC<PortableTextProps> = (props) => {
  return <PortableText value={props.value} components={components} />;
};

export default PortableTextRenderer;
