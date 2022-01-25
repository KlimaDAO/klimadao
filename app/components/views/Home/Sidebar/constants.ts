import CreditCardIcon from "@material-ui/icons/CreditCard";
import AddToPhotosOutlinedIcon from "@material-ui/icons/AddToPhotosOutlined";
import SpeedIcon from "@material-ui/icons/Speed";
import EcoOutlinedIcon from "@material-ui/icons/EcoOutlined";
import FlipIcon from "@material-ui/icons/Flip";
import TwitterIcon from "@material-ui/icons/Twitter";

interface Link {
  to: string;
  show: boolean;
  text: string;
  dataActive: boolean;
}

export const getPrimaryLinks = ({ path }: { path: string }) => [
  {
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
    icon: SpeedIcon,
    to: "/",
    text: "Carbon Offset",
    dataActive: path === "/",
  },
];

export const getSecondaryLinks = () => [
  {
    icon: TwitterIcon,
    text: "Circles",
    link: "www.google.com",
  },
  {
    icon: TwitterIcon,
    text: "Discord",
    link: "www.discord.com",
  },
  {
    icon: TwitterIcon,
    text: "Twitter",
    link: "www.twitter.com",
  },
  {
    icon: TwitterIcon,
    text: "Lifesaver",
    link: "www.google.com",
  },
];
