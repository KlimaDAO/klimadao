import { getDefaultProvider } from "@ethersproject/providers";
import { useEffect, useState } from "react";
import { providers } from 'ethers';
import { NOM_REGISTRY_ADDRESS } from "lib/constants";
//@ts-ignore
import ENS from '@ensdomains/ensjs';


const useENS = (address: string | null | undefined) => {
  const [ensName, setENSName] = useState<string | null | undefined>(null);
  const [ensAvatar, setENSAvatar] = useState<string | null | undefined>(null);
  const [nom, setNom] = useState<string | null>();
  const provider = new providers.JsonRpcProvider('https://forno.celo.org');

  useEffect(() => {
    const resolveENS = async () => {
      if (address) {
        const defaultProvider = await getDefaultProvider();
        const ensName = await defaultProvider.lookupAddress(address);
        const resolver = await defaultProvider.getResolver(ensName ?? "");
        const ensAvatar = await resolver?.getAvatar();
        setENSAvatar(ensAvatar?.url);
        setENSName(ensName);

        const nom = new ENS({ provider, ensAddress: NOM_REGISTRY_ADDRESS });
        try {
          const { name } = await nom.getName(address);
          if (name) setNom(`${name}.nom`);          
        } catch (e) {
          console.error('Could not fetch nom data', e);
        }
      }
    };
    resolveENS();
  }, [address, provider]);
  return { ensName, ensAvatar, nom };
};

export default useENS;
