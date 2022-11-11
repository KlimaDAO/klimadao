import React, { FC, useState } from "react";
import { Trans, t } from "@lingui/macro";
import { useRouter } from "next/router";
import {
  ButtonPrimary,
  ButtonSecondary,
  Text,
  Spinner,
} from "@klimadao/lib/components";
import ClearIcon from "@mui/icons-material/Clear";
import SaveIcon from "@mui/icons-material/Save";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { trimWithLocale, useWeb3, concatAddress } from "@klimadao/lib/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import Tippy from "@tippyjs/react";

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
import { Pledge, PledgeFormValues, Wallet } from "../types";
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

export const getErrorMessage = (errorName: string) => {
  const errorMessage = {
    WalletAlreadyPinned: t({
      id: "pledge.invitation.error.wallet_already_pinned",
      message:
        "This wallet is already pinned to another pledge. Please unpin your wallet and try again.",
    }),
    PledgeNotFound: t({
      id: "pledge.errors.pledge_not_found",
      message: "A pledge was not found for this address.",
    }),
    Default: t({
      id: "pledge.errors.default",
      message: "An error has occured",
    }),
    FailedRequest: t({
      id: "pledge.errors.default",
      message: "An error has occured",
    }),
    UnknownError: t({
      id: "pledge.errors.unknown_error",
      message: "An unknown error has occured.",
    }),
    MethodNotAllowed: t({
      id: "pledge.errors.method_not_allowed",
      message: "Method not allowed.",
    }),
  }[errorName];

  return (
    errorMessage ??
    t({
      id: "pledge.errors.default",
      message: "An error has occured",
    })
  );
};

export const PledgeForm: FC<Props> = (props) => {
  const [serverError, setServerError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<{
    address: string;
    index: number;
  }>();
  const [submitting, setSubmitting] = useState<boolean>(false);
  const { query } = useRouter();
  const { signer } = useWeb3();
  // any type is used here because the pledge will only be this shape once before we format the wallets so it is not a type of Pledge or PledgeFormValues
  const formattedPledge: any = { ...props.pledge };
  if (props.pledge.wallets) {
    formattedPledge.wallets = Object.values(props.pledge.wallets) as Wallet[];
  }

  const { control, register, handleSubmit, formState, setValue } =
    useForm<PledgeFormValues>({
      mode: "onChange",
      defaultValues: pledgeFormAdapter(formattedPledge),
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
  const wallets = useWatch({ name: "wallets", control });

  const checkDuplicateWallets = (wallets: Wallet[]): boolean => {
    let isDuplicate = false;
    // TODO: make this work
    wallets.map((wallet) => {
      const duplicates = wallets.filter(
        (w) =>
          (w.status === "pending" || w.status === "verified") &&
          wallet.address === w.address
      );
      if (duplicates.length > 1) {
        isDuplicate = true;
      }
    });
    return isDuplicate;
  };

  const onSubmit: SubmitHandler<PledgeFormValues> = async (
    values: PledgeFormValues
  ) => {
    try {
      setSubmitting(true);
      setServerError(false);
      if (checkDuplicateWallets(values.wallets as Wallet[])) {
        setSubmitting(false);
        setServerError(true);
        setErrorMessage(
          t({
            id: "pledge.form.error.duplicate_wallets",
            message: "Please remove the duplicate wallet(s)",
          })
        );
        return;
      }
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

      const data = await putPledge({
        pageAddress: props.pageAddress,
        pledge: values,
        signature,
        urlPath: `/pledge/${query.address}`,
      });
      if (data.pledge) {
        props.onFormSubmit(data.pledge);
      } else {
        setServerError(true);
      }
      setSubmitting(false);
    } catch (error: any) {
      if (error instanceof Error) {
        setErrorMessage(getErrorMessage(error.name));
      } else {
        setErrorMessage(
          t({
            id: "pledge.form.error.default_error_message",
            message: "Something went wrong. Please try again shortly.",
          })
        );
      }

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
          {errorMessage ? (
            errorMessage
          ) : (
            <Trans id="pledges.form.generic_error">
              Something went wrong. Please try again.
            </Trans>
          )}
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
            id="pledge"
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
          <div className={styles.wallets_section}>
            <div className={styles.pledge_form_wallets_title}>
              <Text t="caption">
                <Trans id="pledges.form.wallets.label">
                  Secondary Wallet(s)
                </Trans>
              </Text>
              <Tippy
                content={
                  <div className={styles.pledge_form_wallet_info_content}>
                    <Text t="caption">
                      <Trans id="pledge.form.wallets.tooltip">
                        Add other wallets to contribute to your pledge. If the
                        owner of the wallet accepts your invitation, their
                        wallet will appear on your pledge dashboard. Any
                        retirments made by a secondary wallet will contribute
                        toward your pledge. You'll retain sole ownership and
                        editing access to this pledge.
                      </Trans>
                    </Text>
                    <ArrowDropDownIcon
                      className={styles.pledge_tooltip_arrow}
                      fontSize="large"
                    />
                  </div>
                }
              >
                <InfoOutlinedIcon
                  fontSize="large"
                  className={styles.pledge_form_wallet_info}
                />
              </Tippy>
            </div>

            {walletsFields.map((wallet, index) => {
              return (
                <div className={styles.pledge_wallet_row} key={wallet.id}>
                  {(!wallet.saved ||
                    (wallet.saved &&
                      errors.wallets?.[index]?.address?.message)) && (
                    <div className={styles.pledge_wallet_address_cell}>
                      <InputField
                        id="pledges.form.input.walletAddress.placeholder"
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
                          pledgeErrorTranslationsMap[
                            errors.wallets?.[index]?.address
                              ?.message as PledgeErrorId
                          ]
                        }
                      />
                      <ButtonPrimary
                        variant="icon"
                        label={<SaveIcon fontSize="large" />}
                        className={styles.pledge_wallet_save}
                        onClick={() =>
                          wallets &&
                          walletsUpdate(index, {
                            address: wallets[index].address,
                            status: wallets[index].status,
                            saved: true,
                          })
                        }
                      />
                    </div>
                  )}
                  {wallet.saved &&
                    wallet.address &&
                    !errors.wallets?.[index]?.address?.message &&
                    wallet.status !== "rejected" && (
                      <>
                        <div className={styles.pledge_wallet_address_cell}>
                          <Text t="caption">
                            {concatAddress(wallet.address)}
                          </Text>
                          {wallet.status === "pending" && (
                            <span className={styles.pledge_wallet_pending}>
                              <Text t="caption">
                                <Trans id="shared.pending">Pending</Trans>
                              </Text>
                            </span>
                          )}
                        </div>
                        <ButtonPrimary
                          variant="icon"
                          label={<DeleteOutlineOutlinedIcon fontSize="large" />}
                          className={styles.pledge_wallet_delete}
                          onClick={() => {
                            props.setIsDeleteMode(true);
                            setSelectedAddress({
                              address: wallet.address as string,
                              index: index,
                            });
                          }}
                        />
                      </>
                    )}
                </div>
              );
            })}
            <div className={styles.pledge_wallet_add}>
              <ButtonPrimary
                className={styles.categories_appendButton}
                variant="gray"
                label={t({
                  id: "pledges.form.add_wallet_button",
                  message: "Add wallet",
                })}
                disabled={
                  walletsFields.length > 0 &&
                  walletsFields[walletsFields.length - 1].saved === false
                }
                onClick={() =>
                  walletsAppend({
                    address: "",
                    status: "pending",
                    saved: false,
                  })
                }
              />
            </div>
          </div>
          <TextareaField
            id="methodology"
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
              !!formState.errors.methodology?.message
                ? pledgeErrorTranslationsMap[
                    formState.errors.methodology.message as PledgeErrorId
                  ]
                : undefined
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
        <div className={styles.pledge_form_remove_container}>
          <Text t="caption">
            <Trans id="pledge.form.wallets.confirm_remove_wallet">
              Are you sure you want to remove {selectedAddress?.address} from
              your pledge?
            </Trans>
          </Text>
          <ButtonPrimary
            label={t({
              id: "pledges.form.confirm_remove",
              message: "remove",
            })}
            variant="red"
            onClick={() => {
              walletsRemove(
                selectedAddress ? selectedAddress.index : undefined
              );
              props.setIsDeleteMode(false);
            }}
          />
          <ButtonSecondary
            label={t({
              id: "pledges.form.confirm_remove_cancel",
              message: "cancel",
            })}
            variant="gray"
            onClick={() => props.setIsDeleteMode(false)}
          />
        </div>
      )}
    </form>
  );
};
