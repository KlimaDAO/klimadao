import CreditCardIcon from "@material-ui/icons/CreditCard";
import AddToPhotosOutlinedIcon from "@material-ui/icons/AddToPhotosOutlined";
import SpeedIcon from "@material-ui/icons/Speed";
import EcoOutlinedIcon from "@material-ui/icons/EcoOutlined";
import FlipIcon from "@material-ui/icons/Flip";
import TwitterIcon from "@material-ui/icons/Twitter";

interface Link {
  // do we need this?
  to: string;
  show: boolean;
  text: string;
  dataActive: boolean;
}

export const primaryLinks = ({ path }: { path: string }) => [
  {
    // need correct path
    icon: CreditCardIcon,
    to: "/",
    text: "Buy Klima",
    dataActive: path === "/",
  },
  {
    icon: AddToPhotosOutlinedIcon,
    to: "/stake",
    text: "Stake Klima",
    dataActive: path === "/stake",
  },
  {
    icon: EcoOutlinedIcon,
    to: "/bonds",
    text: "Bond Carbon",
    dataActive: path.includes("/bonds"),
  },
  {
    icon: FlipIcon,
    to: "/wrap",
    text: "Wrap",
    dataActive: path === "/wrap",
  },
  {
    // need correct path
    icon: SpeedIcon,
    to: "/",
    text: "Carbon Offset",
    dataActive: path === "/",
  },
];

export const secondaryLinks = () => [
  // need correct links for all
  // need all icons except twitter
  {
    icon: TwitterIcon,
    to: "https://www.google.com",
  },
  {
    icon: TwitterIcon,
    to: "https://www.discord.com",
  },
  {
    icon: TwitterIcon,
    to: "https://www.twitter.com",
  },
  {
    icon: TwitterIcon,
    to: "https://www.google.com",
  },
];