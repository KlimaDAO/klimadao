import { currentLocale } from "lib/i18n";
import { usePathname } from "next/navigation";
import { FC } from "react";
import { NavItem } from "./NavItems";
import styles from "./style.module.scss";

interface Props {
  navItem: NavItem;
  key?: string;
}

export const DesktopSidebarItem: FC<Props> = ({ navItem }) => {
  const pathname = usePathname();
  const locale = currentLocale();
  const pathnameWithoutLocale = pathname.slice(`/${locale}`.length) || "/";
  const active = pathnameWithoutLocale == navItem.url;

  return (
    <a
      className={styles.desktopSidebarItem}
      href={navItem.url}
      aria-selected={active}
    >
      <span className={styles.desktopSidebarIcon}>{navItem.icon}</span>
      {navItem.label}
    </a>
  );
};
