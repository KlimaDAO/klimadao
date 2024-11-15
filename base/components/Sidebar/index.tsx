import { Autorenew, Forest as ForestIcon } from "@mui/icons-material";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  Theme,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { FC } from "react";
import {
  BaseLogoContainer,
  ConnectButton,
  ListItemText,
  LogoBox,
  LogoContainer,
  LogoWrapper,
  NavigationContainer,
  StyledListItem,
} from "./styles";

interface SidebarProps {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}

type ListItem = {
  text: string;
  path: string;
  currentPath: string;
  icon: React.ReactNode;
};

const DRAWER_WIDTH = 280;

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

const isRouteActive = (menuPath: string, currentPath: string): boolean => {
  if (menuPath === "/") {
    return currentPath === "/";
  }
  return currentPath.startsWith(menuPath);
};

const CustomListItem: FC<ListItem> = (props) => {
  const isActive = isRouteActive(props.path, props.currentPath);
  return (
    <StyledListItem active={isActive ? 1 : 0}>
      <LogoWrapper active={isActive ? 1 : 0}>{props.icon}</LogoWrapper>
      <ListItemText active={isActive ? 1 : 0}>{props.text}</ListItemText>
    </StyledListItem>
  );
};

export const Sidebar: FC<SidebarProps> = (props) => {
  const router = useRouter();
  const drawer = (
    <>
      <LogoContainer>
        <LogoBox>
          <img src="/klimadao.svg" alt="KLIMADAO" height={30} />
        </LogoBox>
        <BaseLogoContainer>
          <Typography fontSize="1.4rem" fontWeight={500}>
            on
          </Typography>
          <img src="/base-logo.svg" alt="BASE" />
        </BaseLogoContainer>
      </LogoContainer>
      <Box px={4} py={2}>
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
        {props.mobileOpen ? <ConnectButton /> : null}
      </NavigationContainer>
      <Box px={4} py={3}>
        <Divider />
      </Box>
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
      <Drawer
        variant="temporary"
        open={props.mobileOpen}
        onClose={props.handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            background: (theme: Theme) => theme.palette.background.default,
            boxSizing: "border-box",
          },
        }}
      >
        {drawer}
      </Drawer>
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
