import { useParams } from "next/navigation";

// Returns bridge info given a bridge parameter in the url
function useChainInfo(): { chain: string; chainLabel: string } {
  const { chain } = useParams();
  // Captalize chain
  const chainLabel = chain.charAt(0).toUpperCase() + chain.slice(1);
  return {
    chain,
    chainLabel,
  };
}
export default useChainInfo;
