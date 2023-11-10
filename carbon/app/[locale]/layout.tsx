import Layout from "components/Layout";
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
export default async function RootLayout(props: {
  children: React.ReactNode;
  params: { locale: string };
}) {
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

export async function initLayout(params: { locale: string }) {
  // Activate translations server side
  if (params.locale != currentLocale()) {
    const locale = params.locale;
    const translation = await loadTranslation(params.locale);
    activateLocale(locale, translation);
  }
}
