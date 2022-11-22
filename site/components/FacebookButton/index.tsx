import { FC } from "react";
import { ButtonPrimary, FacebookIcon } from "@klimadao/lib/components";
import { useFacebookShareUrl } from "@klimadao/lib/hooks";
import { ButtonBaseProps } from "@klimadao/lib/components/Buttons/ButtonBase";
import * as styles from "./styles";

type Props = {
  url?: string;
  iconOnly?: boolean;
} & Omit<ButtonBaseProps, "label">;

export const FacebookButton: FC<Props> = (props) => {
  const shareUrl = useFacebookShareUrl(props.url);
  return (
    <ButtonPrimary
      className={styles.facebookButton}
      href={shareUrl}
      target="_blank"
      disabled={!shareUrl}
      icon={<FacebookIcon />}
      variant="lightGray"
      {...props}
    />
  );
};
