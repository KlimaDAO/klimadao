import { Box, Typography } from "@mui/material";
import { Theme, styled } from "@mui/material/styles";
import { Connect } from "components/Connect";

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

export const LinksContainer = styled(Box)({
  gap: "4rem",
  display: "flex",
  flexDirection: "column",
  p: "3rem 0",
});

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

export const StyledListItem = styled(Box)<{ active: number }>(
  ({ theme, active }) => ({
    width: "100%",
    display: "flex",
    alignItems: "center",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    padding: theme.spacing(1),
    backgroundColor: active ? theme.palette.grey[800] : "transparent",
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
  })
);

export const LogoWrapper = styled(Box)<{ active: number }>(
  ({ theme, active }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 32,
    height: 32,
    borderRadius: "8px",
    backgroundColor: active
      ? theme.palette.primary.main
      : theme.palette.grey[800],

    marginRight: theme.spacing(2),

    "& svg": {
      color: active ? theme.palette.text.primary : theme.palette.grey[400],
    },

    transition: "all 0.3s ease",
  })
);

export const ListItemText = styled(Box)<{ active: number }>(
  ({ theme, active }) => ({
    color: active ? theme.palette.text.primary : theme.palette.text.secondary,
    fontWeight: active ? 500 : 400,
  })
);

export const ConnectButton = styled(Connect)({
  width: "100%",
});
