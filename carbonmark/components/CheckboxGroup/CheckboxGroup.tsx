import { Checkbox } from "components/shared/Form";
import { Control, FieldValues, Path, useController } from "react-hook-form";
import * as styles from "./CheckboxGroup.styles";
import { CheckboxOption } from "./CheckboxGroup.types";

type Props<T extends FieldValues> = {
  options: CheckboxOption[];
  name: Path<T>;
  control: Control<T>;
};

export const CheckboxGroup = <T extends FieldValues>(props: Props<T>) => {
  const { field } = useController({
    control: props.control,
    name: props.name,
  });
  return (
    <div className={styles.main}>
      {props.options.map((option) => (
        <Checkbox
          id={`${props.name}-${option.value}`}
          key={`${props.name}-${option.value}`}
          label={option.label}
          inputProps={{
            name: props.name,
            value: option.value,
            checked: field.value.includes(option.value),
            onChange: (e) => {
              if (e.target.checked) {
                /** Add this checkbox to the list of checked values */
                field.onChange([...field.value, e.target.value]);
              } else {
                /** Remove this checkbox from list of checked values */
                const value = field.value.filter(
                  (value: unknown) => value !== e.target.value
                );
                field.onChange(value);
              }
            },
          }}
        />
      ))}
    </div>
  );
};
