import { FC, useState } from "react";
import styles from "./index.module.css";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import LinkOffIcon from "@material-ui/icons/LinkOff";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";
import Hidden from "@material-ui/core/Hidden";
import { primaryLinks, secondaryLinks } from "./constants";
import { Link, useLocation } from "react-router-dom";



const primaryLinksList = (path: string) =>
  primaryLinks({
    path,
  });

interface Props {
  address?: string;
}
// make some of this more typescript-y
// double check styles (sizing & spacing) compared to wireframe
const SideBar = (props: Props) => {
  const { address } = props;
  // this state and setter needs to live in the parent component and just
  // pass in the toggle function, once a button is created in the parent
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(true);
  const handleDrawerToggle = () => setMobileDrawerOpen(!mobileDrawerOpen);

  const { pathname } = useLocation();

  const prettyAddress = address?.substring(0, 4) + "..." + address?.substring(address.length - 4);

  const drawer = (
    <div className={styles.drawerContainer}>
      <List>
        <ListItem button component="a" href="/">
          <ListItemIcon classes={{ root: styles.listItemIcon }}>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText
            classes={{ primary: styles.logoText }}
            primary="KlimaDAO"
          />
        </ListItem>
      </List>
      <Divider classes={{ root: styles.divider }} />
      <List>
        <ListItem classes={{ root: styles.walletInfo }}>
          <span className={styles.primaryText}>Your Wallet Address:</span>
          <span className={styles.secondaryText}>{address ? prettyAddress : "not connected"}</span>
        </ListItem>
      </List>
      <Divider classes={{ root: styles.divider }} />
      <List classes={{ root: styles.primaryLinks }}>
        {primaryLinksList(pathname).map(
          ({ text, icon: LinkIcon, to = "/", dataActive }) => (
            <ListItem
              key={text}
              button
              to={to}
              component={Link}
              selected={dataActive}
              classes={{
                root: styles.listLink,
                selected: styles.listLinkSelected,
              }}
            >
              <ListItemIcon
                classes={{
                  root: `${styles.listItemIcon} ${dataActive && styles.listItemIconSelected
                    }`,
                }}
              >
                <LinkIcon />
              </ListItemIcon>
              <ListItemText
                classes={{ primary: styles.linkText }}
                primary={text}
              />
            </ListItem>
          )
        )}
      </List>
      <Divider classes={{ root: styles.divider }} />
      <List classes={{ root: styles.secondaryLinks }}>
        {secondaryLinks().map(({ to, icon: LinkIcon }) => (
          <ListItem
            key={to}
            button
            href={to}
            component="a"
            classes={{
              root: styles.listLinkSecondary,
              gutters: styles.listItemIcon,
            }}
          >
            <ListItemIcon
              classes={{
                root: styles.listItemIcon,
              }}
            >
              <LinkIcon />
            </ListItemIcon>
          </ListItem>
        ))}
      </List>
      <List>
        <ListItem
          classes={{
            root: styles.logoutBtn,
          }}
          button
        >
          <ListItemIcon classes={{ root: styles.listItemIcon }}>
            <KeyboardReturnIcon />
          </ListItemIcon>
          <ListItemText
            classes={{ primary: styles.linkText }}
            primary="Log Out"
          />
        </ListItem>
      </List>
    </div>
  );

  // clean up/abstract this "small" drawer
  const drawerThin = (
    <div className={styles.drawerContainer}>
      <List>
        <ListItem
          classes={{ root: styles.listItemThin }}
          button
          component="a"
          href="/"
        >
          <ListItemIcon classes={{ root: styles.listItemIcon }}>
            <InboxIcon />
          </ListItemIcon>
        </ListItem>
      </List>
      <Divider classes={{ root: styles.divider }} />
      <List>
        <ListItem
          classes={{ root: styles.listItemThin }}
          button
          component="a"
          href="/"
        >
          <ListItemIcon classes={{ root: styles.listItemIcon }}>
            <LinkOffIcon />
          </ListItemIcon>
        </ListItem>
      </List>
      <Divider classes={{ root: styles.divider }} />
      <List classes={{ root: styles.primaryLinks }}>
        {primaryLinksList(pathname).map(
          ({ text, icon: LinkIcon, to = "/", dataActive }) => (
            <ListItem
              key={text}
              button
              to={to}
              component={Link}
              selected={dataActive}
              classes={{
                root: styles.listLinkThin,
                selected: styles.listLinkSelected,
              }}
            >
              <ListItemIcon
                classes={{
                  root: `${styles.listItemIcon} ${dataActive && styles.listItemIconSelected
                    }`,
                }}
              >
                <LinkIcon />
              </ListItemIcon>
            </ListItem>
          )
        )}
      </List>
      <Divider classes={{ root: styles.divider }} />
      <List classes={{ root: styles.secondaryLinksThin }}>
        {secondaryLinks().map(({ to, icon: LinkIcon }) => (
          <ListItem
            key={to}
            button
            href={to}
            component="a"
            classes={{
              root: styles.listLinkSecondary,
              gutters: styles.listItemIcon,
            }}
          >
            <ListItemIcon
              classes={{
                root: styles.listItemIcon,
              }}
            >
              <LinkIcon />
            </ListItemIcon>
          </ListItem>
        ))}
      </List>
      <List>
        <ListItem classes={{ root: styles.listItemThin }} button>
          <ListItemIcon classes={{ root: styles.listItemIcon }}>
            <KeyboardReturnIcon />
          </ListItemIcon>
        </ListItem>
      </List>
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
            paper: styles.drawerLg,
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
            paper: styles.drawerSm,
          }}
        >
          {drawerThin}
        </Drawer>
      </Hidden>
      <Hidden only={["xs", "sm"]}>
        <Drawer
          variant="permanent"
          classes={{
            root: styles.sidebarLg,
            paper: styles.drawerLg,
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
    </>
  );
};

export default SideBar;
