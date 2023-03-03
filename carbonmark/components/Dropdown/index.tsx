import { cx } from "@emotion/css";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import Tippy from "@tippyjs/react";
import { FC, HTMLAttributes, ReactNode, useEffect, useState } from "react";
import { Control, FieldValues, Path, useController } from "react-hook-form";
import * as styles from "./styles";

type Props<V, T extends FieldValues> = {
  initial?: string;
  options: Option<V>[];
  name: Path<T>;
  control: Control<T>;
  renderLabel: (option: Option<V>) => string | ReactNode;
} & Pick<HTMLAttributes<HTMLDivElement>, "className">;

type Option<T> = { id: string; value: T; label: string };

export function Dropdown<V, T extends FieldValues = FieldValues>(
  props: Props<V, T>
) {
  const { control, name, initial, options, className, renderLabel, ...rest } =
    props;

  const { field } = useController({
    control,
    name,
  });
  const defaultOption = options.find(({ id }) => id === initial) ?? options[0];
  const [selected, setSelected] = useState(defaultOption);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((current) => !current);
  const close = () => setIsOpen(false);

  // always close dropdown if label changed
  useEffect(() => {
    field.onChange(selected?.value);
    close();
  }, [selected]);

  return (
    <div className={cx(styles.tippyContainer, className)}>
      <Tippy
        content={
          <div className={styles.dropDownMenu}>
            {options.map((option) => (
              <DropdownButton
                key={option.id}
                label={option.label}
                onClick={() => setSelected(option)}
                active={selected?.value === option.value}
              />
            ))}
          </div>
        }
        arrow={false}
        interactive={true}
        onClickOutside={toggle}
        visible={isOpen}
        placement="bottom-start"
        /** @todo Need to add nested positioning */
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
          {...rest}
          onClick={toggle}
          role="button"
          type="button"
          className={styles.dropdownHeader}
        >
          {renderLabel(selected)}
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
    type="button"
    aria-label={props.label}
    data-active={props.active}
  >
    {props.label}
  </button>
);
