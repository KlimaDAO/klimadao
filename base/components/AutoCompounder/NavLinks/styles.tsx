import { Anchor } from "@klimadao/lib/components";
import { styled } from "@mui/material";

export const StyledNavLinks = styled(Anchor)(({ theme }) => ({
  gap: "4rem",
  display: "flex",
  alignItems: "center",
  flexDirection: "row",

  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

export const StyledAnchor = styled(Anchor)(() => ({
  alignItems: "center",
  textTransform: "uppercase",
  textDecoration: "underline",
  fontWeight: 600,
  fontSize: "1.4rem",
  lineHeight: "1.6rem",
  letterSpacing: "0.06rem",
}));
