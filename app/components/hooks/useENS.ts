import { getDefaultProvider } from "@ethersproject/providers";
import { useEffect, useState } from "react";
import { providers } from 'ethers';
//@ts-ignore
import ENS from '@ensdomains/ensjs';
const NOM_REGISTRY_ADDRESS = '0x3DE51c3960400A0F752d3492652Ae4A0b2A36FB3';

const useENS = (address: string | null | undefined) => {
  const [ensName, setENSName] = useState<string | null | undefined>(null);
  const [ensAvatar, setENSAvatar] = useState<string | null | undefined>(null);
  const [nom, setNom] = useState<string | null>();
  const ensProvider = new providers.JsonRpcProvider('https://forno.celo.org');

  useEffect(() => {
    const resolveENS = async () => {
      if (address) {
        const provider = await getDefaultProvider();
        const ensName = await provider.lookupAddress(address);
        const resolver = await provider.getResolver(ensName ?? "");
        const ensAvatar = await resolver?.getAvatar();
        setENSAvatar(ensAvatar?.url);
        setENSName(ensName);

        const nom = new ENS({ provider: ensProvider, ensAddress: NOM_REGISTRY_ADDRESS });
        try {
          const { name } = await nom.getName(address);
          if (name) setNom(`${name}.nom`);          
        } catch (e) {
          console.error('Could not fetch nom data', e);
        }
      }
    };
    resolveENS();
  }, [address, ensProvider]);
  return { ensName, ensAvatar, nom };
};

export default useENS;
