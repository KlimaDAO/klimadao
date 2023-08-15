import { css } from "@emotion/css";

export const chartRow = css`
  min-height: 284px;
`;
export const chartContainer = css`
  box-shadow: 0px 1px 3px 0px #0000001f;
  min-height: 284px;
  height: 284px;
  background-color: var(--surface-04);
  padding: 12px;
  display: flex;
  flex-flow: column;
  h3 {
    margin-bottom: 24px;
  }
  div {
    flex: 1 1 auto;
  }
`;
export const chartLegendText = css`
  color: var(--text-color-01);
`;
