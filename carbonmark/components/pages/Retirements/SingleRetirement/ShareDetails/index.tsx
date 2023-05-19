import { Anchor as A } from "@klimadao/lib/components";
import { t, Trans } from "@lingui/macro";
import LaunchIcon from "@mui/icons-material/Launch";
import { ButtonPrimary } from "components/Buttons/ButtonPrimary";
import { CopyAddressButton } from "components/CopyAddressButton";
import { FacebookButton } from "components/FacebookButton";
import { LinkedInButton } from "components/LinkedInButton";
import { Text } from "components/Text";
import { TweetButton } from "components/TweetButton";
import { urls } from "lib/constants";
import dynamic from "next/dynamic";
import { FC } from "react";
import { DownloadCertificateButtonProps } from "../DownloadCertificateButton";
import * as styles from "./styles";

type Props = {
  retiree: string;
  formattedAmount: string;
  retirementIndex: string;
  beneficiaryName: string;
  beneficiaryAddress: string;
};

const DownloadCertificateButton: React.ComponentType<DownloadCertificateButtonProps> =
  dynamic(
    () =>
      import("../DownloadCertificateButton").then(
        (mod) => mod.DownloadCertificateButton
      ),
    {
      ssr: false,
      loading: () => (
        <ButtonPrimary
          disabled
          label={t({
            id: "shared.loading",
            message: "Loading...",
          })}
        />
      ),
    }
  );

export const ShareDetails: FC<Props> = (props) => (
  <div className={styles.shareCard}>
    <Text t="button" color="lightest">
      <Trans id="retirement.single.share_retirement.title">
        Share this retirement
      </Trans>
    </Text>
    <div className={styles.content}>
      {props.beneficiaryName && props.beneficiaryAddress ? (
        <DownloadCertificateButton
          retirementIndex={props.retirementIndex}
          beneficiaryName={props.beneficiaryName}
          beneficiaryAddress={props.beneficiaryAddress}
        />
      ) : null}
      <div className={styles.socialLinks}>
        <div className="buttons">
          <TweetButton
            title={`${props.retiree} retired ${props.formattedAmount} Tonnes of carbon`}
            tags={["Carbonmark", "Offset"]}
          />
          <FacebookButton />
          <LinkedInButton />
          <CopyAddressButton />
        </div>
      </div>
    </div>
    <A className={styles.profileLink} href={urls.projects}>
      {t`Create your own retirement`}
      <LaunchIcon />
    </A>
  </div>
);
