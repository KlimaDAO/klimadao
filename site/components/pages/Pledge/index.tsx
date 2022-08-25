import React, { useState } from "react";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { t } from "@lingui/macro";
import { ButtonPrimary, Text } from "@klimadao/lib/components";
import { getIsDomainInURL } from "lib/getIsDomainInURL";

import { PageHead } from "components/PageHead";
import * as styles from "./styles";
import { InputField } from "components/Form";
import { SocialProof } from "components/SocialProof";

import { Navigation } from "components/Navigation";
import { Footer } from "components/Footer";

export const Pledge: NextPage = () => {
  const router = useRouter();
  const [error, setError] = useState(false);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setError(true);

    event.preventDefault();

    const address = event.currentTarget.address.value;

    if (!ethers.utils.isAddress(address) && !getIsDomainInURL(address)) {
      return setError(true);
    }

    router.push(`/pledge/${address}`);
  };

  const errorMessages = error
    ? {
        message: "Enter a wallet address, .klima or .eth domain",
      }
    : undefined;

  return (
    <>
      <PageHead
        title={t({
          id: "pledges.head.title",
          message: "KlimaDAO | Pledges",
        })}
        mediaTitle={t({
          id: "pledges.head.metaTitle",
          message: "Create a carbon pledge and showcase your impact",
        })}
        metaDescription={t({
          id: "pledges.head.metaDescription",
          message:
            "Demonstrate your commitment to climate positivity by claiming your pledge dashboard to highlight all of your carbon offsetting activity",
        })}
      />

      <div className={styles.pageContainer}>
        <div className={styles.headerContainer}>
          <Navigation activePage="Pledges" />
        </div>

        <div className={styles.heroContainer}>
          <section className={styles.hero}>
            <div className="inner">
              <Text t="h2_alt" as="h1" align="center">
                Create a carbon pledge and showcase your impact
              </Text>

              <Text t="h4" as="p" align="center">
                Demonstrate your commitment to climate positivity by claiming
                your pledge dashboard to highlight all of your carbon offsetting
                activity
              </Text>

              <div className="actions">
                <ButtonPrimary variant="blue" label="Create a pledge" />
                <ButtonPrimary variant="gray" label="Learn more" />
              </div>
            </div>
          </section>
        </div>

        <div className={styles.container}>
          <SocialProof />

          <main className={styles.search}>
            <Text t="h2_alt" as="h2" align="center">
              Search for a wallet address
            </Text>

            <form onSubmit={handleFormSubmit}>
              <div>
                <InputField
                  hideLabel
                  name="address"
                  id="address"
                  label={t({
                    id: "",
                    message: "ENS or 0x address",
                  })}
                  placeholder={t({
                    id: "",
                    message: "Enter ENS or 0x address",
                  })}
                  type="text"
                  errors={errorMessages}
                />
                {/* {error && (
                  <Text t="caption" as="p" className="error">
                    {error}
                  </Text>
                )} */}
              </div>

              <ButtonPrimary type="submit" variant="blue" label="Search" />
            </form>
          </main>

          <section className={styles.getStarted}>
            <Text t="h2_alt" as="h2" align="center">
              Get started
            </Text>

            <ol>
              <li>
                <Text t="caption" as="h3" align="center">
                  Step 1
                </Text>

                <div className="inner">
                  <Text t="h4" as="h3" align="center">
                    Calculate your footprint
                  </Text>
                  <Text t="body6" as="p" align="center">
                    Discover your carbon emissions impact. See how you compare
                    to others.
                  </Text>
                </div>
              </li>

              <li>
                <Text t="caption" as="h3" align="center">
                  Step 2
                </Text>

                <div className="inner">
                  <Text t="h4" as="h3" align="center">
                    Create a pledge and offset your emissions
                  </Text>
                  <Text t="body6" as="p" align="center">
                    Description
                  </Text>
                </div>
              </li>

              <li>
                <Text t="caption" as="h3" align="center">
                  Step 3
                </Text>

                <div className="inner">
                  <Text t="h4" as="h3" align="center">
                    Watch your impact grow
                  </Text>
                  <Text t="body6" as="p" align="center">
                    Description
                  </Text>
                </div>
              </li>
            </ol>

            <ButtonPrimary variant="blue" label="Connect wallet" />
          </section>

          <section className={styles.banner}>
            <div className="inner">
              <Text t="h4" as="h2" align="center">
                Create your pledge and go climate positive
              </Text>
              <ButtonPrimary variant="blue" label="Get started" />
            </div>
          </section>
        </div>

        <Footer transparent />
      </div>
    </>
  );
};
