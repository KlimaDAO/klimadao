import { Box, styled } from "@mui/material";

export const MobileItemWrapper = styled(Box)(({ theme }) => ({
  gap: "1.2rem 0",
  display: "flex",
  flexDirection: "column",
  borderBottom: `0.1rem solid ${theme.palette.divider}`,
  width: "100%",
  paddingBottom: "1.2rem",
}));

export const RowContainer = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
});

export const DataPairContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
});

export const StakeButton = styled(Box)(({ theme }) => ({
  width: "32.4rem",
  height: "4rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.4rem",
  border: `0.1rem solid ${theme.palette.primary.main}`,
  borderRadius: "0.4rem",
  cursor: "pointer",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));
