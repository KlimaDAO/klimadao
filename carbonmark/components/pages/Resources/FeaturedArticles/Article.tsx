import { Trans } from "@lingui/macro";
import { Text } from "components/Text";
import { FeaturedPost } from "lib/cms/queries";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import defaultImage from "public/cover-default.png";
import { FC } from "react";
import * as styles from "./styles";

type Props = {
  article: FeaturedPost;
};

export const Article: FC<Props> = (props) => {
  const { locale } = useRouter();

  const formattedDate = new Date(props.article.publishedAt).toLocaleDateString(
    locale
  );

  return (
    <div className={styles.article}>
      <Image
        alt={`${props.article.title} Image`}
        src={props.article.imageUrl || defaultImage}
        fill={true}
        style={{
          objectFit: "cover",
        }}
      />
      <div className="stack">
        <div className={styles.stackContent}>
          <Text t="body1" className={styles.articleText}>
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
              <Trans>Read more</Trans>
            </Link>
          </Text>
        </div>
      </div>
    </div>
  );
};
