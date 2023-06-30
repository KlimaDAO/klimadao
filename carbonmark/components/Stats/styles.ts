import { css } from "@emotion/css";

export const list = css`
  display: grid;
  gap: 1.2rem;
`;

export const listItem = css`
  display: flex;
  flex-direction: row;
  gap: 1.2rem;
  justify-content: space-between;
`;

export const textWithTooltipWrapper = css`
  display: flex;
  align-items: center;
`;

export const tooltipIcon = css`
    margin-top: 0.2rem;
    margin-left: 0.5rem;
    fill: var(--manatee) !important;
    align-self: flex-start;   
    font-size: 1.8rem !important;
  }
`;

export const launchIcon = css`
  fill: var(--font-02);
  margin-left: 0.2rem;
  font-size: large !important;
`;

export const tooltip = css`
  font-size: 1.4rem;
  padding: 0.5rem;
  max-width: 30rem !important;
`;

export const itemWithIcon = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;

  svg {
    fill: var(--font-02);
  }
`;

export const itemWithColor = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.3rem;

  span {
    position: relative;
    display: flex;
    align-items: center;

    gap: 1.2rem;
  }

  span:before {
    content: "";
    width: 1.2rem;
    height: 1.2rem;
    background-color: var(--bisque);
  }

  span.first:before {
    background-color: var(--old-burgundy);
  }
`;

export const bar = css`
  height: 0.8rem;
  background-color: var(--bisque);
  border-radius: var(--border-radius);

  &::before {
    content: "";
    display: flex;
    justify-content: end;
    width: calc(var(--percent) * 1%);
    height: 100%;
    background: var(--old-burgundy);
    white-space: nowrap;
    border-radius: var(--border-radius) 0 0 var(--border-radius);
  }
`;

export const bold = css`
  font-weight: 600;
`;

export const titles = css`
  display: flex;
  gap: 0.4rem;
  flex-direction: column;
`;

export const polygonScanLink = css`
  display: flex;
  align-items: center;
  font-size: 1em;
  line-height: 1.8em;
  text-decoration: underline;
  color: var(--font-02);
  cursor: pointer;
  margin-top: 0.8rem;
  &:hover {
    color: var(--bright-blue);
    .launchIcon {
      fill: var(--bright-blue) !important;
    }
  }
`;
