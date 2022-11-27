import { ButtonPrimary, FacebookIcon } from "@klimadao/lib/components";
import { FC, useEffect, useState } from "react";
import * as styles from "./styles";

export const FACEBOOK_SHARE_URL = "https://www.facebook.com/sharer/sharer.php";

type FacebookHref = {
  url: string;
};

// https://www.facebook.com/sharer/sharer.php?u=https://www.klimadao.finance
export const getFacebookHref = ({ url }: FacebookHref) => {
  const shareUrl = new URL(FACEBOOK_SHARE_URL);
  const search = new URLSearchParams({
    u: url,
  }).toString();

  // combine URL with search params
  shareUrl.search = search;
  return shareUrl.href;
};

type Props = {
  url?: string;
};

export const FacebookButton: FC<Props> = ({ url }) => {
  const [shareURL, setShareUrl] = useState<string>();

  // get parameters on the client because
  // url can be undefined and window is undefined on server
  useEffect(() => {
    setShareUrl(
      getFacebookHref({
        url: url || window.location.href,
      })
    );
  }, []);

  return (
    <ButtonPrimary
      className={styles.facebookButton}
      href={shareURL}
      target="_blank"
      disabled={!shareURL}
      label={
        <>
          <FacebookIcon />
          Facebook
        </>
      }
      variant="gray"
    />
  );
};
