import * as yup from "yup";
import { ButtonPrimary, Text } from "@klimadao/lib/components";
import { InputField } from "components/Form";
import { Navigation } from "components/Navigation";
import { PageHead } from "components/PageHead";
import { SubmitHandler, useForm } from "react-hook-form";
import * as styles from "./styles";
import { yupResolver } from "@hookform/resolvers/yup";

export const formSchema = yup
  .object({
    name: yup
      .string()
      .required("A name is required")
      .max(50, "Name must be less than 50 chars")
      .trim(),
    loveLetter: yup
      .string()
      .required("A message is required")
      .max(280, "Message must be less than 280 chars")
      .trim(),
  })
  .noUnknown();

type FormSchema = yup.InferType<typeof formSchema>;

export const EventDemo = () => {
  const { handleSubmit, register, formState } = useForm({
    mode: "onSubmit",
    defaultValues: {
      name: "",
      loveLetter: "",
    },
    resolver: yupResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormSchema> = async (values) => {
    console.log(values);
  };

  return (
    <>
      <PageHead
        title="Live Offsetting Demo | KlimaDAO"
        mediaTitle="Live Offsetting Demo | KlimaDAO"
        metaDescription="Offset carbon and write a love letter for the planet. Your message will live forever on the Polygon blockchain!"
        doNotIndex={true}
      />
      <Navigation activePage="Home" />
      <div className={styles.container}>
        <Text t="h2">Live Offset Demo</Text>
        <Text t="body2" align="center">
          Help us offset the emissions associated with this event, and write a
          Love Letter to the planet! Your name and Love Letter will be
          permanently etched into the blockchain.
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
          <InputField
            label="Love Letter"
            errorMessage={formState?.errors?.loveLetter?.message || false}
            inputProps={{
              type: "text",
              ...register("loveLetter"),
            }}
          />
          <ButtonPrimary label="SUBMIT" onClick={handleSubmit(onSubmit)} />
        </form>
      </div>
    </>
  );
};
