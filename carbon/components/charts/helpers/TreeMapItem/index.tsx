import { Component } from "react";
import { palette } from "theme/palette";

/**
 * A component that renders Treemap items
 * Adapted from https://github.com/recharts/recharts/blob/master/demo/component/DemoTreemapItem.tsx
 * */
export default class TreemapItem extends Component<{
  depth?: number;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  index?: number;
  name?: string;
}> {
  render() {
    if (
      this.props.width === undefined ||
      this.props.height === undefined ||
      this.props.index === undefined ||
      this.props.name === undefined ||
      this.props.y === undefined ||
      this.props.x === undefined ||
      this.props.depth === undefined
    )
      return <></>;
    const { depth, x, y, width, height, index, name } = this.props;
    const bgColors = Object.values(palette.charts);

    const fontSize = Math.abs((width * 1.8) / name.length);

    const bgColor = bgColors[index % 5];
    const txtColor = bgColors[(index + 3) % 5];
    return (
      <g>
        <rect x={x} y={y} width={width} height={height} fill={bgColor}>
          <title>{name}</title>
        </rect>
        {depth === 1 ? (
          <text
            x={x + width / 2}
            y={y + (height + fontSize) / 2}
            textAnchor="middle"
            fill={txtColor}
            stroke="none"
            fontSize={fontSize}
          >
            <title>{name}</title>
            {name}
          </text>
        ) : null}
      </g>
    );
  }
}
