import { Anchor as A, CopyValueButton } from "@klimadao/lib/components";
import { t, Trans } from "@lingui/macro";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import LaunchIcon from "@mui/icons-material/Launch";
import { ButtonPrimary } from "components/Buttons/ButtonPrimary";
import { FacebookButton } from "components/FacebookButton";
import { LinkedInButton } from "components/LinkedInButton";
import { Spinner } from "components/shared/Spinner";
import { Text } from "components/Text";
import { TweetButton } from "components/TweetButton";
import { getRetirementCertificate } from "lib/api";
import { urls } from "lib/constants";
import { FC, useState } from "react";
import * as styles from "./styles";

type Props = {
  retiree: string;
  formattedAmount: string;
  retirementIndex: string;
  beneficiaryName: string;
  beneficiaryAddress: string;
};

export const ShareDetails: FC<Props> = (props) => {
  const [downloading, setDownloading] = useState(false);
  return (
    <div className={styles.shareCard}>
      <Text t="button" color="lightest">
        <Trans id="retirement.single.share_retirement.title">
          Share this retirement
        </Trans>
      </Text>
      <div className={styles.content}>
        {props.beneficiaryAddress && (
          <ButtonPrimary
            label={downloading ? t`Downloading ...` : t`Download PDF`}
            icon={
              downloading ? (
                <div className={styles.spinner}>
                  <Spinner />
                </div>
              ) : (
                <FileDownloadOutlinedIcon />
              )
            }
            className={styles.downloadButton}
            onClick={async () => {
              setDownloading(true);
              await getRetirementCertificate(props);
              setDownloading(false);
            }}
          />
        )}
        <div className={styles.socialLinks}>
          <div className="buttons">
            <TweetButton
              title={`${props.retiree} retired ${props.formattedAmount} Tonnes of carbon`}
              tags={["Carbonmark", "retirement"]}
            />
            <FacebookButton />
            <LinkedInButton />
            <CopyValueButton />
          </div>
        </div>
      </div>
      <A className={styles.profileLink} href={urls.projects}>
        {t`Create your own retirement`}
        <LaunchIcon />
      </A>
    </div>
  );
};
