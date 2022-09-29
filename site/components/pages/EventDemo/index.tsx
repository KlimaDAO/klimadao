import { useEffect, useState } from "react";
import {
  Anchor as A,
  ButtonPrimary,
  ButtonSecondary,
  KlimaInfinityLogo,
  Spinner,
  Text,
} from "@klimadao/lib/components";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputField, TextareaField } from "components/Form";
import { Navigation } from "components/Navigation";
import { PageHead } from "components/PageHead";
import { SubmitHandler, useForm } from "react-hook-form";
import { Footer } from "components/Footer";
import { Modal } from "components/Modal";

import * as styles from "./styles";
import Link from "next/link";
import { urls } from "@klimadao/lib/constants";
import { formSchema, FormSchema } from "./lib/formSchema";
import {
  RetirementData,
  retirementDataSchema,
} from "./lib/retirementDataSchema";
import { BackgroundDecor } from "./BackgroundDecor";

type View = undefined | "pending" | "success" | "error";

const EVENT_NAME = "event-demo-v1";

const singleOffsetTransaction = async (
  body: FormSchema
): Promise<RetirementData> => {
  try {
    const res = await fetch("/api/event-demo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const json = await res.json();
      throw new Error("Server error: " + json.message);
    }
    const retirementData = retirementDataSchema.validateSync(await res.json());
    saveToLocalStorage(EVENT_NAME, retirementData);
    return retirementData;
  } catch (e: unknown) {
    console.error(e);
    throw e;
  }
};

const loadFromLocalStorage = (
  eventName: string
): RetirementData | undefined => {
  if (typeof window === "undefined") return undefined;
  const stringData = window.localStorage.getItem(eventName);
  if (!stringData) return undefined;
  return JSON.parse(stringData) as RetirementData;
};

const saveToLocalStorage = (eventName: string, data: RetirementData) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(eventName, JSON.stringify(data));
};

export const EventDemo = (props: { eventTitle: string }) => {
  const [view, setView] = useState<View>();
  const isView = (v: View) => view === v;

  const [retirement, setRetirement] = useState<RetirementData | undefined>(
    loadFromLocalStorage(EVENT_NAME)
  );

  useEffect(() => {
    const pastData = loadFromLocalStorage(EVENT_NAME);
    if (pastData) {
      setRetirement(pastData);
      setView("success");
    }
  }, []);

  const { handleSubmit, register, formState } = useForm({
    mode: "onSubmit",
    defaultValues: {
      name: "",
      loveLetter: "",
    },
    resolver: yupResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormSchema> = async (values) => {
    setView("pending");
    try {
      const retirementData = await singleOffsetTransaction(values);
      saveToLocalStorage(EVENT_NAME, retirementData);
      setRetirement(retirementData);
      setView("success");
    } catch (e: unknown) {
      setView("error");
    }
  };

  return (
    <>
      <PageHead
        title="Live Offsetting Demo | KlimaDAO"
        mediaTitle="Live Offsetting Demo | KlimaDAO"
        metaDescription="Offset carbon and write a love letter for the planet. Your message will live forever on the Polygon blockchain!"
        doNotIndex={true}
      />
      <Navigation activePage="EventDemo" transparent showThemeToggle={false} />
      <Modal title="" showModal={isView("pending")}>
        <div className={styles.pendingModalContent}>
          <Text t="h4">Processing your offset...</Text>
          <Spinner />
        </div>
      </Modal>
      <div className={styles.backgroundContainer}>
        <BackgroundDecor className={styles.backgroundDecor} />
        <section className={styles.formSection}>
          {(!view || isView("pending")) && (
            <>
              <Text t="h2" align="center">
                {props.eventTitle || "Live Offset Demo"}
              </Text>
              <Text t="body2" align="center">
                Help us offset the emissions associated with this event, and
                write a Love Letter to the planet! Your name and Love Letter
                will be permanently etched into the blockchain.
              </Text>
              <form onSubmit={handleSubmit(onSubmit)}>
                <InputField
                  label="Name"
                  errorMessage={formState?.errors?.name?.message || false}
                  inputProps={{
                    type: "text",
                    ...register("name"),
                  }}
                />
                <TextareaField
                  label="Love Letter to the Planet"
                  errorMessage={formState?.errors?.loveLetter?.message || false}
                  textareaProps={{
                    rows: 4,
                    ...register("loveLetter"),
                  }}
                />
                <ButtonPrimary
                  label="SUBMIT"
                  onClick={handleSubmit(onSubmit)}
                />
              </form>
            </>
          )}
          {isView("success") && !!retirement && (
            <div className={styles.animatedSuccessContainer}>
              <Text t="h2" align="center">
                Success!
              </Text>
              <Text t="body2" align="center">
                <b>
                  {retirement.quantity}{" "}
                  {retirement.quantity === "1" ? "Tonne" : "Tonnes"}
                </b>{" "}
                of carbon has been offset on your behalf.
              </Text>
              <Text t="body2" align="center">
                Check out your unique shareable{" "}
                <Link
                  href={`/retirements/${retirement.beneficiaryAddress}/${retirement.index}`}
                >
                  <a>retirement certificate</a>
                </Link>{" "}
                or view the raw{" "}
                <A
                  href={`${urls.polygonscan}/tx/${retirement.transactionHash}`}
                >
                  blockchain transaction
                </A>{" "}
                data. See how the event's{" "}
                <Link href={`/pledge/${retirement.beneficiaryAddress}`}>
                  <a>pledge</a>
                </Link>{" "}
                is doing so far (it may take a few seconds for your retirement
                to appear on the pledge).
              </Text>
              <div className={styles.buttonLinks}>
                <ButtonSecondary
                  label="View Retirement Receipt"
                  href={`/retirements/${retirement.beneficiaryAddress}/${retirement.index}`}
                  link={Link}
                />
                <ButtonPrimary
                  label="See Event Progress"
                  href={`/pledge/${retirement.beneficiaryAddress}`}
                  link={Link}
                />
              </div>
            </div>
          )}
          {isView("error") && (
            <>
              <Text t="h2">Offset Unsuccessful</Text>
              <Text t="body2" align="center">
                We were unable to process your transaction. Please refresh the
                page and try again.
              </Text>
            </>
          )}
        </section>
        <section className={styles.ctaSection}>
          <div className="infinityStack">
            <KlimaInfinityLogo className="infinityLogo" />
            <Text>
              The next-generation carbon toolkit for your organization
            </Text>
          </div>
          <div className="buttonStack">
            <ButtonPrimary
              className="hero_button_primary"
              variant="blueRounded"
              label={"Get Started"}
              href="/infinity"
              link={Link}
            />
            <ButtonSecondary
              variant="blueRounded"
              label={"Contact Sales"}
              href={urls.klimaInfinityContactForm}
              target="_blank"
            />
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};
