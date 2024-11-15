import { Box, styled } from "@mui/material";

export const MobileItemWrapper = styled(Box)(({ theme }) => ({
  gap: "12px 0px",
  display: "flex",
  flexDirection: "column",
  borderBottom: `1px solid ${theme.palette.divider}`,
  width: "100%",
  paddingBottom: "12px",
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
  width: "324px",
  height: "40px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "4px",
  border: `1px solid ${theme.palette.primary.main}`,
  borderRadius: "4px",
  cursor: "pointer",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));
