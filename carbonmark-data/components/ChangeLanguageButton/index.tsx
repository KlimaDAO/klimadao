"use client";

import { t } from "@lingui/macro";
import Language from "@mui/icons-material/Language";
import { Button } from "@mui/material";
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
      visible={false}
    >
      <Button
        className={styles.changeLanguageButton}
        aria-label={t`Change language`}
      >
        <Language />
      </Button>
    </Tippy>
  );
};
