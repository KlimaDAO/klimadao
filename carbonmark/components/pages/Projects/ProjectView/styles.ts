import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

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

export const card = css`
  background-color: var(--surface-01);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-01);
  width: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
  ${breakpoints.medium} {
    max-width: 32rem;
    max-height: 36rem;
    overflow: hidden;
  }
  ${breakpoints.large} {
    transition: all 0.2s ease 0s;
    &:hover {
      transform: scale(1.02);
      box-shadow: var(--shadow-02);
    }
  }
`;

export const cardImage = css`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 12rem;
  border-radius: var(--border-radius) var(--border-radius) 0 0;
`;

export const cardContent = css`
  padding: 2rem;
  display: grid;
  gap: 0.8rem;
  grid-template-rows: auto auto 1fr;
`;

export const cardTitle = css`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const tags = css`
  display: flex;
  gap: 0.8rem;
  flex-direction: row;
  margin-top: auto;
  align-items: center;
  overflow-x: auto;
  ::-webkit-scrollbar {
    display: none; /* Hide scrollbar for Chrome, Safari and Opera */
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

export const cardDescription = css`
  background: linear-gradient(
    180deg,
    var(--font-01) 43.44%,
    rgba(49, 49, 49, 0) 92.91%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  overflow: hidden;
  max-height: 9rem;
`;
