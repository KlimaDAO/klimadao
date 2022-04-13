import React, { useState } from "react";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { ButtonPrimary, Text } from "@klimadao/lib/components";

import { PledgeLayout } from "./PledgeLayout";
import * as styles from "./styles";

type Props = {
  pledge: PledgeType;
};

const defaultValues = (pledge: PledgeType) =>
  Object.assign(
    {
      address: "",
      description: "Write your pledge today!",
      footprint: [0],
      methodology: "How will you meet your pledge?",
      name: "",
    },
    pledge
  );

export const Pledge: NextPage = () => {
  const router = useRouter();
  const [address, setAddress] = useState("");
  const [error, setError] = useState(false);
  const [pledge, _setPledge] = useState<PledgeType>(
    defaultValues(props.pledge)
  );

  const handleAddressInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAddress(event.currentTarget.value);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleSubmit();
  };

  const handleSubmit = () => {
    try {
      ethers.utils.getAddress(address);
      router.push(`/pledge/${address}`);
    } catch {
      setError(true);
    }
  };

  return (
    <PledgeLayout>
      <div className={styles.container}>
        <form className={styles.inputContainer} onSubmit={handleFormSubmit}>
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

          <ButtonPrimary label="Search" onClick={handleSubmit} />
        </form>
      </div>
    </PledgeLayout>
  );
};
