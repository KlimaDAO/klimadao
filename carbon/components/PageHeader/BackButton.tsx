"use client";

import { KeyboardArrowLeft } from "@mui/icons-material";
import Link from "components/Link";
import { FC } from "react";

export const BackButton: FC<{ href: string }> = ({ href }) => {
  return (
    <Link href={href} role="button">
      <KeyboardArrowLeft />
    </Link>
  );
};
