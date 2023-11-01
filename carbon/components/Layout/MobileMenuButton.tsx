import { t } from "@lingui/macro";
import { Menu } from "@mui/icons-material";
import { ButtonWithLink } from "components/ButtonWithLink";
import { FC, ReactNode } from "react";
import layout from "theme/layout.module.scss";
import { navItems } from "./NavItems";
import { TopMenuButton } from "./TopMenuButton";

interface Props {
  children?: ReactNode;
}

export const MobileMenuButton: FC<Props> = () => {
  return (
    <TopMenuButton label={t`Navigation menu button`} icon={<Menu />}>
      <>
        {navItems().map((navItem) => (
          <ButtonWithLink
            key={navItem.url}
            href={navItem.url}
            label={navItem.label}
            className={layout.fullWidth}
          />
        ))}
      </>
    </TopMenuButton>
  );
};
