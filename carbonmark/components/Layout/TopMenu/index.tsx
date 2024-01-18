import { ButtonPrimary } from "@klimadao/lib/components";
import { t } from "@lingui/macro";
import { Menu } from "@mui/icons-material";
import { BetaBadge } from "components/BetaBadge";
import { CarbonmarkLogo } from "components/Logos/CarbonmarkLogo";
import { CarbonmarkText } from "components/Logos/CarbonmarkText";
import { SearchInput } from "components/SearchInput";
import Link from "next/link";
import { FC } from "react";
import * as styles from "./styles";

export type TopMenuProps = {
  showSearch?: boolean;
  userAddress?: string;
};

export const TopMenu: FC<TopMenuProps> = (props) => {
  return (
    <div className={styles.topMenu}>
      <Link href="/" className={styles.logo}>
        <CarbonmarkLogo />
        <CarbonmarkText />
        <BetaBadge />
      </Link>
      <SearchInput
        id="search-input"
        label={t`Search Carbonmark`}
        placeholder={t`Search Carbonmark`}
        buttonStyle={styles.searchButton}
        onSubmit={() => {
          console.log("hi");
        }}
      />
      <ButtonPrimary
        data-mobile-only
        variant="gray"
        icon={<Menu />}
        onClick={() => console.log("Toggle menu")}
        className={styles.menuButton}
      />
    </div>
  );
};
