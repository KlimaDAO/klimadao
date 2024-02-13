import { cx } from "@emotion/css";
import SearchIcon from "@mui/icons-material/Search";
import { ButtonPrimary } from "components/Buttons/ButtonPrimary";
import { InputField, InputFieldProps } from "components/shared/Form/InputField";
import { ChangeEvent, FC, KeyboardEvent, useEffect, useState } from "react";
import * as styles from "./styles";

type SearchInputProps = Pick<InputFieldProps, "id" | "label"> & {
  placeholder: string;
  /** Useful for pre-filling to reflect URL query param */
  initialValue?: string;
  buttonStyle?: string;
  onSubmit: (str: string | null) => void;
};

export const SearchInput: FC<SearchInputProps> = (props) => {
  const [searchString, setSearchString] = useState("");

  const handleSubmit = () => {
    props.onSubmit(searchString || null);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSubmit();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // for better ux, fire a submit when they clear the input
    if (searchString && e.target.value === "") {
      props.onSubmit(null);
    }
    setSearchString(e.target.value);
  };

  useEffect(() => {
    if (props.initialValue && !searchString) {
      setSearchString(props.initialValue);
    }
  }, [props.initialValue]);

  return (
    <div className={styles.main}>
      <InputField
        id={props.id}
        inputProps={{
          className: styles.input,
          placeholder: props.placeholder,
          type: "search",
          value: searchString,
          onChange: handleChange,
          onKeyDown: handleKeyDown,
        }}
        label={props.label}
        hideLabel
      />
      <ButtonPrimary
        className={cx(styles.button, props.buttonStyle)}
        icon={<SearchIcon />}
        onClick={handleSubmit}
      />
    </div>
  );
};
