import { cx } from "@emotion/css";
import { t } from "@lingui/macro";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import Tippy from "@tippyjs/react";
import { FC, HTMLAttributes, useEffect, useState } from "react";
import { Control, FieldValues, Path, useController } from "react-hook-form";
import * as styles from "./styles";

type Props<V, T extends FieldValues> = {
  default: string;
  options: Option<V>[];
  name: Path<T>;
  control: Control<T>;
} & Pick<HTMLAttributes<HTMLDivElement>, "className">;

type Option<T> = { id: string; value: T; label: string };

export function Dropdown<V, T extends FieldValues = FieldValues>(
  props: Props<V, T>
) {
  const { field } = useController({
    control: props.control,
    name: props.name,
  });
  const defaultOption = props.options.find(({ id }) => id === props.default);
  const [value, setValue] = useState(defaultOption);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((current) => !current);
  const close = () => setIsOpen(false);

  // always close dropdown if label changed
  useEffect(() => {
    field.onChange(value);
    close();
  }, [value]);

  return (
    <div className={cx(styles.tippyContainer, props.className)}>
      <Tippy
        content={
          <div className={styles.dropDownMenu}>
            {props.options.map((option) => (
              <DropdownButton
                key={option.id}
                label={option.label}
                onClick={() => setValue(option)}
                active={value === option.value}
              />
            ))}
          </div>
        }
        interactive={true}
        onClickOutside={toggle}
        visible={isOpen}
        placement="bottom-end"
        popperOptions={{
          modifiers: [
            {
              name: "preventOverflow",
              options: {
                rootBoundary: "document",
              },
            },
          ],
        }}
      >
        <button
          onClick={toggle}
          role="button"
          className={styles.dropdownHeader}
          aria-label={t`Toggle sort menu`}
        >
          {`Sort By: ${value?.label}`}
          {isOpen ? (
            <ArrowDropUpIcon fontSize="large" />
          ) : (
            <ArrowDropDownIcon fontSize="large" />
          )}
        </button>
      </Tippy>
    </div>
  );
}

type DropdownButtonProps = {
  label: string;
  onClick: () => void;
  active: boolean;
};

const DropdownButton: FC<DropdownButtonProps> = (props) => (
  <button
    className={styles.dropdownButton}
    onClick={props.onClick}
    role="button"
    aria-label={props.label}
    data-active={props.active}
  >
    {props.label}
  </button>
);
