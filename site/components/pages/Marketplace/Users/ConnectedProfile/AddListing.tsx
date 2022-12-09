import React, { FC, useState } from "react";
import { Trans, t } from "@lingui/macro";
import { useForm, SubmitHandler, useWatch } from "react-hook-form";
import {
  ButtonPrimary,
  ButtonSecondary,
  Spinner,
  Text,
} from "@klimadao/lib/components";
import { InputField } from "components/Form";
import { ProjectTokenDropDown } from "./ProjectTokenDropDown";
import { Asset } from "@klimadao/lib/types/marketplace";
import { ethers } from "ethers";
import { useWeb3, getContract } from "@klimadao/lib/utils";
import { addresses } from "@klimadao/lib/constants";
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
};

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

  const selectedTokenAddress = useWatch({
    name: "tokenAddress",
    control,
  });
  const selectedAsset =
    props.assets.find((t) => t.tokenAddress === selectedTokenAddress) ||
    props.assets[0];

  const logStatus = (m: string) => setStatusMessage(m);
  const resetError = () => !!errorMessage && setErrorMessage(null);

  const onSubmit: SubmitHandler<FormValues> = async (values: FormValues) => {
    resetError();

    try {
      setIsLoading(true);

      if (!provider) return;

      const tokenContract = new ethers.Contract(
        values.tokenAddress,
        C3ProjectToken.abi,
        provider
      );

      const allowance = await tokenContract.allowance(
        address,
        addresses["mainnet"].marketplace // testnet and mainnet have the same address, change mainnet address for GO LIVE
      );
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

      console.log("hasApproval", hasApproval());

      if (!hasApproval()) {
        const approvedValue = await changeApprovalTransaction({
          tokenAddress: values.tokenAddress,
          token: selectedAsset?.tokenName,
          spenderAddress: addresses["mainnet"].marketplace,
          provider: provider,
          value: values.totalAmountToSell,
          onStatus: logStatus,
        });

        logStatus(`Done! Approved Value: ${approvedValue}`);
      }

      const marketPlaceContract = getContract({
        contractName: "marketplace",
        provider: provider.getSigner(),
      });

      logStatus(
        t({
          id: "marketplace.profile.add_listing.start_add_listing",
          message: "Confirm creating a listing in your wallet",
        })
      );

      const listingTxn = await marketPlaceContract.addListing(
        values.tokenAddress,
        ethers.utils.parseUnits(values.totalAmountToSell, 18), // C3 token
        ethers.utils.parseUnits(values.singleUnitPrice, 6), // USDC
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
          setValue={setValue}
          assets={props.assets}
          selectedAsset={selectedAsset}
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
                required: {
                  value: true,
                  message: t({
                    id: "marketplace.user.listing.form.input.totalAmountToSell.required",
                    message: "Total Amount to Sell is required",
                  }),
                },
                disabled: isLoading,
                onBlur: resetError,
                min: {
                  value: 1,
                  message: t({
                    id: "marketplace.user.listing.form.input.totalAmountToSell.minimum",
                    message: "The minimum amount to sell is 1 Tonne",
                  }),
                },
                max: {
                  value: Number(selectedAsset.balance),
                  message: t({
                    id: "marketplace.user.listing.form.input.totalAmountToSell.maxAmount",
                    message: "You exceeded your available amount",
                  }),
                },
              }),
            }}
            label={t({
              id: "marketplace.user.edit.form.input.totalAmountToSell.label",
              message: `Total Amount`,
            })}
            errorMessage={formState.errors.totalAmountToSell?.message}
          />
          <InputField
            id="singleUnitPrice"
            inputProps={{
              placeholder: t({
                id: "marketplace.user.edit.form.input.singleUnitPrice.placeholder",
                message: "USDC per ton",
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
