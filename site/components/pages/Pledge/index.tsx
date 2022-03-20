import React from "react";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import { KlimaInfinityLogo, Text } from "@klimadao/lib/components";

import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import LocalGasStationOutlinedIcon from "@mui/icons-material/LocalGasStationOutlined";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";

import * as styles from "./styles";

const ThemeToggle = dynamic(() => import("components/Navigation/ThemeToggle"), {
  ssr: false,
});

type CardProps = {
  title: string;
  icon: JSX.Element;
};

const Card: React.FC<CardProps> = (props) => (
  <div className={styles.card}>
    <div className={styles.cardHeader}>
      {props.icon}
      <Text t="h4">{props.title}</Text>
    </div>
  </div>
);

export const Pledge: NextPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <div className={styles.header}>
          <div className={styles.logo}>
            <KlimaInfinityLogo />
          </div>
          <ThemeToggle />
        </div>

        <div className={styles.profile}>
          <Card title="Profile" icon={<EmailOutlinedIcon fontSize="large" />} />
        </div>

        <div className={styles.pledgeChart}>
          <Card
            title="Pledge vs Assets"
            icon={<EmailOutlinedIcon fontSize="large" />}
          />
        </div>

        <div className={styles.column}>
          <Card title="Pledge" icon={<MailOutlineIcon fontSize="large" />} />
          <Card
            title="Footprint"
            icon={<LocalGasStationOutlinedIcon fontSize="large" />}
          />
          <Card
            title="Methodology"
            icon={<HowToRegOutlinedIcon fontSize="large" />}
          />
        </div>

        <div className={styles.column}>
          <Card
            title="Carbon Assets"
            icon={<CloudQueueIcon fontSize="large" />}
          />
          <Card
            title="Retired Assets"
            icon={<LocalFireDepartmentIcon fontSize="large" />}
          />
        </div>
      </div>
    </div>
  );
};
