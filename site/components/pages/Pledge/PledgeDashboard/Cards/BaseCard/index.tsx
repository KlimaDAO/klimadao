import React from "react";
import { Text } from "@klimadao/lib/components";

import * as styles from "./styles";

type CardProps = {
  title: string;
  icon: JSX.Element;
  action?: JSX.Element;
};

export const BaseCard: React.FC<CardProps> = (props) => (
  <div className={styles.card}>
    <div className={styles.cardHeader}>
      <div className={styles.title}>
        {props.icon}
        <Text t="h3">{props.title}</Text>
      </div>

      {props.action && <div>{props.action}</div>}
    </div>

    {props.children}
  </div>
);
