import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { IconButton, Menu, MenuItem, Zoom } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import WalletAction from "../WalletAction";
import { MobileMenuProps } from "../constants";

import styles from "../index.module.css";

const MobileMenu: FC<MobileMenuProps> = ({
  links,
  isConnected,
  loadWeb3Modal,
  disconnect,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const visibleLinks = links.filter((link) => link.show);

  return (
    <div className={styles.mobileMenu}>
      <IconButton
        id="menu-btn"
        className={open ? styles.menuOpen : styles.menuClosed}
        aria-label="menu"
        aria-controls="mobile-menu"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {open ? <CloseIcon /> : <MenuIcon />}
      </IconButton>

      <Menu
        id="menu-btn"
        classes={{ paper: styles.menuDropdown }}
        className={styles.backgroundOpacity}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Zoom}
        TransitionProps={{ timeout: { appear: 400, enter: 400, exit: 200 } }}
      >
        {visibleLinks.map(({ dataActive, to, text }) => {
          return (
            <MenuItem selected={dataActive} key={text} onClick={handleClose}>
              <Link className={styles.textButtonMobile} to={to}>
                {text}
              </Link>
            </MenuItem>
          );
        })}
        <MenuItem key="wallet-action" onClick={handleClose}>
          <WalletAction
            isConnected={isConnected}
            loadWeb3Modal={loadWeb3Modal}
            disconnect={disconnect}
            isMobile
          />
        </MenuItem>
      </Menu>
    </div>
  );
};

export default MobileMenu;
