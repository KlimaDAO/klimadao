import { useParams } from "next/navigation";

// Returns bridge info given a bridge parameter in the url
function useBridgeInfo(): { bridge: string; bridgeLabel: string } {
  let { bridge } = useParams();
  // Captalize bridge
  bridge = Array.isArray(bridge) ? bridge[0] : bridge;
  const bridgeLabel = bridge.charAt(0).toUpperCase() + bridge.slice(1);
  return {
    bridge,
    bridgeLabel,
  };
}
export default useBridgeInfo;
