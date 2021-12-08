import { css } from "@emotion/css";

export default {
  infoContainer: css`
    display: inline-flex;
    justify-content: flex-end;
    align-items: center;
    gap: 0.4rem;
    .__react_component_tooltip.show {
      opacity: 0.4 !important;
      line-height: 130% !important;
      max-width: 30rem;
    }
  `,
  infoIcon: css`
    opacity: 0.4;
  `,
};
