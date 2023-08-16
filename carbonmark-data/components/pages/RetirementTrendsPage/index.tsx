import { Trans } from "@lingui/macro";
/**
 * A UI layout component to position Retirement Trends pages content
 */
export default function RetirementTrendsPage(props: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <h1>
        <Trans>Retirement trends</Trans>
      </h1>
      <a href="/trends/by-pool">
        <Trans>By pool</Trans>
      </a>
      <a href="/trends/by-token">
        <Trans>By token</Trans>
      </a>
      <a href="/trends/by-chain">
        <Trans>By chain</Trans>
      </a>
      <a href="/trends/by-beneficiary">
        <Trans>By beneficiary</Trans>
      </a>
      {props.children}
    </div>
  );
}
