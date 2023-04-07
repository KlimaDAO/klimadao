import { Anchor as A } from "@klimadao/lib/components";
import {
  PortableText,
  PortableTextComponents,
  PortableTextProps,
} from "@portabletext/react";
import { Text } from "components/Text";
import Image from "next/legacy/image";
import { FC } from "react";
import * as styles from "./styles";

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
  listItem: ({ children }) => <li>{children}</li>,

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

  block: {
    h1: ({ children }) => (
      <Text t="h3" as="h2" color="lighter" className={styles.heading}>
        {children}
      </Text>
    ),
    h2: ({ children }) => (
      <Text t="h4" as="h3" color="lighter" className={styles.heading}>
        {children}
      </Text>
    ),
    h3: ({ children }) => (
      <Text t="h4" as="h3" color="lighter" className={styles.heading}>
        {children}
      </Text>
    ),
    h4: ({ children }) => (
      <Text t="h4" as="h3" color="lighter" className={styles.heading}>
        {children}
      </Text>
    ),

    normal: ({ children }) => (
      <Text t="body5" className={styles.paragraph}>
        {children}
      </Text>
    ),

    blockquote: ({ children }) => (
      <Text t="body2" className={styles.blockQuote}>
        {children}
      </Text>
    ),
  },

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
