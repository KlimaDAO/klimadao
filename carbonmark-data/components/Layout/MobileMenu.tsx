import { Menu } from "@mui/icons-material";
import { Button } from "@mui/material";
import { FC, ReactNode } from "react";
import styles from "./style.module.scss";

interface Props {
  children?: ReactNode;
}

export const MobileMenu: FC<Props> = () => {
  return (
    <Button className={styles.mobileMenuButton}>
      <Menu />
    </Button>
  );
};
