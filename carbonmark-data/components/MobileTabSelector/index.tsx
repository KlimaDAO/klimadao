import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { Option } from "lib/charts/options";
import { FC } from "react";
import styles from "./styles.module.scss";

export const MobileTabSelector: FC<{
  value: string;
  options: Array<Option>;
  onSelectionChanged: (tab: string) => void;
  className: string;
}> = ({ value, options, onSelectionChanged, className }) => {
  const handleChange = (event: SelectChangeEvent) => {
    onSelectionChanged(event.target.value as string);
  };

  return (
    <Select
      className={`${styles.select} ${className}`}
      value={value}
      onChange={handleChange}
    >
      {options.map((option) => {
        return <MenuItem value={option.value}>{option.label}</MenuItem>;
      })}
    </Select>
  );
};
