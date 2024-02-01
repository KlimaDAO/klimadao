import { css } from "@emotion/css";

export const beneficiaryCard = css`
  gap: 1.6rem;
  margin: 2rem 0;
  padding: 2rem;
  display: flex;
  background-color: var(--surface-02);
`;

export const beneficiaryLogo = css`
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  div {
    width: 8rem;
    height: 8rem;
  }

  .imgUrl {
    object-fit: fill;
    border-radius: 50%;
    width: 8rem;
    height: 8rem;
  }

  .placeholderIcon {
    width: 4.8rem;
    height: 4.8rem;
    color: var(--manatee);
  }
`;

export const content = css`
  gap: 0.8rem;
  display: flex;
  flex-direction: column;
`;

export const profileLink = css`
  display: flex;
  gap: 1.45rem;
  font-size: 1.4rem;
  line-height: 1.6rem;
  font-weight: 600;
  letter-spacing: 0.042rem;
  margin-top: 0.2rem;
  align-items: center;
  text-transform: uppercase;
  color: var(--bright-blue);
  font-family: var(--font-family-secondary);
`;

export const beneficiaryAddress = css`
  overflow-wrap: anywhere;
`;
