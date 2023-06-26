import { Text } from "components/Text";
import { PostDetails } from "lib/cms/queries";
import Image from "next/legacy/image";
import Link from "next/link";
import { useRouter } from "next/router";
import defaultImage from "public/cover-default.png";
import * as styles from "./styles";

interface BlogPostCardProps {
  post: PostDetails;
}

export const BlogPostCard = (props: BlogPostCardProps) => {
  const { locale } = useRouter();

  const publishedDate = new Date(props.post.publishedAt);

  const formattedDate = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(publishedDate);

  return (
    <Link href={`/blog/${props.post.slug}`} className={styles.card}>
      <div className="content">
        <Text t="h5" className="date">
          {formattedDate}
        </Text>
        <Text t="h5" className="title" color="lighter">
          {props.post.title}
        </Text>
        <Text t="body1" className="summary">
          {props.post.summary}
        </Text>
        <Text t="button" color="lightest" style={{ marginTop: "auto" }}>
          Read more
        </Text>
      </div>
      <div className="image">
        <Image
          src={props.post.imageUrl || defaultImage}
          alt={props.post.title}
          objectFit="cover"
          layout="fill"
        />
      </div>
    </Link>
  );
};
