import { t } from "@lingui/macro";
import OverviewCard from "components/OverviewCard";
import VerraCreditsChart from "components/charts/VerraCreditsChart";
import { getCreditsBridgeOptions } from "lib/charts/options";
import { CreditsChartQueryParams } from "lib/charts/types";
import React, { Key } from "react";
import { palette } from "theme/palette";

/** Overview page (index/landing page) captured via rewrite in next.config.js*/
export default function VerraCreditsCard() {
    const charts: Record<Key, React.ReactNode> = {} as Record<
        Key,
        React.ReactNode
    >;

    ["offchain", "onchain"].forEach((bridge) => {
        let queries: Array<CreditsChartQueryParams>;
        let configuration;
        if (bridge == "onchain") {
            queries = [
                {
                    key: "toucan",
                    bridge: "toucan",
                    status: "bridged",
                    date_field: "bridged_date",
                },
                {
                    key: "c3",
                    bridge: "c3",
                    status: "bridged",
                    date_field: "bridged_date",
                },
                {
                    key: "moss",
                    bridge: "moss",
                    status: "bridged",
                    date_field: "bridged_date",
                },
            ];
            configuration = [
                {
                    id: "toucan",
                    label: "Toucan",
                    color: palette.charts.color5,
                    legendOrder: 3,
                },
                {
                    id: "moss",
                    label: "Moss",
                    color: palette.charts.color3,
                    legendOrder: 2,
                },
                {
                    id: "c3",
                    label: "C3",
                    color: palette.charts.color1,
                    legendOrder: 1,
                },
            ];
        } else {
            queries = [
                {
                    key: "offchain",
                    bridge: "offchain",
                    status: "issued",
                    date_field: "issuance_date",
                },
            ];
            configuration = [
                {
                    id: "offchain",
                    label: "Offchain",
                    color: palette.charts.color1,
                },
            ];
        }

        charts[bridge] = (
            <VerraCreditsChart
                queries={queries}
                configuration={configuration}
            ></VerraCreditsChart>
        );
    });
    return (
        <OverviewCard
            title={t`Verra credits`}
            detailUrl="/details/verra-credits-over-time"
            topOptions={getCreditsBridgeOptions()}
            charts={charts}
        />
    );
}
