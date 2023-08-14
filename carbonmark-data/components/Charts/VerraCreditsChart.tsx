import { t } from "@lingui/macro";
import { helpers } from "lib/charts";
import { ChartData } from "lib/charts/getVerraCredits";
import { FC } from "react";
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { palette } from "theme/palette";
import { ChartContainer } from "./ChartContainer";
import * as styles from "./styles";

interface Props {
    data: ChartData
}
export const VerraCreditsChart: FC<Props> = ({ data }) => {
    return (
        <ChartContainer title={t`Verra Credits`}>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                    }}
                >
                    <CartesianGrid horizontal={false} vertical={false} />
                    <XAxis dataKey="date" tickFormatter={helpers.formatDateAsMonths} ticks={helpers.niceTicks(data)} tickLine={false} />
                    <YAxis tickFormatter={helpers.formatQuantityAsMillions} tickLine={false} />
                    <Tooltip />
                    <Legend
                        layout="horizontal" verticalAlign="bottom" align="left"
                        payload={
                            [
                                { id: 'toucan', value: 'Toucan', type: 'circle', color: palette.charts.color1 },
                                { id: 'moss', value: 'Moss', type: 'circle', color: palette.charts.color4 },
                                { id: 'c3', value: 'C3', type: 'circle', color: palette.charts.color7 },
                            ]
                        }
                        formatter={(value, entry, index) => <span className={styles.chartLegendText}>{value}</span>}
                    />
                    <Area type="monotone" name={t`Toucan`} stackId="1" dataKey="toucan" connectNulls fillOpacity="1" fill={palette.charts.color1} stroke={palette.charts.color1} />
                    <Area type="monotone" name={t`Moss`} stackId="1" dataKey="moss" connectNulls stroke={palette.charts.color4} fill={palette.charts.color4} fillOpacity="1" />
                    <Area type="monotone" name={t`C3`} stackId="1" dataKey="c3" connectNulls stroke={palette.charts.color7} fill={palette.charts.color7} fillOpacity="1" />
                </AreaChart >
            </ResponsiveContainer>
        </ChartContainer >
    );
}
