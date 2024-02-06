import { useWeb3 } from "@klimadao/lib/utils";
import { Trans, t } from "@lingui/macro";
import LoginOutlined from "@mui/icons-material/LoginOutlined";
import { BetaBadge } from "components/BetaBadge";
import { ButtonPrimary } from "components/Buttons/ButtonPrimary";
import { NavDropdown } from "components/Layout/NavDropdown";
import { CarbonmarkLogo } from "components/Logos/CarbonmarkLogo";
import { CarbonmarkText } from "components/Logos/CarbonmarkText";
import { SearchInput } from "components/SearchInput";
import { UserProfile } from "components/UserProfile";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import * as styles from "./styles";

export type TopMenuProps = {
  showSearch?: boolean;
  userAddress?: string;
};

export const TopMenu: FC<TopMenuProps> = () => {
  const router = useRouter();
  const { address, isConnected, toggleModal, initializing } = useWeb3();

  return (
    <div className={styles.topMenu}>
      <Link href="/" className={styles.logo}>
        <CarbonmarkLogo />
        <CarbonmarkText />
        <BetaBadge />
      </Link>

      {router.pathname !== "/projects" && (
        <SearchInput
          id="search-input"
          label={t`Search for a project`}
          placeholder={t`Search for a project`}
          buttonStyle={styles.searchButton}
          onSubmit={() => console.log("")}
        />
      )}

      <div className={styles.navButtons}>
        <div className="user-profile" data-desktop-only>
          {!address && !isConnected ? (
            <ButtonPrimary
              label={<Trans>Login or Sign Up</Trans>}
              icon={<LoginOutlined />}
              className={styles.loginButton}
              disabled={initializing}
              onClick={toggleModal}
            />
          ) : (
            <UserProfile />
          )}
        </div>
        <NavDropdown />
      </div>
    </div>
  );
};
