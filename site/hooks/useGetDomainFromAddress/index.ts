import { Domain } from "@klimadao/lib/types/domains";
import { getENSProfile, getKNSProfile } from "@klimadao/lib/utils";
import { useEffect, useState } from "react";

/**
 * Given an account hash return the first matching Name Service
 * Currently supports KNS & ENS
 */
export const useGetDomainFromAddress = (address: string | undefined) => {
  const [profileData, setProfileData] = useState<Domain>();

  useEffect(() => {
    if (!address) return;

    const setProfile = async () => {
      const kns = await getKNSProfile({
        address: address,
      });

      if (kns) return setProfileData(kns);

      const ens = await getENSProfile({ address: address });
      if (ens) return setProfileData(ens);
    };

    setProfile();
  }, [address]);

  return profileData;
};
