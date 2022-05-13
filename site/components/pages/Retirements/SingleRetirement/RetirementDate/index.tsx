import { FC } from "react";
import { Trans } from "@lingui/macro";
import { useRouter } from "next/router";
import { TextGroup } from "../TextGroup";

type Props = {
  timestamp: string; // 10 digits
};

export const RetirementDate: FC<Props> = ({ timestamp }) => {
  const { locale } = useRouter();
  const retirementDate = new Date(parseInt(timestamp) * 1000); //expects milliseconds
  const formattedDate = new Intl.DateTimeFormat(locale, {
    dateStyle: "full",
  }).format(retirementDate);

  return (
    <TextGroup
      title={<Trans id="retirement.single.retirementDate.title">Date</Trans>}
      text={formattedDate}
    />
  );
};
