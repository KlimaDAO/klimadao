import { Messages } from "@lingui/core";
import { activateLocale } from "lib/i18n";
import { ReactNode } from "react";
import { DesktopSidebar } from "./DesktopSidebar";
import { Footer } from "./Footer";
import LayoutClientWrapper from "./LayoutClientWrapper";
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
const Layout = function (props: Props) {
  // Activate translations client side
  activateLocale(props.locale, props.translation);
  return (
    <LayoutClientWrapper locale={props.locale} translation={props.translation}>
      <div className={styles.desktopLayout}>
        <DesktopSidebar></DesktopSidebar>
        <MobileHeader></MobileHeader>
        <div className={styles.content}>
          <main className={styles.main}>{props.children}</main>
          <Footer />
          <MobileBottomNav />
        </div>
      </div>
    </LayoutClientWrapper>
  );
};
export default Layout;
