import React from "react";

interface Props {
  className?: string;
}

export const TelegramIcon = (props: Props) => (
  <svg
    className={props.className}
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="2 3.61 20.02 16.79"
  >
    <title>Telegram</title>
    <path d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z"></path>
  </svg>
);
