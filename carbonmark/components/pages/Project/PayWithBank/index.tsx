import { Trans, t } from "@lingui/macro";
import { CelebrationOutlined } from "@mui/icons-material";
import { ButtonPrimary } from "components/Buttons/ButtonPrimary";
import { CarbonmarkButton } from "components/CarbonmarkButton";
import { Card } from "components/Card";
import { Layout } from "components/Layout";
import { PageHead } from "components/PageHead";
import { Text } from "components/Text";
import { InputField, TextareaField } from "components/shared/Form";
import { isAddress } from "ethers-v6";
import { urls } from "lib/constants";
import { isEmpty } from "lodash";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as styles from "./styles";

type FormValues = {
  email: string;
  quantity: number;
  project_name: string;
  company_name: string;
  job_title: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  beneficiary_name: string;
  beneficiary_address: string;
  retirement_message: string;
};

const defaultValues: FormValues = {
  email: "",
  quantity: 0,
  project_name: "",
  company_name: "",
  job_title: "",
  first_name: "",
  last_name: "",
  phone_number: "",
  beneficiary_name: "",
  beneficiary_address: "",
  retirement_message: "",
};

export const PayWithBank: FC = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);

  const { handleSubmit, register, formState, reset, watch } =
    useForm<FormValues>({
      mode: "onChange",
      defaultValues: { ...defaultValues },
    });

  const formValues = watch();

  useEffect(() => {
    // reset the form to the query params
    reset(router.query);
  }, [router.query]);

  const onSubmit = async () => {
    try {
      // @todo - Makka replace with carbonmark-api-sdk??
      // @todo - Merge PR for api changes first..
      const res = await fetch(`${urls.api.base}/retire/bank-transfer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formValues }),
      });
      if (!res.ok) {
        const data = await res.json();
        setErrorMessage(
          data?.message || t`Something went wrong. Please try again.`
        );
      } else {
        setShowSuccessScreen(true);
      }
    } catch (e: unknown) {
      console.error(e);
      throw e;
    }
  };

  return (
    <>
      <PageHead
        title={t`Pay with Bank Transfer | Carbonmark`}
        mediaTitle={t`Pay with Bank Transfer | Carbonmark`}
        metaDescription={t`Retire your carbon via bank transfer. `}
      />
      <Layout fullContentWidth>
        <div className={styles.container}>
          {!showSuccessScreen ? (
            <>
              <Text t="h1" className={styles.pageTitle}>
                <Trans>Pay with bank transfer</Trans>
              </Text>
              <Text className={styles.pageDescription}>
                <Trans>
                  Carbonmark now offers the ability to pay for retirement
                  transactions via bank transfer. Simply fill out the form below
                  and we'll reach out within 1 business day to collect some
                  further information and send you an invoice.
                </Trans>
              </Text>
              <CarbonmarkButton
                href="#" // @todo - Makka
                label={<Trans>Learn more</Trans>}
                className={styles.learnMoreButton}
              />
              <form
                onSubmit={handleSubmit(onSubmit)}
                className={styles.cardContainer}
              >
                <Card>
                  <Text>
                    <span className="warn">*</span>{" "}
                    <Trans>Indicates required field</Trans>
                  </Text>
                  <div className="form-container">
                    <InputField
                      required
                      id="quantity"
                      label={t`How much would you like to retire?`}
                      inputProps={{
                        type: "number",
                        placeholder: t`Tonnes`,
                        ...register("quantity", {
                          required: {
                            value: true,
                            message: t`Total amount of tonnes to retire is required`,
                          },
                          min: {
                            value: 1,
                            message: t`The minimum amount to retire is 1 Tonne`,
                          },
                        }),
                      }}
                      errorMessage={formState.errors.quantity?.message}
                    />
                    <div />
                    <InputField
                      required
                      id="email"
                      label={t`Email`}
                      inputProps={{
                        type: "text",
                        ...register("email", {
                          required: {
                            value: true,
                            message: t`Email address is required`,
                          },
                        }),
                      }}
                      errorMessage={formState.errors.email?.message}
                    />
                    <InputField
                      id="phone-number"
                      label={t`Phone number`}
                      inputProps={{ type: "text", ...register("phone_number") }}
                    />
                    <InputField
                      required
                      id="company-name"
                      label={t`Company name`}
                      inputProps={{
                        type: "text",
                        ...register("company_name", {
                          required: {
                            value: true,
                            message: t`Company name is required`,
                          },
                        }),
                      }}
                      errorMessage={formState.errors.company_name?.message}
                    />
                    <InputField
                      id="job-title"
                      label={t`Job title`}
                      inputProps={{ type: "text", ...register("job_title") }}
                    />
                    <InputField
                      required
                      id="first-name"
                      label={t`First name`}
                      inputProps={{
                        type: "text",
                        ...register("first_name", {
                          required: {
                            value: true,
                            message: t`First name is required`,
                          },
                        }),
                      }}
                      errorMessage={formState.errors.first_name?.message}
                    />
                    <InputField
                      required
                      id="last-name"
                      label={t`Last name`}
                      inputProps={{
                        type: "text",
                        ...register("last_name", {
                          required: {
                            value: true,
                            message: t`Last name is required`,
                          },
                        }),
                      }}
                      errorMessage={formState.errors.last_name?.message}
                    />
                    <InputField
                      id="beneficiary-name"
                      label={t`Who will this retirement be credited to?`}
                      inputProps={{
                        type: "text",
                        ...register("beneficiary_name"),
                      }}
                    />
                    <InputField
                      id="beneficiary-wallet"
                      label={t`Beneficiary wallet address`}
                      inputProps={{
                        type: "text",
                        ...register("beneficiary_address", {
                          validate: {
                            isAddress: (v) => {
                              if (isEmpty(v)) return true;
                              return (
                                isAddress(v) || t`Not a valid polygon address`
                              );
                            },
                          },
                        }),
                      }}
                      errorMessage={
                        formState.errors.beneficiary_address?.message
                      }
                    />
                    <TextareaField
                      required
                      id="project-names"
                      label={t`Project names of interest`}
                      textareaProps={{
                        rows: 4,
                        ...register("project_name", {
                          required: true,
                        }),
                      }}
                      errorMessage={formState.errors.project_name?.message}
                    />
                    <TextareaField
                      id="retirement-message"
                      label={t`Retirement message`}
                      textareaProps={{
                        rows: 4,
                        ...register("retirement_message"),
                      }}
                    />
                  </div>
                  {!!errorMessage && (
                    <Text t="body1" className="warn">
                      {errorMessage}
                    </Text>
                  )}
                  <ButtonPrimary
                    type="submit"
                    disabled={!formState.isValid}
                    label={<Trans>Submit</Trans>}
                  />
                </Card>
              </form>
            </>
          ) : (
            <div className={styles.successCard}>
              <Card>
                <Text className="title" t="h4">
                  <CelebrationOutlined />
                  <Trans>Form complete</Trans>
                </Text>
                <Text>
                  <Trans>
                    Thank you for supporting the planet! We'll reach out soon to
                    confirm some details and provide you with an with an
                    invoice.
                  </Trans>
                </Text>
                <div className="card-content">
                  <div>
                    <Text>
                      <Trans>How much would you like to retire?</Trans>
                    </Text>
                    <Text>{formValues.quantity} tonnes</Text>
                  </div>
                  <div>
                    <Text>
                      <Trans>Email</Trans>
                    </Text>
                    <Text>{formValues.email || "-"}</Text>
                  </div>
                  <div>
                    <Text>
                      <Trans>Phone number</Trans>
                    </Text>
                    <Text>{formValues.phone_number || "-"}</Text>
                  </div>
                  <div>
                    <Text>
                      <Trans>Company name</Trans>
                    </Text>
                    <Text>{formValues.company_name || "-"}</Text>
                  </div>
                  <div>
                    <Text>
                      <Trans>Job title</Trans>
                    </Text>
                    <Text>{formValues.job_title || "-"}</Text>
                  </div>
                  <div>
                    <Text>
                      <Trans>First name</Trans>
                    </Text>
                    <Text>{formValues.first_name || "-"}</Text>
                  </div>
                  <div>
                    <Text>
                      <Trans>Last name</Trans>
                    </Text>
                    <Text>{formValues.last_name || "-"}</Text>
                  </div>
                  <div>
                    <Text>
                      <Trans>Who will this retirement be credited to?</Trans>
                    </Text>
                    <Text>{formValues.beneficiary_name || "-"}</Text>
                  </div>
                  <div>
                    <Text>
                      <Trans>Beneficiary wallet address</Trans>
                    </Text>
                    <Text className="break-word">
                      {formValues.beneficiary_address || "-"}
                    </Text>
                  </div>
                  <div>
                    <Text>
                      <Trans>Project names of interest</Trans>
                    </Text>
                    <Text>{formValues.project_name || "-"}</Text>
                  </div>
                  <div>
                    <Text>
                      <Trans>Retirement message</Trans>
                    </Text>
                    <Text>{formValues.retirement_message || "-"}</Text>
                  </div>
                </div>
                <ButtonPrimary
                  href="/projects"
                  label={<Trans>Browse Projects</Trans>}
                />
              </Card>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
};
