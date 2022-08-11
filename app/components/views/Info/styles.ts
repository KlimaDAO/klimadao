import { css } from "@emotion/css";

import { chooseBondCard } from "../ChooseBond/styles";

export const container = css`
  ${chooseBondCard};
  flex-direction: column;
  color: var(--font-01);
  overflow: scroll;
  /* Hide scrollbar for Chrome, Safari and Opera */
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  .infoSection {
    display: grid;
    gap: 0.8rem;
  }
  .addressRow {
    display: grid;
    grid-template-columns: repeat(3, max-content);
    column-gap: 0.4rem;
    align-items: center;
  }
  .addressRow a {
    font-family: monospace;
    color: var(--font-03);
    text-decoration: underline;
  }
`;

export { stakeCard_header, stakeCard_header_title } from "../Stake/styles";
