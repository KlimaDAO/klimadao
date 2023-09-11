import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import styles from "./styles.module.scss";

export interface TypedOption<T> {
  label: string;
  value: T;
}

export const MobileTabSelector = <T extends string>(props: {
  value: string;
  options: Array<TypedOption<T>>;
  onSelectionChanged: (value: T) => void;
  className: string;
}) => {
  const handleChange = (event: SelectChangeEvent) => {
    props.onSelectionChanged(event.target.value as T);
  };

  return (
    <Select
      className={`${styles.select} ${props.className}`}
      value={props.value}
      onChange={handleChange}
    >
      {props.options.map((option) => {
        return (
          <MenuItem
            key={option.value}
            value={option.value}
            className={styles.menuItem}
          >
            {option.label}
          </MenuItem>
        );
      })}
    </Select>
  );
};
