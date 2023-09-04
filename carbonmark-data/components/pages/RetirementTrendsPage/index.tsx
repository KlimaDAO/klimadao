import { t } from "@lingui/macro";
import Link from "components/Link";
/**
 * A UI layout component to position Retirement Trends pages content
 */
export default function RetirementTrendsPage(props: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <h1>{t`Retirement trends`}</h1>
      <Link href="/trends/by-pool">{t`By pool`}</Link>
      <Link href="/trends/by-token">{t`By token`}</Link>
      <Link href="/trends/by-chain">{t`By chain`}</Link>
      <Link href="/trends/by-beneficiary">{t`By beneficiary`}</Link>
      {props.children}
    </div>
  );
}
