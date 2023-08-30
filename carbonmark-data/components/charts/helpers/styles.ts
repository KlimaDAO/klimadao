import { css } from "@emotion/css";

export const chartLegendText = css`
  color: var(--text-color-01);
  font-size: 12px;
`;

export const tooltip = css`
  background-color: var(--surface-04);
  border: 1px solid var(--surface-03);
  border-radius: 15px;
  padding: 10px;
  text-align: center;
  font-size: 12px;
  box-shadow: var(--box-shadow);
  opacity: 0.9;
`;

export const tooltipItems = css`
  display: flex;
  justify-content: center;
  font-size: 12px;
  > div {
    padding: 10px;
  }
`;
