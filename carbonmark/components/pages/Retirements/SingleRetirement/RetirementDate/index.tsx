import { Trans } from "@lingui/macro";
import TodayOutlinedIcon from "@mui/icons-material/TodayOutlined";
import { Text } from "components/Text";
import { useRouter } from "next/router";
import { FC } from "react";

type Props = {
  timestamp: string | null; // 10 digits
};

export const RetirementDate: FC<Props> = ({ timestamp }) => {
  const { locale } = useRouter();
  const retirementDate = timestamp && new Date(parseInt(timestamp) * 1000); //expects milliseconds
  const formattedDate =
    retirementDate &&
    new Intl.DateTimeFormat(locale, {
      month: "long",
      day: "2-digit",
      year: "numeric",
    }).format(retirementDate);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1.45rem" }}>
      <TodayOutlinedIcon htmlColor="#626266" />
      <Text
        t="button"
        style={{
          // fontSize: "1.4rem",
          // lineHeight: "1.6rem",
          // textTransform: "uppercase",
          color: "var(--font-03)",
        }}
      >
        {formattedDate || (
          <Trans id="retirement.single.timestamp.placeholder">
            No retirement timestamp provided
          </Trans>
        )}
      </Text>
    </div>
  );
};
