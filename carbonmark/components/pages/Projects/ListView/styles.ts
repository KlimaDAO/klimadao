import { css } from "@emotion/css";
import { FIVE_CARD_WIDTH } from "../styles";

export const listView = css`
  padding: 2rem;
  background: white;
  border-radius: 0.8rem;
  box-shadow: 0 0.4rem 2.8rem 0 rgba(0, 0, 0, 0.06);

  & table {
    border-collapse: collapse;

    & thead th {
      text-align: left;
      padding: 0 1.6rem 2rem;
      border-bottom: 0.1rem solid var(--manatee);

      span {
        font-weight: 700;
        font-size: 1.6rem;
        line-height: 2rem;
        color: var(--font-02);
        font-family: var(--font-family-secondary);
      }

      :first-of-type {
        padding-left: 0;
      }

      :last-of-type {
        padding-right: 0;
      }
    }

    & tbody {
      tr {
        cursor: pointer;
        &:hover {
          background: #f5f6ff;
        }
      }

      th,
      td {
        padding: 1.6rem;
        font-size: 1.6rem;
        line-height: 2rem;
        vertical-align: top;
        border-bottom: 0.1rem solid var(--manatee);

        :last-of-type {
          padding-right: 0;
        }
      }

      th {
        font-weight: 700;
        color: var(--font-02);
        font-family: var(--font-family-secondary);

        :first-of-type {
          padding-left: 0;
        }
      }

      td {
        color: black;
        font-family: var(--font-family);
      }

      & .description {
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
  }
`;

export const projectsList = css`
  grid-column: full;
  justify-self: center;
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
  max-width: ${FIVE_CARD_WIDTH};
`;
