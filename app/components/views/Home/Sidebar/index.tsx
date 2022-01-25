import { FC, useState } from "react";
import styles from "./index.module.css";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";
import Hidden from "@material-ui/core/Hidden";
import { getPrimaryLinks, getSecondaryLinks } from "./constants";

const primaryLinks = getPrimaryLinks({
  path: "/stake",
});

const secondaryLinks = getSecondaryLinks();

const SideBar: FC = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(true);

  const handleDrawerToggle = () => setMobileDrawerOpen(!mobileDrawerOpen);

  const drawer = (
    <div className={styles.drawerContainer}>
      <div className="logo">
        <ListItem
          button
          classes={{ root: styles.logoText }}
          component="a"
          href="/"
        >
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText
            classes={{ primary: styles.itemText }}
            primary="KlimaDAO"
          />
        </ListItem>
      </div>
      <Divider classes={{ root: styles.divider }} />
      <List>
        <ListItem classes={{ root: styles.walletInfo }}>
          <span className={styles.primaryText}>Your Wallet Address:</span>
          <span className={styles.itemText}>0x09&_0xxxxx</span>
        </ListItem>
      </List>
      <Divider classes={{ root: styles.divider }} />
      <div className="internal-links">
        <List>
          {primaryLinks.map(({ text, icon: Icon, to = "/", dataActive }) => (
            <ListItem
              button
              classes={{ root: styles.listLink }}
              component="a"
              href={to}
              key={text}
              selected={dataActive}
            >
              <ListItemIcon classes={{ root: styles.listIcon }}>
                <Icon htmlColor="white" />
              </ListItemIcon>
              <ListItemText
                classes={{ root: styles.listText }}
                primary={text}
              />
            </ListItem>
          ))}
        </List>
      </div>
      {/* add spacing to bottom here */}
      <Divider />
      <div className="external-links">
        <List>
          <ListItem button>
            {secondaryLinks.map(({ text, icon: Icon }) => (
              <ListItemIcon key={text}>
                <Icon />
              </ListItemIcon>
            ))}
          </ListItem>
        </List>
      </div>
      <Divider />
      <div className="logout">
        <List>
          <ListItem>
            <ListItemIcon>
              <KeyboardReturnIcon />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: styles.textItem }}
              primary="Log Out"
            />
          </ListItem>
        </List>
      </div>
    </div>
  );

  return (
    <>
      <Hidden only={["sm", "md", "lg", "xl"]}>
        <Drawer
          open={mobileDrawerOpen}
          onClose={handleDrawerToggle}
          classes={{
            root: styles.sidebarLg,
            paper: styles.drawerMobile,
          }}
          ModalProps={{
            keepMounted: true,
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden only={["xs", "md", "lg", "xl"]}>
        <Drawer
          variant="permanent"
          classes={{
            root: styles.sidebarSm,
            paper: styles.drawerTablet,
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden only={["xs", "sm"]}>
        <Drawer
          variant="permanent"
          classes={{
            root: styles.sidebarLg,
            paper: styles.drawerPermanent,
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
    </>
  );
};

export default SideBar;
