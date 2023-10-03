"use client"; // use client for recharts animations
import { TreeMapData } from "lib/charts/types";
import { Treemap } from "recharts";
import ChartWrapper from "../helpers/ChartWrapper";
import TreeMapItem from "../helpers/TreeMapItem";

interface Props {
  data: TreeMapData;
}
export default function Chart(props: Props) {
  return (
    <ChartWrapper data={props.data}>
      <Treemap
        data={props.data}
        dataKey="size"
        aspectRatio={1}
        content={<TreeMapItem />}
      ></Treemap>
    </ChartWrapper>
  );
}
