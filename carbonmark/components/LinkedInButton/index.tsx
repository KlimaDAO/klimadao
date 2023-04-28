import {
  ButtonBaseProps,
  ButtonPrimary,
  LinkedInIcon,
} from "@klimadao/lib/components";
import { FC, useEffect, useState } from "react";
import * as styles from "./styles";

export const FACEBOOK_SHARE_URL =
  "https://www.linkedin.com/sharing/share-offsite/?url={url}";

type LinkedInHref = {
  url: string;
};

// https://www.linkedin.com/sharing/share-offsite/?url=https://www.klimadao.finance/
export const getLinkedInHref = ({ url }: LinkedInHref) => {
  const shareUrl = new URL(FACEBOOK_SHARE_URL);
  const search = new URLSearchParams({
    url: url,
  }).toString();

  // combine URL with search params
  shareUrl.search = search;
  return shareUrl.href;
};

type Props = {
  url?: string;
} & Omit<ButtonBaseProps, "label">;

export const LinkedInButton: FC<Props> = ({ url, ...baseProps }) => {
  const [shareURL, setShareUrl] = useState<string>();

  // get parameters on the client because
  // url can be undefined and window is undefined on server
  useEffect(() => {
    setShareUrl(
      getLinkedInHref({
        url: url || window.location.href,
      })
    );
  }, []);

  return (
    <ButtonPrimary
      className={styles.linkedInButton}
      href={shareURL}
      target="_blank"
      disabled={!shareURL}
      icon={<LinkedInIcon />}
      variant="lightGray"
      shape="circle"
      {...baseProps}
    />
  );
};
