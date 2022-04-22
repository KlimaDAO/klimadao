import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { localeExists } from "lib/i18n";

/**
 * For the HOME view in the app. On mount, validates, extracts and strips the locale params from the url and returns the value from the locale param.
 * @example https://app.klimadao.finance/#/stake?locale=fr => "fr" or https://app.klimadao.finance/#/stake?locale=not-supported-language => null
 * */
export const useLocaleFromParams = (): string | null => {
  const [params, setParams] = useSearchParams();
  const [state, setState] = useState<string | null>("");

  useEffect(() => {
    const languageParam = params.get("locale");
    const validLocale =
      (!!languageParam && localeExists(languageParam) && languageParam) || null;

    // set state to trigger re-render in parent component
    setState(validLocale);

    // remove locale query from browser URL
    if (!!languageParam) {
      params.delete("locale");
      setParams(params);
    }
  }, []);

  return state;
};
