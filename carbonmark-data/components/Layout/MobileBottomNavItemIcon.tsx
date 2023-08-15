import { Icon } from "components/Graphics/Icons";
import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
  active: boolean;
}

export const MobileBottomNavItemIcon: FC<Props> = ({ active, children }) => {
  const color = active ? "#0BA1FF" : "#9C9C9C";
  return (
    <Icon width={20} height={20} color={color}>
      {children}
    </Icon>
  );
};
