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
    const tokens = name.trim().split(" ");
    const nbTokens = tokens.length;
    const yGap = 2;

    // Compute font size
    const maxfontSizeX = Math.min(
      ...tokens.map((token) => Math.abs((width * 1.5) / token.length))
    );
    const maxfontSizeY = Math.max(height / nbTokens - yGap, 1);
    const fontSize = Math.min(maxfontSizeX, maxfontSizeY);

    // Compute starting y position of text
    const textMidY = y + height / 2;
    const textHeight = nbTokens * (fontSize + yGap) - yGap;
    const textStartY = textMidY - textHeight / 2 + fontSize;

    const bgColor = bgColors[index % 5];
    const txtColor = bgColors[(index + 3) % 5];
    return (
      <g>
        <rect x={x} y={y} width={width} height={height} fill={bgColor}></rect>
        {tokens.map((token, index) => (
          <text
            key={index}
            x={x + width / 2}
            y={textStartY + (fontSize + yGap) * index}
            textAnchor="middle"
            fill={txtColor}
            stroke="none"
            fontSize={fontSize}
          >
            {token}
          </text>
        ))}
      </g>
    );
  }
}
