import { useEffect, useState } from "react";

export const useCopyToClipboard = (
  timeOut = 3000
): [boolean, (stringToCopy: string) => void] => {
  const [copied, setCopied] = useState(false);

  const doCopy = async (stringToCopy: string) => {
    await navigator.clipboard.writeText(stringToCopy);
    setCopied(true);
  };

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false);
      }, timeOut);
      return () => {
        !!timer && clearTimeout(timer);
      };
    }
  }, [copied]);

  return [copied, doCopy];
};
