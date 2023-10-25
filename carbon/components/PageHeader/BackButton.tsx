"use client";

import { KeyboardArrowLeft } from "@mui/icons-material";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <span onClick={() => router.back()} role="button">
      <KeyboardArrowLeft />
    </span>
  );
}
