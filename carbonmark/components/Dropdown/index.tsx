import { cx } from "@emotion/css";
import { t } from "@lingui/macro";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import Tippy from "@tippyjs/react";
import Image, { StaticImageData } from "next/legacy/image";
import { FC, HTMLAttributes, ReactNode, useEffect, useState } from "react";
import { Control, FieldValues, Path, useController } from "react-hook-form";
import * as styles from "./styles";

type Props<V, T extends FieldValues> = {
  initial?: V;
  options: Option<V>[];
  name: Path<T>;
  control: Control<T>;
  onChange: any;
  renderLabel: (option: Option<V>) => string | ReactNode;
} & Pick<HTMLAttributes<HTMLDivElement>, "className">;

type Option<T> = {
  id: string;
  value: T;
  label: string;
  icon?: StaticImageData;
  disabled?: boolean;
};

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

  const disableToggle = options.length <= 1;
  const toggle = () => {
    !disableToggle && setIsOpen((current) => !current);
    console.log("at toggle");
  };
  const close = () => setIsOpen(false);

  // always close dropdown if label changed
  useEffect(() => {
    field.onChange(selected?.value);
    props.onChange(selected?.value);
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
                icon={option.icon}
                onClick={() => setSelected(option)}
                active={selected?.value === option.value}
                disabled={option.disabled}
              />
            ))}
          </div>
        }
        disabled={disableToggle}
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
          className={cx(styles.dropdownHeader, { disableToggle })}
        >
          {renderLabel(selected)}
          {isOpen ? (
            <ArrowDropUpIcon fontSize="large" />
          ) : !disableToggle ? (
            <ArrowDropDownIcon fontSize="large" />
          ) : null}
        </button>
      </Tippy>
    </div>
  );
}

type DropdownButtonProps = {
  label: string;
  icon?: StaticImageData;
  onClick: () => void;
  active: boolean;
  disabled?: boolean;
};

const DropdownButton: FC<DropdownButtonProps> = (props) => (
  <button
    className={styles.dropdownButton}
    onClick={props.onClick}
    role="button"
    type="button"
    aria-label={props.label}
    data-active={props.active}
    disabled={props.disabled}
  >
    {props.icon && (
      <Image
        className="icon"
        src={props.icon}
        width={28}
        height={28}
        alt={props.label || ""}
      />
    )}{" "}
    {props.label}
    {props.disabled && <span>{t`Coming soon`}</span>}
  </button>
);
