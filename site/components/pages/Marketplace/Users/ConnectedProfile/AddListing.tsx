import React, { FC, useState } from "react";
import { Trans, t } from "@lingui/macro";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  ButtonPrimary,
  ButtonSecondary,
  Spinner,
  Text,
} from "@klimadao/lib/components";
import { InputField } from "components/Form";
import { ProjectTokenDropDown } from "./ProjectTokenDropDown";
import { Asset } from "@klimadao/lib/types/marketplace";
import Marketplace from "@klimadao/lib/abi/Marketplace.json";
import { ethers } from "ethers";
import { useWeb3 } from "@klimadao/lib/utils";
import C3ProjectToken from "@klimadao/lib/abi/C3ProjectToken.json";
import { changeApprovalTransaction } from "../utils";
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
  onCancel: () => void;
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
  const resetError = () => !!errorMessage && setErrorMessage(null);

  const onSubmit: SubmitHandler<FormValues> = async (values: FormValues) => {
    resetError();

    try {
      setIsLoading(true);

      if (!provider) return;

      const tokenContract = new ethers.Contract(
        c3token,
        C3ProjectToken.abi,
        provider
      );

      const allowance = await tokenContract.allowance(address, marketplace);
      console.log(
        "allowance 1",
        !!allowance && ethers.utils.formatUnits(allowance)
      );

      const hasApproval = () => {
        const allowanceValue =
          !!allowance && ethers.utils.formatUnits(allowance);
        return (
          !!allowanceValue &&
          Number(allowanceValue) >= Number(values.totalAmountToSell)
        );
      };

      if (!hasApproval()) {
        const approvedValue = await changeApprovalTransaction({
          tokenAddress: c3token,
          spenderAddress: marketplace,
          provider: provider,
          value: values.totalAmountToSell,
          onStatus: logStatus,
        });

        logStatus(`Done! Approved Value: ${approvedValue}`);
      }

      const marketPlaceContract = new ethers.Contract(
        marketplace,
        Marketplace.abi,
        provider.getSigner()
      );

      logStatus(
        t({
          id: "marketplace.profile.add_listing.start_add_listing",
          message: "Confirm creating a listing in your wallet",
        })
      );

      const listingTxn = await marketPlaceContract.addListing(
        values.tokenAddress,
        ethers.utils.parseUnits(values.totalAmountToSell),
        ethers.utils.parseUnits(values.singleUnitPrice),
        [], // TODO batches
        [] // TODO batches price
      );

      logStatus(
        t({
          id: "marketplace.profile.add_listing.wait_for_network_approval",
          message: "Waiting for network approval ...",
        })
      );
      await listingTxn.wait(1);

      setIsLoading(false);
      props.onSubmit();
    } catch (error: any) {
      setIsLoading(false);
      console.error(error);

      if (error.message?.includes("ACTION_REJECTED")) {
        setErrorMessage(
          t({
            id: "marketplace.profile.add_listing.user_rejected",
            message: "You chose to cancel this transaction.",
          })
        );
      } else {
        setErrorMessage(
          t({
            id: "marketplace.profile.add_listing.error",
            message: "There was an error creating a new listing.",
          })
        );
      }
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
              ...register("totalAmountToSell", {
                required: true,
                disabled: isLoading,
                onBlur: resetError,
              }),
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
              ...register("singleUnitPrice", {
                required: true,
                disabled: isLoading,
                onBlur: resetError,
              }),
            }}
            label={t({
              id: "marketplace.user.edit.form.input.singleUnitPrice.label",
              message: "Single Unit Price",
            })}
            errorMessage={
              formState.errors.singleUnitPrice && "Single Price is required"
            }
          />
          {hasError && (
            <Text t="caption" className={styles.errorMessage}>
              {errorMessage}
            </Text>
          )}

          {isLoading && (
            <div className={styles.statusMessage}>
              <Text t="caption" align="center" className={styles.loadingText}>
                <Spinner />
                {statusMessage && <i>{statusMessage}</i>}
              </Text>
            </div>
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
          <ButtonSecondary
            className={styles.marketplaceButtonGray}
            disabled={isLoading}
            label={<Trans id="shared.cancel">Cancel</Trans>}
            onClick={props.onCancel}
          />
        </div>
      </form>
    </div>
  );
};
