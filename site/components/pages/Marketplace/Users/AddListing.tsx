import React, { FC, useState } from "react";
import { Trans, t } from "@lingui/macro";
import { useForm, SubmitHandler } from "react-hook-form";
import { ButtonPrimary, Spinner, Text } from "@klimadao/lib/components";
import { InputField } from "components/Form";
import { ProjectTokenDropDown } from "./ProjectTokenDropDown";
import { Asset } from "@klimadao/lib/types/marketplace";
import Marketplace from "@klimadao/lib/abi/Marketplace.json";
import { ethers } from "ethers";
import { useWeb3 } from "@klimadao/lib/utils";
import C3ProjectToken from "@klimadao/lib/abi/C3ProjectToken.json";
import { changeApprovalTransaction } from "./utils";
import * as styles from "./styles";

export type FormValues = {
  tokenAddress: string;
  totalAmountToSell: string;
  singleUnitPrice: string;
  batches?: string;
  batchPrices?: string;
};

type Props = {
  assets: Asset[];
  onSubmit: () => void;
};

const defaultValues = {
  tokenAddress: "",
  totalAmountToSell: "",
  singleUnitPrice: "",
  batches: "",
  batchPrices: "",
};

const c3token = "0xa1c1cCD8C61FeC141AAed6B279Fa4400b68101d4";
const marketplace = "0xa29bcC5434d21b44b00a6Df9Eda6F16436295B80";

export const AddListing: FC<Props> = (props) => {
  const { provider, address } = useWeb3();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const [statusMessage, setStatusMessage] = useState<null | string>(null);

  const { register, handleSubmit, formState, control, setValue } =
    useForm<FormValues>({
      defaultValues: {
        ...defaultValues,
        tokenAddress: props.assets[0].tokenAddress,
      },
    });

  const hasError = !isLoading && !!errorMessage;

  const logStatus = (m: string) => setStatusMessage(m);

  const onSubmit: SubmitHandler<FormValues> = async (values: FormValues) => {
    setErrorMessage(null);

    try {
      setIsLoading(true);

      if (!provider) return;

      const tokenContract = new ethers.Contract(
        c3token,
        C3ProjectToken.abi,
        provider
      );

      const allowance = await tokenContract.allowance(address, marketplace);

      logStatus(`Your allowance value: ${ethers.utils.formatUnits(allowance)}`);

      const approvedValue = await changeApprovalTransaction({
        tokenAddress: c3token,
        spenderAddress: marketplace,
        provider: provider,
        value: values.totalAmountToSell,
        onStatus: logStatus,
      });

      logStatus(`Done! Approved Value: ${approvedValue}`);

      const marketPlaceContract = new ethers.Contract(
        marketplace,
        Marketplace.abi,
        provider.getSigner()
      );

      logStatus(`Start Add Listing`);

      const listingTxn = await marketPlaceContract.addListing(
        values.tokenAddress,
        ethers.utils.parseUnits(values.totalAmountToSell),
        ethers.utils.parseUnits(values.singleUnitPrice),
        [ethers.utils.parseUnits("1"), ethers.utils.parseUnits("1")], // what is this?
        [ethers.utils.parseUnits("1"), ethers.utils.parseUnits("1")] // what is this?
      );

      logStatus(`Wait for Network Approval`);
      await listingTxn.wait(1);
      console.log("listing", listingTxn);
      setIsLoading(false);
      props.onSubmit();
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      setErrorMessage("UUPS");
    }
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.inputsContainer}>
        <Text t="caption">
          <Trans id="marketplace.user.listing.form.input.select_project.label">
            Select Project:
          </Trans>
        </Text>
        <ProjectTokenDropDown
          control={control}
          setValue={setValue}
          assets={props.assets}
        />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputsContainer}>
          <InputField
            id="tokenAddress"
            inputProps={{
              type: "hidden",
              ...register("tokenAddress"),
            }}
            label={"token address"}
            hideLabel
          />
          <InputField
            id="totalAmountToSell"
            inputProps={{
              placeholder: t({
                id: "marketplace.user.listing.form.input.totalAmountToSell.placeholder",
                message: "How many do you want to sell",
              }),
              type: "number",
              ...register("totalAmountToSell", { required: true }),
            }}
            label={t({
              id: "marketplace.user.edit.form.input.totalAmountToSell.label",
              message: `Total Amount`,
            })}
            errorMessage={
              formState.errors.totalAmountToSell && "Total amount is required"
            }
          />
          <InputField
            id="singleUnitPrice"
            inputProps={{
              placeholder: t({
                id: "marketplace.user.edit.form.input.singleUnitPrice.placeholder",
                message: "Single Unit Price",
              }),
              type: "number",
              ...register("singleUnitPrice", { required: true }),
            }}
            label={t({
              id: "marketplace.user.edit.form.input.singleUnitPrice.label",
              message: "Single Unit Price",
            })}
            errorMessage={
              formState.errors.singleUnitPrice && "Single Price is required"
            }
          />
          <InputField
            id="batches"
            inputProps={{
              placeholder: t({
                id: "marketplace.user.edit.form.input.batches.placeholder",
                message: "Batches ???",
              }),
              type: "text",
              ...register("batches", { required: false }),
            }}
            label={t({
              id: "marketplace.user.edit.form.input.batches.label",
              message: "Batches ??",
            })}
          />
          {isLoading && <Spinner />}
          {hasError && (
            <Text t="caption" className="error">
              There was an error with the API. Please try again
            </Text>
          )}
          {!hasError && !!statusMessage && (
            <Text t="caption">{statusMessage}</Text>
          )}
          {!isLoading && (
            <ButtonPrimary
              label={
                <Trans id="marketplace.profile.addListing_modal.submit">
                  Create Listing
                </Trans>
              }
              onClick={handleSubmit(onSubmit)}
            />
          )}
        </div>
      </form>
    </div>
  );
};
