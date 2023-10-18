import { currentLocale } from "lib/i18n";
import { usePathname } from "next/navigation";

export const useIsPathnameActive = (targetPathname: string): boolean => {
  const pathname = usePathname();
  const localePrefix = `/${currentLocale()}`;
  const pathnameWithoutLocale = pathname.startsWith(localePrefix)
    ? pathname.slice(localePrefix.length)
    : pathname;
  const active = targetPathname == (pathnameWithoutLocale || "/");

  return active;
};
