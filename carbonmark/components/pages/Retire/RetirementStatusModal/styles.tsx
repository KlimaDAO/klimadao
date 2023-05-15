import { css } from "@emotion/css";

export const title = css`
  fontfamily: "Poppins";
  fontstyle: normal;
  fontweight: 700;
  fontsize: 20px;
  lineheight: 28px;
  color: #3b3b3d;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

export const viewButton = css`
  background-color: var(--bright-blue);
  color: white !important;
  width: 100%;
`;

export const portfolioButton = css`
  font-family: "Poppins";
  background-color: white;
  color: black;
  border: 1px solid var(--font-01);
  width: 100%;
`;

export const modalContent = css`
  display: grid;
  gap: 1.6rem;
  .success {
    display: flex;
    gap: 0.8rem;
    justify-content: center;
    align-items: center;
    svg {
      color: var(--klima-green);
    }
  }
`;
