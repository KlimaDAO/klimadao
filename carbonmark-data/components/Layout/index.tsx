"use client";
import { i18n, Messages } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { activateLocale } from "lib/i18n";
import { ReactNode } from "react";
import { DesktopSidebar } from "./DesktopSidebar";
import { Footer } from "./Footer";
import { MobileBottomNav } from "./MobileBottomNav";
import { MobileHeader } from "./MobileHeader";
import styles from "./style.module.scss";
interface Props {
  children: ReactNode;
  locale: string;
  translation: Messages;
}
/*
The layout component that is called by app/layout.tsx for every pages
*/
const Layout = function ({ children, locale, translation }: Props) {
  // Activate translations client side
  activateLocale(locale, translation);
  return (
    <>
      <I18nProvider i18n={i18n} forceRenderOnLocaleChange={false}>
        <DesktopSidebar></DesktopSidebar>
        <MobileHeader></MobileHeader>
        <div className={styles.content}>
          <main className={styles.main}>{children}</main>
          <Footer />
          <MobileBottomNav />
        </div>
      </I18nProvider>
    </>
  );
};
export default Layout;
