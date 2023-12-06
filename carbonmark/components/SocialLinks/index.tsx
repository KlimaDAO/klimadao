import { CopyValueButton } from "@klimadao/lib/components";
import { FacebookButton } from "components/FacebookButton";
import { LinkedInButton } from "components/LinkedInButton";
import { TweetButton } from "components/TweetButton";
import { FC } from "react";
import * as styles from "./styles";

type Props = {
  twitterTitle: string;
  twitterTags: string[];
};

export const SocialLinks: FC<Props> = (props) => {
  return (
    <div className={styles.socialLinks}>
      <div className="buttons">
        <TweetButton title={props.twitterTitle} tags={props.twitterTags} />
        <FacebookButton />
        <LinkedInButton />
        <CopyValueButton />
      </div>
    </div>
  );
};
