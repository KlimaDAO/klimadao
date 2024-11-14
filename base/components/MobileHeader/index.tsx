import LanguageIcon from "@mui/icons-material/Language";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Box, IconButton, Toolbar, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import { FC } from "react";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  position: "fixed",
  boxShadow: "none",
  borderBottom: `1px solid ${theme.palette.background.paper}`,
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  px: 2,
  minHeight: "6.4rem",
  justifyContent: "space-between",
  backgroundColor: theme.palette.background.default,
}));

const LogoContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "0.8rem",
  flex: 1,
});

const KlimaLogo = styled("img")({
  height: "2rem",
});

const OnBaseText = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "0.8rem",
  color: theme.palette.text.secondary,
  ...theme.typography.body1,
}));

interface MobileHeaderProps {
  onMenuClick: () => void;
}

export const MobileHeader: FC<MobileHeaderProps> = ({ onMenuClick }) => {
  const theme = useTheme();
  return (
    <StyledAppBar position="sticky">
      <StyledToolbar>
        <LogoContainer>
          <KlimaLogo src="/klimadao.svg" alt="KlimaDAO" />
          <OnBaseText>
            on
            <img src="/base-logo.svg" alt="BASE" />
          </OnBaseText>
        </LogoContainer>
        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton color="inherit" aria-label="language">
            <LanguageIcon
              sx={{
                width: "2.4rem",
                height: "2.4rem",
                color: theme.palette.text.primary,
              }}
            />
          </IconButton>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={onMenuClick}
          >
            <MenuIcon
              sx={{
                width: "2.4rem",
                height: "2.4rem",
                color: theme.palette.text.primary,
              }}
            />
          </IconButton>
        </Box>
      </StyledToolbar>
    </StyledAppBar>
  );
};
