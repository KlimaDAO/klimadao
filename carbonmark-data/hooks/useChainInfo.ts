import { useParams } from "next/navigation";

// Returns chain info given a chain parameter in the url
function useChainInfo(): { chain: string; chainLabel: string } {
  let { chain } = useParams();
  // Captalize chain
  chain = Array.isArray(chain) ? chain[0] : chain;
  const chainLabel = chain.charAt(0).toUpperCase() + chain.slice(1);
  return {
    chain,
    chainLabel,
  };
}
export default useChainInfo;
