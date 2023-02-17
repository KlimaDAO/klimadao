import { cx } from "@emotion/css";
import { Text } from "@klimadao/lib/components";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FC, PropsWithChildren, useState } from "react";
import * as styles from "./styles";

type AccordionProps = {
  label: string;
} & PropsWithChildren;

export const Accordion: FC<AccordionProps> = (props) => {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen((prev) => !prev);

  return (
    <div className={cx("accordion", styles.main)} data-open={open}>
      <button onClick={toggle} className={styles.toggle}>
        <Text className={styles.label}>{props.label}</Text>
        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </button>
      <div className="content">{props.children}</div>
    </div>
  );
};
