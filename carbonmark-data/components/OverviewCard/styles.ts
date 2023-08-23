import { css } from "@emotion/css";

export const cardContainer = css`
  box-shadow: var(--box-shadow);
  min-height: 284px;
  height: 284px;
  background-color: var(--surface-04);
  padding: 12px;
  display: flex;
  flex-flow: column;
  position: relative;
`;
export const cardHeader = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const cardHeaderTitle = css`
  flex: 1 1 0;
  font-size: 14px;
  weight: 700;
`;
export const cardHeaderSwitcher = css`
  flex: 1 1 0;
  display: flex;
  justify-content: center;
`;
export const cardHeaderDetailsLink = css`
  &,
  &:hover,
  &.visited {
    color: var(--text-color-03);
    flex: 1 1 0;
    text-align: right;
    font-size: 14px;
  }
`;
export const cardHeaderDetailsLinkArrow = css`
  position: relative;
  top: 5px;
`;

export const cardContent = css`
  flex: 1 1 auto;
`;
export const cardFooter = css`
  position: absolute;
  bottom: 0px;
  display: flex;
  width: 100%;
  justify-content: center;
}
`;
