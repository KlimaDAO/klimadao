import { t } from "@lingui/macro";
import { ChartData } from "lib/chartsData/getVerraCredits";
import { FC } from "react";
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ChartContainer } from "./ChartContainer";

interface Props {
    data: ChartData
}
export const VerraCreditsChart: FC<Props> = ({ data }) => {
    return (
        <ChartContainer title={t`Verra Credits`}>            <ResponsiveContainer width="100%" height="100%">
            <AreaChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" scale="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" stackId="1" dataKey="toucan" connectNulls fill="#8884d8" activeDot={{ r: 8 }} />
                <Area type="monotone" stackId="1" dataKey="moss" connectNulls fill="#ca829d" />
                <Area type="monotone" stackId="1" dataKey="c3" connectNulls fill="#82ca9d" />
            </AreaChart >
        </ResponsiveContainer>
        </ChartContainer >
    );
}
