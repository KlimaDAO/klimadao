import { i18n } from "@lingui/core";
import React, { FC } from "react";

interface CustomTransProps {
  id: string;
  style?: React.CSSProperties;
}

export const CustomTrans: FC<CustomTransProps> = ({ id, style }) => {
  const translatedDescription = i18n._(id);

  return (
    <div>
      {translatedDescription.split("\n").map((line, index) => (
        <p key={index} style={style}>
          {line}
        </p>
      ))}
    </div>
  );
};
