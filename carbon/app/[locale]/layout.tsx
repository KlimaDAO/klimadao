import Layout from "components/Layout";
import {
  LocalizedPageParams,
  LocalizedPageProps,
} from "components/pages/props";
import {
  activateLocale,
  currentLocale,
  currentTranslation,
  loadTranslation,
} from "lib/i18n";
import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Carbon Dashboard",
  description: "Carbon Dashboard",
};
export default async function RootLayout(
  props: LocalizedPageProps & { children: React.ReactNode }
) {
  return (
    <html lang={props.params.locale}>
      <body data-theme="theme-light">
        <Layout locale={props.params.locale} translation={currentTranslation()}>
          {props.children}
        </Layout>
      </body>
    </html>
  );
}

export async function initLayout(params: LocalizedPageParams) {
  // Activate translations server side
  if (params.locale != currentLocale()) {
    const locale = params.locale;
    const translation = await loadTranslation(params.locale);
    activateLocale(locale, translation);
  }
}
