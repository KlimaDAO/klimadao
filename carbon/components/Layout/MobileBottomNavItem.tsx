import { currentLocale } from "lib/i18n";
import { usePathname } from "next/navigation";
import { FC } from "react";
import { NavItem } from "./NavItems";
import styles from "./style.module.scss";

interface Props {
  navItem: NavItem;
  key?: string;
}

export const MobileBottomNavItem: FC<Props> = ({ navItem }) => {
  const pathname = usePathname();
  const locale = `/${currentLocale()}`;
  const pathnameWithoutLocale = pathname.startsWith(locale)
    ? pathname.slice(locale.length)
    : pathname;
  const active = navItem.url == (pathnameWithoutLocale || "/");

  return (
    <a
      aria-describedby="button"
      className={styles.mobileBottomNavItem}
      aria-selected={active}
      href={navItem.url}
    >
      {navItem.icon}
    </a>
  );
};
