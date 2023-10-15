import Layout from "components/Layout";
import { activateLocale, loadTranslation } from "lib/i18n";
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
  // Activate translations server side
  const locale = props.params.locale;
  const translation = await loadTranslation(locale);
  activateLocale(locale, translation);
  return (
    <html lang={locale}>
      <body data-theme="theme-light">
        <Layout locale={props.params.locale} translation={translation}>
          {props.children}
        </Layout>
      </body>
    </html>
  );
}
