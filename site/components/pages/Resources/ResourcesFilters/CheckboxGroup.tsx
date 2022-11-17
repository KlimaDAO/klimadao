import { FC } from "react";
import { useController, Control } from "react-hook-form";
import { Checkbox } from "components/Form";
import { CheckboxOption, TagSlug, DocumentType } from "../lib/cmsDataMap";

import { FormValues } from "../ResourcesList";

type Props = {
  options: CheckboxOption[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formName: any; //  "tags" | "types"
  control: Control<FormValues>;
};

const randomNumber = Math.floor(Math.random() * 1000);

// Need to wrap CheckBoxes in controller field to ensure the form values are updated correctly
// https://react-hook-form.com/api/usecontroller

export const CheckboxGroup: FC<Props> = (props) => {
  const { field } = useController({
    control: props.control,
    name: props.formName,
  });

  return (
    <>
      {props.options.map((option) => (
        <Checkbox
          id={`${option.id}-${randomNumber}`} // this component is rendered twice, make sure that the ID is always different
          key={`${option.id}-${randomNumber}`}
          label={option.label}
          inputProps={{
            value: option.value,
            checked: field.value.some(
              (v: TagSlug | DocumentType) => v === option.value
            ),
            onChange: (e) => {
              if (e.target.checked) {
                field.onChange([...field.value, e.target.value]);
              } else {
                field.onChange(
                  field.value.filter(
                    (value: TagSlug | DocumentType) => value !== e.target.value
                  )
                );
              }
            },
          }}
        />
      ))}
    </>
  );
};
