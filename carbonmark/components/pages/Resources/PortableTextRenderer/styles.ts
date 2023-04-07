import { css } from "@emotion/css";
import * as typography from "theme/typography";

export const heading = css`
  margin: 4.8rem 0 1.6rem;
  font-weight: 700;
`;

export const paragraph = css`
  margin: 1rem 0;
  word-break: break-word;
`;

export const blockQuote = css`
  border-left: 1rem solid var(--bright-blue);
  margin: 1.5em 1rem;
  padding: 0.5em 1rem;
  quotes: "\\201C""\\201D""\\2018""\\2019";
  &:before {
    color: var(--bright-blue);
    content: open-quote;
    font-size: 4rem;
    line-height: 1rem;
    margin-right: 0.25rem;
    vertical-align: -0.4rem;
  }
`;

export const inlineImage = css`
  margin: auto;
`;

export const link = css`
  text-decoration: underline;
  color: var(--bright-blue);
  word-break: break-word;
  &:visited {
    color: var(--bright-blue);
  }
`;

export const ul = css`
  margin: 1.2rem;
  margin-inline-start: 1.5rem;
`;

export const ol = css`
  ${typography.body2}
  margin: 2rem 0;
  margin-inline-start: 3.5rem;
`;

export const nestedUl = css`
  list-style-type: "- ";
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

export const nestedOl = css`
  ${typography.body2}
  list-style-type: lower-alpha;
  margin-inline-start: 2.5rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  list-style-position: outside;
`;
