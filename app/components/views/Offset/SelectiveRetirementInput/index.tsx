import { t } from "@lingui/macro";
import { isAddress } from "ethers-v6";
import { ChangeEvent, FC } from "react";
import * as styles from "./styles";

type Props = {
  projectAddress: string;
  setProjectAddress: (val: string) => void;
  disabled?: boolean;
};

export const SelectiveRetirementInput: FC<Props> = (props) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    props.setProjectAddress(e.target.value);

  return (
    <input
      className={styles.input}
      value={props.projectAddress}
      onChange={handleChange}
      placeholder={t({
        id: "offset.enter_address",
        message: "Enter 0x address",
      })}
      data-error={!!props.projectAddress && !isAddress(props.projectAddress)}
      pattern="^0x[a-fA-F0-9]{40}$"
      disabled={props.disabled}
    />
  );
};
