"use client"; // use client for recharts animations
import { TreeMapData } from "lib/charts/types";
import { Component } from "react";
import { ResponsiveContainer, Treemap } from "recharts";
import { palette } from "theme/palette";

interface Props {
  data: TreeMapData;
}
export default function Chart(props: Props) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <Treemap data={props.data} 
      dataKey="size"
      aspectRatio={1}
      content={<DemoTreemapItem x={0} y={0} depth={0} width={0} height={0} index={0} name=""/>}
      >
      </Treemap>
    </ResponsiveContainer>
  );
}
/** Adapted from https://github.com/recharts/recharts/blob/master/demo/component/DemoTreemapItem.tsx */
class DemoTreemapItem extends Component<{
  depth: number
  x: number
  y: number
  width: number
  height: number
  index: number
  name: string
}> {
  static displayName = 'TreemapItemDemo';

  static defaultProps = {};

  render() {
    const { depth, x, y, width, height, index, name } = this.props;
    const bgColors = Object.values(palette.charts);
    const fontSize = (18 * (width / 800)).toFixed(0)
    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill={depth < 2 ? bgColors[index % 6] : 'rgba(255,255,255,0)'}
        />
        {depth === 1 ? (
          <text x={x + width / 2} y={y + height / 2 + 9} textAnchor="middle" fill="#313131" stroke="none" fontSize={fontSize}>
            {name}
          </text>
        ) : null}
      </g>
    );
  }
}
