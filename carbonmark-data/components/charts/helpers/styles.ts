import { css } from "@emotion/css";

export const chartLegendText = css`
  color: var(--text-color-01);
`;

export const tooltip = css`
  background-color: var(--surface-04);
  border: 1px solid var(--surface-03);
  border-radius: 15px;
  padding: 10px;
  text-align: center;
  box-shadow: var(--box-shadow);
  opacity: 0.9;
`;

export const tooltipItems = css`
  display: flex;
  justify-content: center;
  > div {
    padding: 10px;
  }
`;
