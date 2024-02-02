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
/**
 * Displays links to share the current URL on X, Facebook, Linkedin, and a button to copy the current URL
 * @param props
 * @returns
 */
export const SocialLinks: FC<Props> = (props) => {
  return (
    <div className={styles.socialLinks}>
      <div className="buttons">
        <TweetButton title={props.twitterTitle} tags={props.twitterTags} />
        <FacebookButton />
        <LinkedInButton />
        <CopyValueButton rounded={true} />
      </div>
    </div>
  );
};
