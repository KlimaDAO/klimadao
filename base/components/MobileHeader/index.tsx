import LanguageIcon from "@mui/icons-material/Language";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Box, IconButton, Toolbar, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  boxShadow: "none",
  borderBottom: `1px solid ${theme.palette.background.paper}`,
}));

const LogoContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  flex: 1,
});

const KlimaLogo = styled("img")({
  height: "24px",
});

const OnBaseText = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  color: theme.palette.text.secondary,
  ...theme.typography.body1,
}));

interface MobileHeaderProps {
  onMenuClick: () => void;
}

export const MobileHeader = ({ onMenuClick }: MobileHeaderProps) => {
  const theme = useTheme();

  return (
    <StyledAppBar position="fixed">
      <Toolbar sx={{ justifyContent: "space-between", px: 2 }}>
        <LogoContainer>
          <KlimaLogo src="/klimadao.svg" alt="KlimaDAO" />
          <OnBaseText>
            on
            <img src="/base-logo.svg" alt="BASE" />
          </OnBaseText>
        </LogoContainer>
        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton color="inherit" aria-label="language">
            <LanguageIcon sx={{ color: theme.palette.text.primary }} />
          </IconButton>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={onMenuClick}
          >
            <MenuIcon sx={{ color: theme.palette.text.primary }} />
          </IconButton>
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
};
