import React, { FC, useState } from "react";
import { Trans, t } from "@lingui/macro";
import { useRouter } from "next/router";
import { ButtonPrimary, Spinner, Text } from "@klimadao/lib/components";
import ClearIcon from "@mui/icons-material/Clear";
import SaveIcon from "@mui/icons-material/Save";
import { trimWithLocale, useWeb3, concatAddress } from "@klimadao/lib/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useForm,
  useFieldArray,
  useWatch,
  Control,
  SubmitHandler,
} from "react-hook-form";

import { InputField, TextareaField } from "components/Form";

import {
  editPledgeMessage,
  formSchema,
  pledgeErrorTranslationsMap,
  PledgeErrorId,
  putPledge,
  pledgeFormAdapter,
  waitForGnosisSignature,
} from "../lib";
import { Pledge, PledgeFormValues } from "../types";
import * as styles from "./styles";

type TotalFootprintProps = {
  control: Control<PledgeFormValues>;
  setValue: (field: "footprint", value: number) => void;
};

const TotalFootprint = ({ control, setValue }: TotalFootprintProps) => {
  const { locale } = useRouter();
  const categories = useWatch({ name: "categories", control });

  const totalFootprint: number = categories.reduce(
    (acc, current) => Number(acc) + Number(current.quantity || 0),
    0
  );
  setValue("footprint", totalFootprint);

  return (
    <Text t="h4">
      <Trans id="pledges.form.total_footprint_summary">
        Total Footprint: {trimWithLocale(totalFootprint, 2, locale)} Carbon
        Tonnes
      </Trans>
    </Text>
  );
};

type Props = {
  pageAddress: string;
  pledge: Pledge;
  onFormSubmit: (data: Pledge) => void;
  isDeleteMode: boolean;
  setIsDeleteMode: (value: boolean) => void;
};

type Wallet = {
  address: string;
  verified: boolean;
  saved: boolean;
  id?: string;
};

export const PledgeForm: FC<Props> = (props) => {
  const [serverError, setServerError] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<{
    address: string;
    index: number;
  }>();
  const [submitting, setSubmitting] = useState(false);
  const { query } = useRouter();
  const { signer } = useWeb3();
  const { control, register, handleSubmit, formState, setValue } =
    useForm<PledgeFormValues>({
      mode: "onChange",
      defaultValues: pledgeFormAdapter(props.pledge),
      resolver: yupResolver(formSchema),
    });
  const { isDirty, errors } = formState;

  const {
    fields: categoriesFields,
    append: categoriesAppend,
    remove: categoriesRemove,
  } = useFieldArray({
    name: "categories",
    control,
  });

  const {
    fields: walletsFields,
    append: walletsAppend,
    remove: walletsRemove,
    update: walletsUpdate,
  } = useFieldArray({
    name: "wallets",
    control,
  });

  const wallets = useWatch({ name: "wallets", control: control });

  const onSubmit: SubmitHandler<PledgeFormValues> = async (
    values: PledgeFormValues
  ) => {
    try {
      setSubmitting(true);
      setServerError(false);

      if (!signer) return;
      const signature = await signer.signMessage(
        editPledgeMessage(values.nonce)
      );

      if (signature === "0x") {
        await waitForGnosisSignature({
          message: editPledgeMessage(values.nonce),
          address: props.pageAddress,
        });
      }

      const response = await putPledge({
        pageAddress: props.pageAddress,
        pledge: values,
        signature,
        urlPath: `/pledge/${query.address}`,
      });
      const data = await response.json();
      if (data.pledge) {
        props.onFormSubmit(data.pledge);
      } else {
        setServerError(true);
      }
      setSubmitting(false);
    } catch (error: unknown) {
      console.log(error);
      setServerError(true);
      setSubmitting(false);
    }
  };

  const SubmittingLabel = () => (
    <div className={styles.submittingLabel}>
      <Spinner />
      <Trans id="pledges.form.awaiting_signature">Awaiting signature...</Trans>
    </div>
  );

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      {serverError && (
        <Text className={styles.errorMessage} t="caption">
          <Trans id="pledges.form.generic_error">
            Something went wrong. Please try again.
          </Trans>
        </Text>
      )}

      {!props.isDeleteMode && (
        <>
          <InputField
            id="name"
            inputProps={{
              id: "name",
              placeholder: t({
                id: "pledges.form.input.name.placeholder",
                message: "Name or company name",
              }),
              type: "text",
              ...register("name"),
            }}
            label={t({ id: "pledges.form.input.name.label", message: "Name" })}
            errorMessage={
              pledgeErrorTranslationsMap[errors.name?.message as PledgeErrorId]
            }
          />

          <InputField
            id="profileImageUrl"
            inputProps={{
              placeholder: "https://",
              type: "text",
              ...register("profileImageUrl"),
            }}
            label={t({
              id: "pledges.form.input.profileImageUrl.label",
              message: "Profile image url (optional)",
            })}
            errorMessage={
              pledgeErrorTranslationsMap[
                errors.profileImageUrl?.message as PledgeErrorId
              ]
            }
          />

          <TextareaField
            textareaProps={{
              id: "pledge",
              placeholder: t({
                id: "pledges.form.input.description.placeholder",
                message: "What is your pledge?",
              }),
              rows: 2,
              ...register("description"),
            }}
            label={t({
              id: "pledges.form.input.description.label",
              message: "Pledge",
            })}
            errorMessage={
              pledgeErrorTranslationsMap[
                errors.description?.message as PledgeErrorId
              ]
            }
          />
          {/* Wallets section */}
          <div className={styles.wallets_section}>
            <Text t="caption">
              <Trans id="pledges.form.wallets.label">Secondary Wallet(s)</Trans>
            </Text>

            {walletsFields.map((wallet: Wallet, index: number) => {
              return (
                <div className="pledge-wallet-row" key={wallet.id}>
                  {!wallet.saved && (
                    <>
                      <InputField
                        inputProps={{
                          placeholder: t({
                            id: "pledges.form.input.walletAddress.placeholder",
                            message: "0x...",
                          }),
                          type: "text",
                          ...register(`wallets.${index}.address` as const),
                        }}
                        hideLabel
                        label={t({
                          id: "pledges.form.input.walletAddress.label",
                          message: "Address",
                        })}
                        errorMessage={
                          !!formState.errors?.wallets?.[index]?.address
                            ?.message &&
                          pledgeErrorTranslationsMap[
                            formState?.errors?.wallets?.[index]?.address
                              ?.message as PledgeErrorId
                          ]
                        }
                      />
                      <ButtonPrimary
                        variant="icon"
                        className={styles.categoryRow_removeButton}
                        label={<SaveIcon fontSize="large" />}
                        onClick={() =>
                          walletsUpdate(index, {
                            address: wallets![index].address,
                            verified: wallets![index].verified,
                            saved: true,
                          })
                        }
                      />
                    </>
                  )}
                  {wallet.saved && (
                    <Text t="caption" className="" key={wallet.id}>
                      {concatAddress(wallet.address)}
                    </Text>
                  )}
                  <ButtonPrimary
                    variant="icon"
                    className={styles.categoryRow_removeButton}
                    label={<ClearIcon fontSize="large" />}
                    onClick={() => {
                      props.setIsDeleteMode(true);
                      setSelectedAddress({
                        address: wallet.address,
                        index: index,
                      });
                    }}
                  />
                </div>
              );
            })}
            <div>
              <ButtonPrimary
                className={styles.categories_appendButton}
                variant="gray"
                label={t({
                  id: "pledges.form.add_wallet_button",
                  message: "Add wallet",
                })}
                onClick={() =>
                  walletsAppend({ address: "", verified: false, saved: false })
                }
              />
            </div>
          </div>
          <TextareaField
            textareaProps={{
              id: "methodology",
              placeholder: t({
                id: "pledges.form.input.methodology.placeholder",
                message:
                  "What tools or methodologies did you use to calculate your carbon footprint?",
              }),
              rows: 6,
              ...register("methodology"),
            }}
            label={t({
              id: "pledges.form.input.methodology.label",
              message: "Methodology",
            })}
            errorMessage={
              !!formState.errors.methodology?.message &&
              pledgeErrorTranslationsMap[
                formState.errors.methodology.message as PledgeErrorId
              ]
            }
          />

          <div className={styles.categories_section}>
            <Text t="caption">
              <Trans id="pledges.form.footprint.label">Footprint</Trans>
            </Text>

            {categoriesFields.length === 0 && (
              <Text
                t="caption"
                style={{ textAlign: "center", marginTop: "1rem" }}
              >
                <Trans id="pledges.form.footprint.prompt">
                  Add a category and start calculating your carbon footprint
                </Trans>
              </Text>
            )}

            <div className={styles.categories}>
              {categoriesFields.map((field, index) => (
                <div className={styles.categoryRow} key={field.id}>
                  <div className={styles.categoryRow_inputs}>
                    <InputField
                      id={field.id}
                      inputProps={{
                        placeholder: t({
                          id: "pledges.form.input.categoryName.placeholder",
                          message: "Category name",
                        }),
                        type: "text",
                        ...register(`categories.${index}.name` as const),
                      }}
                      hideLabel
                      label={t({
                        id: "pledges.form.input.categoryName.label",
                        message: "Category",
                      })}
                      errorMessage={
                        pledgeErrorTranslationsMap[
                          errors.categories?.[index]?.name
                            ?.message as PledgeErrorId
                        ]
                      }
                    />

                    <InputField
                      id={`categories.${index}.quantity`}
                      inputProps={{
                        placeholder: t({
                          id: "pledges.form.input.categoryQuantity.placeholder",
                          message: "Carbon tonnes",
                        }),
                        type: "number",
                        ...register(`categories.${index}.quantity` as const),
                      }}
                      hideLabel
                      label={t({
                        id: "pledges.form.input.categoryQuantity.label",
                        message: "Quantity",
                      })}
                      errorMessage={
                        pledgeErrorTranslationsMap[
                          errors.categories?.[index]?.quantity
                            ?.message as PledgeErrorId
                        ]
                      }
                    />
                  </div>

                  <ButtonPrimary
                    className={styles.categoryRow_removeButton}
                    icon={<ClearIcon fontSize="large" />}
                    onClick={() => categoriesRemove(index)}
                  />
                </div>
              ))}
            </div>

            {categoriesFields.length < 10 && (
              <div className={styles.categories_appendRow}>
                <ButtonPrimary
                  className={styles.categories_appendButton}
                  variant="gray"
                  label={t({
                    id: "pledges.form.add_footprint_category_button",
                    message: "Add category",
                  })}
                  onClick={() => categoriesAppend({ name: "", quantity: 0 })}
                />
              </div>
            )}
          </div>

          <InputField
            id="footprint"
            inputProps={{
              type: "hidden",
              ...register("footprint"),
            }}
            hideLabel
            label={t({
              id: "pledges.form.input.totalFootprint.label",
              message: "Total footprint",
            })}
            errorMessage={
              pledgeErrorTranslationsMap[
                errors.footprint?.message as PledgeErrorId
              ]
            }
          />

          <TotalFootprint control={control} setValue={setValue} />

          {/* better to use an input type=submit */}
          <ButtonPrimary
            disabled={!isDirty}
            label={
              submitting ? (
                <SubmittingLabel />
              ) : (
                t({
                  id: "pledges.form.submit_button",
                  message: "Save pledge",
                })
              )
            }
            onClick={handleSubmit(onSubmit)}
          />
        </>
      )}
      {submitting && (
        <Text t="caption" color="lighter" align="center">
          <Trans id="pledges.form.use_your_wallet">
            Use your wallet to sign and confirm this edit.
          </Trans>
        </Text>
      )}

      {props.isDeleteMode && (
        <div>
          <Text>
            Are you sure you want to remove{" "}
            {selectedAddress && selectedAddress.address} from your pleadge?
          </Text>
          <ButtonPrimary
            label="remove"
            onClick={() => {
              walletsRemove(
                selectedAddress ? selectedAddress.index : undefined
              );
              props.setIsDeleteMode(false);
            }}
          />
          <ButtonPrimary
            label="cancel"
            onClick={() => props.setIsDeleteMode(false)}
          />
        </div>
      )}
    </form>
  );
};
