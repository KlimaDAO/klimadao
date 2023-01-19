import { initLocale } from "lib/i18n";
import { FC, ReactNode, useEffect } from "react";
import { useAppDispatch } from "state";

import { setAppState } from "state/app";

interface Props {
  children: ReactNode;
}
/* Gives limited localization capabilities to a page
 + Does not need a router
 - Does not support localeFromParams
*/
export const WithSimpleLocalization: FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    initLocale(null).then((init_locale: string) => {
      dispatch(setAppState({ locale: init_locale }));
    });
  });
  return <>{props.children}</>;
};
