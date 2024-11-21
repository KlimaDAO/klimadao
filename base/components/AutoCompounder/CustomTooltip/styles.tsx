import { styled, Tooltip, tooltipClasses, TooltipProps } from "@mui/material";

export const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: "#64748B",
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#64748B",
  },
}));
