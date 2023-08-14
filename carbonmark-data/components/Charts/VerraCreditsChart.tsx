import { t } from "@lingui/macro";
import { helpers } from "lib/charts";
import { ChartData } from "lib/charts/getVerraCredits";
import { FC } from "react";
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { palette } from "theme/palette";
import { ChartContainer } from "./ChartContainer";

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
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tickFormatter={helpers.formatDateAsMonths} ticks={helpers.niceTicks(data)} />
                    <YAxis tickFormatter={helpers.formatQuantityAsMillions} />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" stackId="1" dataKey="toucan" connectNulls fill={palette.charts.color1} fillOpacity="1" />
                    <Area type="monotone" stackId="1" dataKey="moss" connectNulls fill={palette.charts.color4} fillOpacity="1" />
                    <Area type="monotone" stackId="1" dataKey="c3" connectNulls fill={palette.charts.color7} fillOpacity="1" />
                </AreaChart >
            </ResponsiveContainer>
        </ChartContainer >
    );
}
