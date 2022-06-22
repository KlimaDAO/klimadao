import { useContext } from "react";
import { Web3Context } from "../../components/Web3Context";

/**
 * A hook for accessing the Web3Context. Must be child of context provider.
 * @example const { provider, address, signer, isConnected } = useWeb3();
 */
export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (context === undefined) {
    throw new Error("useWeb3 must be used within a Web3ContextProvider");
  }
  return context;
};
