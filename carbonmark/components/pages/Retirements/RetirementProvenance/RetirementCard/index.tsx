import { Retirement } from ".generated/carbonmark-api-sdk/types";
import { Anchor as A } from "@klimadao/lib/components";
import { concatAddress, formatTonnes } from "@klimadao/lib/utils";
import { t } from "@lingui/macro";
import { ParkOutlined, Today } from "@mui/icons-material";
import LaunchIcon from "@mui/icons-material/Launch";
import { Text } from "components/Text";
import { ProfileLogo } from "components/pages/Users/ProfileLogo";
import { urls as carbonmarkUrls } from "lib/constants";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import * as styles from "./styles";

interface ProvenanceProps {
  retirement: Retirement;
  retirementIndex: string;
  beneficiaryAddress: string;
}

const getFormattedDate = (timestamp: number, locale = "en") => {
  const dateObj = new Date(timestamp * 1000); //expects milliseconds
  return new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(dateObj);
};

/** Helper that formats retirement information */
const RetirementCardItem = (props: {
  title: string;
  icon: ReactNode;
  text: string;
}) => {
  return (
    <div className={styles.headerItem}>
      <Text t="body3" color="lightest" uppercase={true}>
        {props.title}
      </Text>
      <Text t="body1" color="lightest" className={styles.iconAndText}>
        {props.icon}
        {props.text}
      </Text>
    </div>
  );
};

/**
 * Renders the retirement card
 * @param props
 * @returns
 */
export const RetirementCard = (props: ProvenanceProps) => {
  const { locale } = useRouter();
  const formattedAmount = formatTonnes({
    amount: props.retirement.amount.toString(),
    locale: locale || "en",
  });
  const retireeProfile = props.retirement.retireeProfile;
  const date = getFormattedDate(props.retirement.timestamp);
  // Selects the best information available regarding the retiree
  const by = retireeProfile
    ? retireeProfile.username ?? retireeProfile.handle
    : concatAddress(props.retirement.retiringAddress);

  // Logo to be displayed alongside the retiree info / Nothing if it is not a carbonmark user
  const ByIcon = retireeProfile ? (
    <ProfileLogo
      isCarbonmarkUser={true}
      profileImgUrl={retireeProfile.profileImgUrl}
      className={styles.profileImage}
    />
  ) : (
    <></>
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <RetirementCardItem
          title={t`Amount`}
          icon={<ParkOutlined fontSize="large" />}
          text={t`${formattedAmount} Tonnes`}
        />
        <RetirementCardItem title={t`By`} icon={ByIcon} text={by} />
        <RetirementCardItem
          title={t`Date`}
          icon={<Today fontSize="large" />}
          text={date}
        />
      </div>
      <div className={styles.footer}>
        <A
          className={styles.profileLink}
          href={`${carbonmarkUrls.retirements}/${props.beneficiaryAddress}/${props.retirementIndex}`}
        >
          {t`View retirement`}
          <LaunchIcon />
        </A>
      </div>
    </div>
  );
};
