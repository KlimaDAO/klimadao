import { HelpOutline } from "@mui/icons-material";
import { IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import { FC, useState } from "react";
import { StyledTooltip } from "./styles";

export const TOOLTIPS = {
  depositLiquidity:
    "You can use Aerodrome to deposit liquidity into a pool and use those LPs for this transaction.",
  apy: "Annual Percentage Yield (APY) includes compound interest, showing total returns over one year",
  apr: "Annual Percentage Rate (APR) shows the simple interest rate without compounding",
  vault: "Smart contract that holds your LP tokens",
  strategy: "Smart contract that automates the compounding strategy",
  balance: "Total staked amount + total yield accrued in AERO LP token.",
  vaultTokens:
    "Your share of the total vault which is proportional (not equal) to the AERO LP tokens staked.",
};

const tooltipSlotProps = {
  popper: {
    className: "custom-popper",
    modifiers: [
      {
        name: "offset",
        options: { offset: [0, -20] },
      },
    ],
  },
};

type TooltipProps = {
  tooltipText: string;
};

export const CustomTooltip: FC<TooltipProps> = ({ tooltipText }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [tooltipOpen, setTooltipOpen] = useState(false);

  return (
    <StyledTooltip
      arrow
      placement="top"
      enterDelay={100}
      enterTouchDelay={0}
      open={isMobile ? tooltipOpen : undefined}
      onClose={() => setTooltipOpen(false)}
      slotProps={isMobile ? tooltipSlotProps : {}}
      title={<Typography>{tooltipText}</Typography>}
    >
      <IconButton
        size="small"
        sx={{ color: "#9C9C9C", padding: 0 }}
        onClick={() => setTooltipOpen(true)}
      >
        <HelpOutline fontSize="medium" />
      </IconButton>
    </StyledTooltip>
  );
};
