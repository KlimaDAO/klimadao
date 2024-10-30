import { Autorenew, Forest as ForestIcon } from "@mui/icons-material";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  Theme,
  styled,
} from "@mui/material";
import { useRouter } from "next/router";
import {
  BaseLogoContainer,
  LogoBox,
  LogoContainer,
  NavigationContainer,
} from "./styles";

// New styled components for the enhanced list items
const StyledListItem = styled(Box)<{ active: number }>(({ theme, active }) => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
  borderRadius: "8px",
  cursor: "pointer",
  transition: "all 0.3s ease",
  padding: theme.spacing(1, 2),
  backgroundColor: active ? theme.palette.primary.main : "transparent",
  "&:hover": {
    backgroundColor: active
      ? theme.palette.success.dark
      : theme.palette.action.hover,
  },
}));

const LogoWrapper = styled(Box)<{ active: number }>(({ theme, active }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 40,
  height: 40,
  borderRadius: "8px",
  backgroundColor: active
    ? theme.palette.common.white
    : theme.palette.grey[800],
  marginRight: theme.spacing(2),
  "& svg": {
    color: active ? theme.palette.primary.main : theme.palette.grey[400],
  },
  transition: "all 0.3s ease",
}));

const ListItemText = styled(Box)<{ active: number }>(({ theme, active }) => ({
  color: active ? theme.palette.text.primary : theme.palette.text.secondary,
  fontWeight: active ? 600 : 400,
  fontSize: "14px",
}));

interface SidebarProps {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}

const isRouteActive = (menuPath: string, currentPath: string): boolean => {
  // Root route needs exact match
  if (menuPath === "/") {
    return currentPath === "/";
  }

  // Other routes can match their paths and nested routes
  return currentPath.startsWith(menuPath);
};

const menuItems = [
  {
    text: "Retire",
    icon: <ForestIcon />,
    path: "/",
  },
  {
    text: "Auto Compounder",
    icon: <Autorenew />,
    path: "/auto-compounder",
  },
];

const CustomListItem = ({
  text,
  icon,
  path,
  currentPath,
}: {
  text: string;
  icon: React.ReactNode;
  path: string;
  currentPath: string;
}) => {
  const isActive = isRouteActive(path, currentPath);

  return (
    <StyledListItem active={isActive ? 1 : 0}>
      <LogoWrapper active={isActive ? 1 : 0}>{icon}</LogoWrapper>
      <ListItemText active={isActive ? 1 : 0}>{text}</ListItemText>
    </StyledListItem>
  );
};

interface SidebarProps {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}

const DRAWER_WIDTH = 280;

export const Sidebar = ({ mobileOpen, handleDrawerToggle }: SidebarProps) => {
  const router = useRouter();

  const drawer = (
    <>
      <LogoContainer>
        <LogoBox>
          <img src="/klimadao.svg" alt="KLIMADAO" height={30} />
        </LogoBox>
        <BaseLogoContainer>
          <span>on</span>
          <img src="/base-logo.svg" alt="BASE" />
        </BaseLogoContainer>
      </LogoContainer>

      <Box px={4}>
        <Divider />
      </Box>

      <NavigationContainer>
        <List>
          {menuItems.map((item) => (
            <ListItem
              key={item.text}
              onClick={() => router.push(item.path)}
              disableGutters
            >
              <CustomListItem
                text={item.text}
                icon={item.icon}
                path={item.path}
                currentPath={router.pathname}
              />
            </ListItem>
          ))}
        </List>
      </NavigationContainer>
    </>
  );

  return (
    <Box
      component="nav"
      sx={{
        width: { sm: DRAWER_WIDTH },
        flexShrink: { sm: 0 },
      }}
    >
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            backgroundColor: (theme: Theme) => theme.palette.background.default,
            boxSizing: "border-box",
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Desktop drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            backgroundColor: (theme: Theme) => theme.palette.background.default,
            boxSizing: "border-box",
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};
