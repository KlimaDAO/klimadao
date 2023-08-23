import { css } from "@emotion/css";

export const cardContainer = css`
  box-shadow: var(--box-shadow);
  min-height: 284px;
  height: 284px;
  background-color: var(--surface-04);
  padding: 12px;
  display: flex;
  flex-flow: column;
`;
export const cardHeader = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const cardContent = css`
  flex: 1 1 auto;
`;
export const cardFooter = css`
  position: relative;
  top: -40px;
  display: flex;
  width: 100%;
  justify-content: center;
}
`;
export const cardHeaderItem = css`
  flex: 1 1 0;
`;
export const detailsLink = css`
  &,
  &:hover,
  &.visited {
    color: var(--text-color-03);
    flex: 1 1 0;
    text-align: right;
  }
`;
export const detailsLinkArrow = css`
  position: relative;
  top: 3px;
`;
