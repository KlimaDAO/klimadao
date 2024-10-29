import { createTheme } from "@mui/material";

export const AppTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#00CC33", // Brand Colors/Klima Green
    },
    background: {
      default: "#202020", // surface-02
      paper: "#303030", // surface-03
    },
    text: {
      primary: "#FFFFFF", // font-01 darkmode
      secondary: "#9C9C9C", // font-03 darkmode
    },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          width: "244px",
          backgroundColor: "#202020",
          border: "none",
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          height: "48px",
          borderRadius: "8px",
          backgroundColor: "#303030",
          "&.Mui-selected": {
            backgroundColor: "#303030",
            "& .MuiListItemIcon-root": {
              backgroundColor: "#00CC33",
            },
            "& .MuiListItemText-primary": {
              color: "#FFFFFF",
            },
          },
          "&:hover": {
            backgroundColor: "#303030",
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          width: "32px",
          height: "32px",
          minWidth: "32px",
          borderRadius: "6px",
          backgroundColor: "#303030",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0px 0px 12px rgba(0, 0, 0, 0.08)",
          marginRight: "12px",
          "& svg": {
            width: "20px",
            height: "20px",
            color: "#FFFFFF",
          },
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: "14px",
          fontWeight: 500,
          lineHeight: "24px",
          color: "#9C9C9C",
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: "#303030",
        },
      },
    },
  },
});
