import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
  width: number;
  height: number;
  backgroundColor?: string;
  color: string;
}

export const Icon: FC<Props> = (props) => {
  return (
    <svg
      width={props.width}
      height={props.height}
      viewBox="0 0 32 32"
      fill={props.color}
      xmlns="http://www.w3.org/2000/svg"
    >
      {props.backgroundColor && (
        <rect
          width={props.width}
          height={props.height}
          rx="6"
          fill={props.backgroundColor}
        />
      )}
      {props.children}
    </svg>
  );
};
