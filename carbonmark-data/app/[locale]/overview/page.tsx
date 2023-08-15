"use client"
import { Trans } from "@lingui/macro";
import OverviewCard from "components/OverviewCard";
import Skeleton from "components/Skeleton";
import VerraCreditsChart from "components/charts/VerraCredits";
import * as chartStyles from "components/charts/styles";
import { Suspense } from "react";
import * as styles from "./styles";

/** Overview page (index/landing page) captured via rewrite in next.config.js*/
export default function OverviewPage() {
    return (
        <div>
            <h1><Trans>State of the digital carbon market</Trans></h1>
            <div className={styles.global}>
                <div className={styles.mainColumn}>
                    <div className={chartStyles.chartRow}>
                        <OverviewCard title="Verra credits" href="/details/verra-credits">
                            <Suspense fallback={<Skeleton />}>
                                <VerraCreditsChart />
                            </Suspense>
                        </OverviewCard>
                    </div>
                </div>
            </div>
        </div>
    );
}