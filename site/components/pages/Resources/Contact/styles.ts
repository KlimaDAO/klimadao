import { css } from "@emotion/css";

export const section_textGroup = css`
  grid-column: main;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 2rem;

  a {
    text-decoration: underline;
  }

  a:hover {
    text-decoration: none;
  }
`;
