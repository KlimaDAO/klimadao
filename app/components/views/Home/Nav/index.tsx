import { FC } from "react";
import { Link } from "react-router-dom";
import { NavProps } from "../constants";

import styles from "../index.module.css";

const Nav: FC<NavProps> = ({ chainId, links }) => {
  const visibleLinks = links.filter((link) => link.show);

  return (
    <nav className={styles.nav}>
      {chainId === 80001 && (
        <p className={styles.testnet_warning}>
          ⚠️You are connected to <strong>testnet</strong>
          <br />
          <em>{`"where everything is made up and the points don't matter."`}</em>
        </p>
      )}
      {visibleLinks.map((link) => {
        return (
          <Link
            key={link.to}
            className={styles.textButton}
            to={link.to}
            data-active={link.dataActive}
          >
            {link.text}
          </Link>
        );
      })}
    </nav>
  );
};

export default Nav;
