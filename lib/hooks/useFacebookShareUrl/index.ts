import { useEffect, useState } from "react";

export const FACEBOOK_SHARE_URL = "https://www.facebook.com/sharer/sharer.php";

type FacebookHref = {
  url: string;
};

// https://www.facebook.com/sharer/sharer.php?u=https://www.klimadao.finance
const getFacebookHref = ({ url }: FacebookHref) => {
  const shareUrl = new URL(FACEBOOK_SHARE_URL);
  const search = new URLSearchParams({
    u: url,
  }).toString();

  // combine URL with search params
  shareUrl.search = search;
  return shareUrl.href;
};

/** Get a facebook share url for the current or provided url  */
export const useFacebookShareUrl = (url?: string) => {
  const [shareURL, setShareUrl] = useState<string>();

  // get parameters on the client because
  // url can be undefined and window is undefined on server
  useEffect(() => {
    setShareUrl(
      getFacebookHref({
        url: url ?? window.location.href,
      })
    );
  }, []);

  return shareURL;
};
