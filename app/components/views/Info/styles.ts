import { css } from "@emotion/css";

import { stakeCard } from "../Stake/styles";

export const container = css`
  ${stakeCard};
  display: flex;
  flex-direction: column;
  color: var(--font-01);
  min-height: 88rem;
  .infoSection {
    display: grid;
    gap: 0.8rem;
  }

  .addressRow {
    display: grid;
    grid-template-columns: repeat(3, max-content);
    column-gap: 1rem;
    align-items: center;
  }
  .addressRow a {
    font-family: monospace;
    color: var(--font-03);
    text-decoration: underline;
  }
`;

export { stakeCard_header, stakeCard_header_title } from "../Stake/styles";
