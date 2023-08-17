"use client";
import { i18n, Messages } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { activateLocale } from "lib/i18n";
import { ReactNode } from "react";
import { DesktopSidebar } from "./DesktopSidebar";
import { Footer } from "./Footer";
import { MobileBottomNav } from "./MobileBottomNav";
import { MobileHeader } from "./MobileHeader";
import * as styles from "./styles";
interface Props {
  children: ReactNode;
  locale: string;
  translation: Messages;
}

const Layout = function ({ children, locale, translation }: Props) {
  activateLocale(locale, translation);
  return (
    <>
      <I18nProvider i18n={i18n} forceRenderOnLocaleChange={false}>
        <DesktopSidebar></DesktopSidebar>
        <MobileHeader></MobileHeader>
        <div className={styles.content}>
          {children}

          <Footer />
        </div>

        <MobileBottomNav></MobileBottomNav>
      </I18nProvider>
    </>
  );
};
export default Layout;
