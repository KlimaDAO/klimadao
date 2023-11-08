"use client";
import { i18n, Messages } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import ThemeRegistry from "app/[locale]/registry";
import { activateLocale } from "lib/i18n";
import { ReactNode } from "react";
interface Props {
  children: ReactNode;
  locale: string;
  translation: Messages;
}
/*
The layout component that is called by app/layout.tsx for every pages
*/
export default function LayoutClientWrapper(props: Props) {
  // Activate translations client side
  activateLocale(props.locale, props.translation);
  return (
    <ThemeRegistry options={{ prepend: true, key: "css" }}>
      <I18nProvider i18n={i18n} forceRenderOnLocaleChange={false}>
        {props.children}
      </I18nProvider>
    </ThemeRegistry>
  );
}
