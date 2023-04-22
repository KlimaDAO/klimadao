import { i18n } from "@lingui/core";
import React, { FC } from "react";

interface FormatTransProps {
  id: string;
  style?: React.CSSProperties;
}

export const FormatTrans: FC<FormatTransProps> = ({ id, style }) => {
  const translatedDescription = i18n._(id);

  return (
    <div>
      {translatedDescription.match(/[^\.!\?]+[\.!\?]+/g)?.map((line, index) => (
        <p key={index} style={style}>
          {line.trim()}
        </p>
      ))}
    </div>
  );
};
