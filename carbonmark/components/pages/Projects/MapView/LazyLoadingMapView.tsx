import { Skeleton } from "@mui/material";
import dynamic from "next/dynamic";
import ViewProps from "../props";

const DynamicMap = dynamic(async () => (await import("./MapView")).MapView, {
  loading: () => <Skeleton />,
});

export default function LazyLoadingMapView(props: ViewProps) {
  return <DynamicMap {...props} />;
}
