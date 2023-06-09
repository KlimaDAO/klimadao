import {
  ButtonBaseProps,
  ButtonPrimary,
  TwitterIcon,
} from "@klimadao/lib/components";
import { FC, useEffect, useState } from "react";
import * as styles from "./styles";

export const TWITTER_INTENT_URL = "https://twitter.com/intent/tweet";
const TWITTER_HANDLE = "carbonmarkcom";

type TwitterHref = {
  title: string;
  url: string;
  tags: string[];
};

export const getTwitterHref = ({ url, title, tags }: TwitterHref) => {
  const shareUrl = new URL(TWITTER_INTENT_URL);
  const search = new URLSearchParams({
    url,
    text: title,
    hashtags: tags.join(","),
    via: TWITTER_HANDLE,
  }).toString();
  // combine URL with search params
  shareUrl.search = search;
  return shareUrl.href;
};

type Props = {
  title: string;
  url?: string;
  tags: string[];
} & Omit<ButtonBaseProps, "label">;

export const TweetButton: FC<Props> = ({ title, url, tags, ...props }) => {
  const [shareURL, setShareUrl] = useState<string>();

  // get parameters on the client because
  // url can be undefined and window is undefined on server
  useEffect(() => {
    const getShareUrl = getTwitterHref({
      title,
      url: url || window.location.href,
      tags,
    });
    setShareUrl(getShareUrl);
  }, []);

  return (
    <ButtonPrimary
      className={styles.tweetButton}
      href={shareURL}
      target="_blank"
      disabled={!shareURL}
      icon={<TwitterIcon />}
      shape="circle"
      {...props}
    />
  );
};
