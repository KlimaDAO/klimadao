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
import { isEmpty, isNil } from "lodash";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import * as styles from "./styles";

export const TopMenu: FC = () => {
  const router = useRouter();
  const { address, isConnected, toggleModal, initializing } = useWeb3();

  const handleSearchSubmit = (search: string | null) => {
    if (isEmpty(search) || isNil(search)) return;
    router.replace(`/projects?search=${search}`);
  };

  return (
    <div className={styles.topMenu}>
      <Link href="/" className={styles.logo}>
        <CarbonmarkLogo />
        <CarbonmarkText />
        <BetaBadge />
      </Link>

      {router.pathname !== "/projects" && (
        <div data-desktop-only>
          <SearchInput
            id="search-input"
            label={t`Search for a project`}
            placeholder={t`Search for a project`}
            buttonStyle={styles.searchButton}
            onSubmit={handleSearchSubmit}
          />
        </div>
      )}

      <div className={styles.navButtons}>
        {router.pathname !== "/projects" && (
          <div data-mobile-only>
            <SearchInput
              id="search-input"
              label={t`Search for a project`}
              placeholder={t`Search for a project`}
              buttonStyle={styles.searchButton}
              onSubmit={handleSearchSubmit}
            />
          </div>
        )}
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
