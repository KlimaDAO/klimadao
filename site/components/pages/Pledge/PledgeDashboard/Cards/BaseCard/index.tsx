import React from "react";
import { Text } from "@klimadao/lib/components";

import * as styles from "./styles";

type CardProps = {
  title: string;
  icon: JSX.Element;
};

export const BaseCard: React.FC<CardProps> = (props) => (
  <div className={styles.card}>
    <div className={styles.cardHeader}>
      {props.icon}
      <Text t="h4">{props.title}</Text>
    </div>

    {props.children}
  </div>
);
