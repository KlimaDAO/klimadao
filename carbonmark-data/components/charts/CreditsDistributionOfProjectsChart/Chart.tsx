"use client"; // use client for recharts animations
import { TreeMapData } from "lib/charts/types";
import { ResponsiveContainer, Treemap } from "recharts";
import TreeMapItem from "../helpers/TreeMapItem";

interface Props {
  data: TreeMapData;
}
export default function Chart(props: Props) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <Treemap
        data={props.data}
        dataKey="size"
        aspectRatio={1}
        content={<TreeMapItem />}
      ></Treemap>
    </ResponsiveContainer>
  );
}
