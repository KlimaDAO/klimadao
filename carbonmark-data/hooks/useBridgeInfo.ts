import { useParams } from "next/navigation";

// Returns bridge info given a bridge parameter in the url
function useBridgeInfo(): { bridge: string; bridgeLabel: string } {
  const bridge = useParams().bridge;
  // Captalize bridge
  const bridgeLabel = bridge.charAt(0).toUpperCase() + bridge.slice(1);
  return {
    bridge,
    bridgeLabel,
  };
}
export default useBridgeInfo;
