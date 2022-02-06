import { FC } from "react";
import { ThemeToggle } from "@klimadao/lib/components";

// To prevent loading errors need to wrap external ESM again
// as it is loaded dynamically later in Navigation
// https://github.com/vercel/next.js/issues/25454#issuecomment-862571514

const ThemeToggleExport: FC = () => <ThemeToggle />;
export default ThemeToggleExport;
