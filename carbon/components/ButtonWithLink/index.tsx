import { Button } from "@mui/material";
import Link from "components/Link";
import { FC } from "react";
import styles from "./styles.module.scss";

export const ButtonWithLink: FC<{
  label: string;
  href: string;
  className?: string;
}> = (props) => {
  return (
    <Link href={props.href}>
      <Button className={`${styles.button} ${props.className}`}>
        {props.label}
      </Button>
    </Link>
  );
};
