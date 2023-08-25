import { css } from "@emotion/css";

export const cardContainer = css`
  box-shadow: var(--box-shadow);
  border-radius: 8px;
  min-height: 284px;
  height: 284px;
  background-color: var(--surface-04);
  padding: 12px;
  display: flex;
  flex-flow: column;
  margin-bottom: 2rem;
  position: relative;
  width: 100%;
`;
export const cardHeader = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-items: center;
  margin-bottom: 27px;
`;
export const cardHeaderTitle = css`
  flex: 1 1 0;
  font-size: 1.4rem;
  weight: 700;
  margin: 0;
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
    color: var(--text-color-05);
    flex: 1 1 0;
    text-align: right;
    font-size: 14px;
    text-decoration: none;
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
