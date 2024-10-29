// src/styles/Sidebar.styles.ts
import { Box, ListItem, Typography } from "@mui/material";
import { Theme, styled } from "@mui/material/styles";

export const LogoContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "32px",
  width: "100%",
}));

export const LogoBox = styled(Box)(() => ({
  height: "30px",
  marginBottom: "12px",
  display: "flex",
  alignItems: "center",
}));

export const BaseLogoContainer = styled(Box)(({ theme }: { theme: Theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "11px",
  color: theme.palette.text.secondary,
  ...theme.typography.body1,
}));

export const WalletContainer = styled(Box)({
  padding: "0 32px",
  width: "100%",
});

export const WalletInfo = styled(Box)({
  padding: "14px 0",
});

export const WalletTypography = styled(Typography)(
  ({ theme }: { theme: Theme }) => ({
    ...theme.typography.subtitle1,
  })
);

export const NavigationContainer = styled(Box)({
  padding: "12px 32px",
  width: "100%",
});

export const StyledListItem = styled(ListItem)({
  padding: 0,
  marginBottom: "16px",
  "&:last-child": {
    marginBottom: 0,
  },
});
