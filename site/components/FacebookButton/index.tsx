import { FC, useState, useEffect } from "react";
import { ButtonPrimary, FacebookIcon } from "@klimadao/lib/components";
import * as styles from "./styles";

export const FACEBOOK_SHARE_URL = "https://www.facebook.com/sharer/sharer.php";

type FacebookHref = {
  url: string;
  title?: string;
};

// https://www.facebook.com/sharer/sharer.php?u=https://www.klimadao.finance/&quote=Awesome%20Text!
export const getFacebookHref = ({ url, title }: FacebookHref) => {
  const shareUrl = new URL(FACEBOOK_SHARE_URL);
  const search = new URLSearchParams({
    u: url,
    ...(title ? { quote: title } : {}),
  }).toString();

  // combine URL with search params
  shareUrl.search = search;
  return shareUrl.href;
};

type Props = {
  title?: string;
  url?: string;
};

export const FacebookButton: FC<Props> = ({ title, url }) => {
  const [shareURL, setShareUrl] = useState<string>();

  // get parameters on the client because
  // url can be undefined and window is undefined on server
  useEffect(() => {
    setShareUrl(
      getFacebookHref({
        title,
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
