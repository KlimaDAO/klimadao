"use client";
import { Button } from "@mui/material";
import Tippy from "@tippyjs/react";
import { FC, ReactNode } from "react";
import styles from "./styles.module.scss";

interface Props {
  label: string;
  children: ReactNode;
  icon: ReactNode;
}

export const TopMenuButton: FC<Props> = (props) => {
  return (
    <Tippy
      className={styles.topBarTooltip}
      content={<div aria-describedby="tooltip-content">{props.children}</div>}
      interactive={true}
      placement="bottom-start"
      trigger="click"
    >
      <Button className={styles.topBarButton} aria-label={props.label}>
        {props.icon}
      </Button>
    </Tippy>
  );
};
