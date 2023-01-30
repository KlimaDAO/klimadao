import { ThemeToggle } from "@klimadao/lib/components";
import { FC } from "react";

// To prevent loading errors need to wrap external ESM again
// as it is loaded dynamically later in Navigation
// https://github.com/vercel/next.js/issues/25454#issuecomment-862571514

interface Props {
  className?: string;
}

const ThemeToggleExport: FC<Props> = (props) => (
  <ThemeToggle className={props.className} />
);

export default ThemeToggleExport;
