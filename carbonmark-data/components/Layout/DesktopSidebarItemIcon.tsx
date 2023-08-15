import { Icon } from "components/Graphics/Icons";
import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const DesktopSidebarItemIcon: FC<Props> = (props) => {
  return (
    <Icon width={32} height={32} backgroundColor="#F5F5F7" color="#313131">
      {props.children}
    </Icon>
  );
};
