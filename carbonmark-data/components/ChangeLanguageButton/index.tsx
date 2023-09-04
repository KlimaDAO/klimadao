"use client";

import { t } from "@lingui/macro";
import Language from "@mui/icons-material/Language";
import { Button } from "@mui/material";
import Tippy from "@tippyjs/react";
import { FC, useState } from "react";
import styles from "./styles.module.scss";

export const ChangeLanguageButton: FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <Tippy
      className={styles.tooltip}
      content={
        <div>
          <div>
            <Button onClick={() => setShowTooltip(false)}>English</Button>
          </div>
          <div>
            <Button onClick={() => setShowTooltip(false)}>Deutsch</Button>
          </div>
        </div>
      }
      interactive={true}
      placement="bottom-start"
      visible={showTooltip}
    >
      <Button
        className={styles.changeLanguageButton}
        aria-label={t`Change language`}
        onClick={() => setShowTooltip(!showTooltip)}
      >
        <Language />
      </Button>
    </Tippy>
  );
};
