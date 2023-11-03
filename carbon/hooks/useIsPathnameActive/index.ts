import { NavItem } from "components/Layout/NavItems";
import { currentLocale } from "lib/i18n";
import { usePathname } from "next/navigation";

export const useIsPathnameActive = (navItem: NavItem): boolean => {
  const pathname = usePathname();
  const localePrefix = `/${currentLocale()}`;
  const pathnameWithoutLocale =
    (pathname.startsWith(localePrefix)
      ? pathname.slice(localePrefix.length)
      : pathname) || "/";
  const active =
    navItem.url == pathnameWithoutLocale ||
    (!!navItem.path && pathnameWithoutLocale.startsWith(navItem.path));

  return active;
};
