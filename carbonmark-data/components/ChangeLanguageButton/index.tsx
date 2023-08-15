"use client";

import { t } from "@lingui/macro";
import Language from "@mui/icons-material/Language";
import Tippy from "@tippyjs/react";
import { FC } from "react";
import * as styles from "./styles";

export const ChangeLanguageButton: FC = () => {
  return (
    <Tippy
      className={styles.tooltip}
      content={<></>}
      interactive={true}
      placement="bottom-start"
      visible={true}
    >
      <button
        className={styles.changeLanguageButton}
        aria-label={t`Change language`}
      >
        <Language fontSize="medium" />
      </button>
    </Tippy>
  );
};
