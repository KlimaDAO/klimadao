import { cx } from "@emotion/css";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Text } from "components/Text";
import { withSkeleton } from "hocs/WithSkeleton";
import { FC, PropsWithChildren, useState } from "react";
import * as styles from "./styles";

type AccordionProps = {
  label: string;
  subtitle?: string;
  className?: string;
} & PropsWithChildren;

const Component: FC<AccordionProps> = (props) => {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen((prev) => !prev);

  return (
    <div
      data-open={open}
      className={cx("accordion", styles.main, props.className)}
    >
      <button onClick={toggle} className={styles.toggle} type="button">
        <Text className={styles.label}>{props.label}</Text>
        {props.subtitle && (
          <Text className={styles.subtitle}>({props.subtitle})</Text>
        )}
        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </button>
      <div className="content">{props.children}</div>
    </div>
  );
};

export const Accordion = withSkeleton(Component);
