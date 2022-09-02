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
  const [submitting, setSubmitting] = useState(false);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setSubmitting(true);
    setError(false);

    event.preventDefault();

    const address = event.currentTarget.address.value;

    if (ethers.utils.isAddress(address) || getIsDomainInURL(address)) {
      await router.push(`/pledge/${address}`);
    } else {
      setError(true);
    }

    setSubmitting(false);
  };

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
              <Text
                t="h2_alt"
                as="h1"
                align="center"
                id="pledges.home.hero.title"
              >
                Create a carbon pledge and showcase your impact
              </Text>

              <Text
                t="h4"
                as="p"
                align="center"
                id="pledges.home.hero.description"
              >
                Demonstrate your commitment to climate positivity by claiming
                your pledge dashboard to highlight all of your carbon offsetting
                activity
              </Text>

              <div className="actions">
                <ButtonPrimary
                  variant="blue"
                  label={t({
                    message: "Create a pledge",
                    id: "pledges.home.hero.create",
                  })}
                />
                <ButtonPrimary
                  variant="gray"
                  href="/blog/klima-infinity-user-guide/"
                  label={t({
                    message: "Learn more",
                    id: "pledges.home.hero.learn_more",
                  })}
                />
              </div>
            </div>
          </section>
        </div>

        <div className={styles.container}>
          <SocialProof />

          <main className={styles.search}>
            <Text
              t="h2_alt"
              as="h2"
              align="center"
              id="pledges.home.search.title"
            >
              Search for a wallet address
            </Text>

            <form onSubmit={handleFormSubmit}>
              <div>
                <InputField
                  hideLabel
                  name="address"
                  id="address"
                  label={t({
                    id: "pledges.home.search.label",
                    message: "ENS or 0x address",
                  })}
                  placeholder={t({
                    id: "pledges.home.search.placeholder",
                    message: "Enter ENS or 0x address",
                  })}
                  type="text"
                  errors={
                    error && {
                      message: t({
                        id: "pledges.form.error",
                        message:
                          "Enter a wallet address, .klima or .eth domain",
                      }),
                    }
                  }
                />
              </div>

              <ButtonPrimary
                disabled={submitting}
                type="submit"
                variant="blue"
                label={t({
                  id: "pledges.home.search.submit",
                  message: "Search",
                })}
              />
            </form>
          </main>

          <section className={styles.getStarted}>
            <Text
              t="h2_alt"
              as="h2"
              align="center"
              id="pledges.home.get_started.title"
            >
              Get started
            </Text>

            <ol>
              <li>
                <Text
                  t="caption"
                  as="h3"
                  align="center"
                  id="pledges.get_started.footprint.label"
                >
                  Step 1
                </Text>

                <div className="inner">
                  <Text
                    t="h4"
                    as="h3"
                    align="center"
                    id="pledges.get_started.footprint.title"
                  >
                    Calculate your footprint
                  </Text>

                  <Text
                    t="body6"
                    as="p"
                    align="center"
                    id="pledges.get_started.footprint.description"
                  >
                    Discover your carbon emissions impact. See how you compare
                    to others.
                  </Text>
                </div>
              </li>

              <li>
                <Text
                  t="caption"
                  as="h3"
                  align="center"
                  id="pledges.get_started.offset.label"
                >
                  Step 2
                </Text>

                <div className="inner">
                  <Text
                    t="h4"
                    as="h3"
                    align="center"
                    id="pledges.get_started.offset.title"
                  >
                    Create a pledge and offset your emissions
                  </Text>

                  <Text
                    t="body6"
                    as="p"
                    align="center"
                    id="pledges.get_started.title.description"
                  >
                    Make a promise to your friends, family, and stakeholders to
                    reduce your emissions impact.
                  </Text>
                </div>
              </li>

              <li>
                <Text
                  t="caption"
                  as="h3"
                  align="center"
                  id="pledges.get_started.impact.label"
                >
                  Step 3
                </Text>

                <div className="inner">
                  <Text
                    t="h4"
                    as="h3"
                    align="center"
                    id="pledges.get_started.impact.title"
                  >
                    Watch your impact grow
                  </Text>

                  <Text
                    t="body6"
                    as="p"
                    align="center"
                    id="pledges.get_started.impact.description"
                  >
                    Track your progress and share your results on social media
                    as you work toward your emissions goals.
                  </Text>
                </div>
              </li>
            </ol>

            <ButtonPrimary
              variant="blue"
              label={t({
                id: "pledges.home.get_started.create",
                message: "Create a pledge",
              })}
            />
          </section>

          <section className={styles.banner}>
            <div className="inner">
              <Text
                t="h4"
                as="h2"
                align="center"
                id="pledges.home.banner.title"
              >
                Create your pledge and go climate positive
              </Text>

              <ButtonPrimary
                variant="blue"
                label={t({
                  id: "pledges.home.banner.create",
                  message: "Create a pledge",
                })}
              />
            </div>
          </section>
        </div>

        <Footer transparent />
      </div>
    </>
  );
};
