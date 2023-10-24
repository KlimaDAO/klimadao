"use client"
import {
  ConfigurationKey,
  getDesktopRenderer,
  getMobileRenderer,
} from "../configurations";
import { DataRendererProps } from "../configurations/types";

/** A Server component that renders a single page Data Table */
export default function Table<RI, P>(props: DataRendererProps<RI, P> & {
  configurationKey: ConfigurationKey
  renderer: "desktop" | "mobile"
}) {
  const renderer = props.renderer == "desktop" ? getDesktopRenderer<RI, P>(props.configurationKey) : getMobileRenderer<RI, P>(props.configurationKey);
  const rendererProps = { data: props.data, params: props.params }
  return renderer(rendererProps)
}
