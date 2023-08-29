import {
  GitHub,
  LinkedIn,
  Reddit,
  RssFeed,
  Telegram,
  Twitter,
  YouTube,
} from "@mui/icons-material";
import { Link } from "@mui/material";
import { FC } from "react";
import styles from "./style.module.scss";

export const Footer: FC = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footerNavLinks}>
        <Link href="#">Home</Link>
        <Link href="#" className={styles.mobileOnly}>
          Buy
        </Link>
        <Link href="#" className={styles.mobileOnly}>
          Stake
        </Link>
        <Link href="#" className={styles.mobileOnly}>
          App
        </Link>
        <Link href="#" className={styles.mobileOnly}>
          Docs
        </Link>
        <Link href="#" className={styles.desktopOnly}>
          Klima App
        </Link>
        <Link href="#" className={styles.desktopOnly}>
          Carbonmark
        </Link>
        <Link href="#" className={styles.desktopOnly}>
          Klima Data
        </Link>
        <Link href="#" className={styles.desktopOnly}>
          Official Docs
        </Link>
        <Link href="#">Blog</Link>
        <Link href="#">Contact</Link>
        <Link href="#">Disclaimer</Link>
      </div>
      <div className={styles.footerSocialLinks}>
        <Link href="#">
          <Twitter />
        </Link>
        <Link href="#">
          <YouTube />
        </Link>
        <Link href="#">
          <DiscordSvg />
        </Link>
        <Link href="#" className={styles.mobileOnly}>
          <Reddit />
        </Link>
        <Link href="#" className={styles.mobileOnly}>
          <GitHub />
        </Link>
        <Link href="#">
          <LinkedIn />
        </Link>
        <Link href="#">
          <Telegram />
        </Link>
        <Link href="#" className={styles.mobileOnly}>
          <RssFeed />
        </Link>
      </div>
    </div>
  );
};

const DiscordSvg = () => {
  return (
    <svg
      width="20"
      height="16"
      viewBox="0 0 20 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.9308 1.63331C15.6561 1.04841 14.2892 0.617476 12.8599 0.370664C12.8339 0.365901 12.8079 0.377805 12.7945 0.401613C12.6187 0.714292 12.4239 1.12221 12.2876 1.44283C10.7503 1.21269 9.22099 1.21269 7.71527 1.44283C7.57887 1.11508 7.37707 0.714292 7.20048 0.401613C7.18707 0.378599 7.16107 0.366695 7.13504 0.370664C5.70659 0.616687 4.33963 1.04762 3.06411 1.63331C3.05307 1.63807 3.04361 1.64601 3.03732 1.65632C0.444493 5.52995 -0.265792 9.30838 0.0826501 13.04C0.0842267 13.0582 0.0944749 13.0757 0.108665 13.0868C1.81934 14.3431 3.47642 15.1057 5.10273 15.6113C5.12876 15.6192 5.15634 15.6097 5.1729 15.5882C5.55761 15.0629 5.90054 14.5089 6.19456 13.9264C6.21192 13.8923 6.19535 13.8518 6.15989 13.8383C5.61594 13.632 5.098 13.3804 4.59977 13.0947C4.56037 13.0717 4.55721 13.0153 4.59347 12.9883C4.69831 12.9098 4.80318 12.828 4.9033 12.7455C4.92141 12.7304 4.94665 12.7273 4.96794 12.7368C8.24107 14.2312 11.7846 14.2312 15.0191 12.7368C15.0404 12.7265 15.0657 12.7296 15.0846 12.7447C15.1847 12.8273 15.2895 12.9098 15.3952 12.9883C15.4314 13.0153 15.4291 13.0717 15.3897 13.0947C14.8914 13.386 14.3735 13.632 13.8288 13.8375C13.7933 13.851 13.7775 13.8923 13.7949 13.9264C14.0952 14.5081 14.4381 15.0621 14.8157 15.5874C14.8315 15.6097 14.8599 15.6192 14.8859 15.6113C16.5201 15.1057 18.1772 14.3431 19.8879 13.0868C19.9028 13.0757 19.9123 13.059 19.9139 13.0407C20.3309 8.72663 19.2154 4.97919 16.9568 1.65711C16.9513 1.64601 16.9419 1.63807 16.9308 1.63331ZM6.68335 10.7678C5.69792 10.7678 4.88594 9.86311 4.88594 8.75204C4.88594 7.64097 5.68217 6.73626 6.68335 6.73626C7.69239 6.73626 8.49651 7.64891 8.48073 8.75204C8.48073 9.86311 7.68451 10.7678 6.68335 10.7678ZM13.329 10.7678C12.3435 10.7678 11.5316 9.86311 11.5316 8.75204C11.5316 7.64097 12.3278 6.73626 13.329 6.73626C14.338 6.73626 15.1421 7.64891 15.1264 8.75204C15.1264 9.86311 14.338 10.7678 13.329 10.7678Z"
        fill="white"
      />
    </svg>
  );
};
