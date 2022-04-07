import React, { useState } from "react";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { ButtonPrimary, Text } from "@klimadao/lib/components";

import { PledgeLayout } from "./PledgeLayout";
import * as styles from "./styles";

export const Pledge: NextPage = () => {
  const router = useRouter();
  const [address, setAddress] = useState("");
  const [error, setError] = useState(false);

  const handleAddressInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAddress(event.currentTarget.value);
  };

  const handleClick = () => {
    try {
      ethers.utils.getAddress(address);
      router.push(`/pledge/${address.toLowerCase()}`);
    } catch {
      setError(true);
    }
  };

  return (
    <PledgeLayout>
      <div className={styles.container}>
        <div className={styles.inputContainer}>
          <input
            className={styles.input}
            placeholder="Search for a wallet address"
            value={address}
            onChange={handleAddressInputChange}
          />

          {error && (
            <Text className={styles.errorMessage} t="caption">
              Enter a valid ethereum wallet address
            </Text>
          )}

          <ButtonPrimary label="Search" onClick={handleClick} />
        </div>
      </div>
    </PledgeLayout>
  );
};
