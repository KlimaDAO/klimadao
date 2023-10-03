"use client";
import NextIntlLink from "next-intl/link";
import { ComponentProps, forwardRef } from "react";

/**
 * A client component to render localized links in server components
 * To be removed when it is supported in production by next-intl: https://next-intl-docs.vercel.app/docs/getting-started/app-router-server-components
 */

type Props = Omit<ComponentProps<typeof NextIntlLink>, "locale"> & {
  locale?: string;
};

function Link({ locale, ...rest }: Props, ref: Props["ref"]) {
  return <NextIntlLink ref={ref} locale={locale} {...rest} />;
}

export default forwardRef(Link);
