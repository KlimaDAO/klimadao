import { yupResolver } from "@hookform/resolvers/yup";
import { offsetCompatibility, retirementTokens } from "@klimadao/lib/constants";
import { t, Trans } from "@lingui/macro";
import { utils } from "ethers";
import debounce from "lodash/debounce";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "state";
import * as yup from "yup";

import {
  getOffsetConsumptionCost,
  getRetiredOffsetBalances,
  getRetirementAllowances,
} from "actions/offset";

import { DropdownWithModal } from "components/DropdownWithModal";
import { InputField } from "components/Form";
import { tokenInfo } from "lib/getTokenInfo";

import { getFiatRetirementCost } from "../Offset/lib/getFiatRetirementCost";
import { SelectiveRetirement } from "../Offset/SelectiveRetirement";
import { CostDisplay } from "./CostDisplay";
import { PaymentMethodInput } from "./PaymentMethodInput";
import { RedeemLayout } from "./RedeemLayout";

import * as styles from "./styles";

/* TODO
  - URL params support
  - debounce cost (if required?)
  - setSelectedRetirementToken is a useEffect on a few conditons
  - default beneficiary address to connected wallet
  - calculate cost
  - handle approval
*/

yup.addMethod<yup.StringSchema>(
  yup.string,
  "isAddress",
  function (errorMessage: string) {
    return this.test("is-address", errorMessage, function (value) {
      if (utils.isAddress(value || "")) return true;

      return this.createError({ message: errorMessage });
    });
  }
);

// TODO
export const formSchema = yup.object({
  retirementToken: yup.string(),
  projectAddress: yup.string(),
  project: yup.object(),
  quantity: yup.number().required().min(0),
  paymentMethod: yup.string(),
  cost: yup.string().nullable(),
});

const defaultValues = {
  retirementToken: "bct",
  projectAddress: "",
  project: {},
  quantity: 0,
  paymentMethod: "fiat",
  cost: "0",
};

const retirementTokenItems = (paymentMethod) =>
  retirementTokens.map((tkn) => {
    const disabled = !offsetCompatibility[paymentMethod]?.includes(tkn);
    return {
      ...tokenInfo[tkn],
      disabled,
      description: disabled ? (
        <Trans id="offset.incompatible">INPUT TOKEN INCOMPATIBLE</Trans>
      ) : (
        ""
      ),
    };
  });

export const Redeem = (props) => {
  const dispatch = useAppDispatch();

  const [retirementTokenModalOpen, setRetirementTokenModalOpen] =
    useState(false);
  const [paymentMethodModalOpen, setPaymentMethodModalOpen] = useState(false);

  // form control
  const { register, handleSubmit, formState, setValue, getValues, watch } =
    useForm({
      defaultValues,
      mode: "onChange",
      resolver: yupResolver(formSchema),
    });
  const { isDirty, errors } = formState;

  const values = getValues();

  useEffect(() => {
    console.log(values);
  }, [values]);

  useEffect(() => {
    if (props.isConnected && props.address) {
      dispatch(
        getRetiredOffsetBalances({
          address: props.address,
          onRPCError: props.onRPCError,
        })
      );
      dispatch(
        getRetirementAllowances({
          address: props.address,
          onRPCError: props.onRPCError,
        })
      );
    }
  }, [props.isConnected, props.address]);

  const retirementToken = watch("retirementToken");
  const selectedProject = watch("project");
  const paymentMethod = watch("paymentMethod");
  const quantity = watch("quantity");
  const projectAddress = watch("projectAddress");
  const cost = watch("cost");
  const setSelectedProject = (project) => setValue("project", project);
  const setProjectAddress = (address) => setValue("projectAddress", address);

  useEffect(() => {
    const awaitGetOffsetConsumptionCost = async () => {
      setValue("cost", null);
      // setValue("quantity", 0);

      if (paymentMethod !== "fiat") {
        const [consumptionCost] = await getOffsetConsumptionCost({
          inputToken: paymentMethod,
          retirementToken: retirementToken,
          quantity: quantity.toString(),
          amountInCarbon: true,
          getSpecific: !!projectAddress,
        });
        setValue("cost", consumptionCost);
      } else {
        const floorQuantity =
          Number(quantity) && Number(quantity) < 1 ? 1 : quantity;

        const reqParams = {
          beneficiary_address: props.address || null,
          beneficiary_name: "placeholder",
          retirement_message: "placeholder",
          quantity: floorQuantity.toString(),
          project_address: projectAddress || null,
          retirement_token: retirementToken,
        };
        // edge case where you can type 0.5 for ubo then switch it to fiat
        if (quantity !== floorQuantity) {
          setValue("quantity", floorQuantity);
          // setDebouncedQuantity(floorQuantity);
        }
        const cost = await getFiatRetirementCost(reqParams);
        console.log("hello");
        setValue("cost", cost);
      }
    };
    const debouncedCost = debounce(awaitGetOffsetConsumptionCost, 2000);

    debouncedCost();
  }, [quantity, projectAddress, paymentMethod, retirementToken]);

  return (
    <RedeemLayout>
      <div className={styles.offsetCard_ui}>
        <DropdownWithModal
          label={t({
            id: "offset.dropdown_retire.label",
            message: "Select carbon pool type",
          })}
          modalTitle={t({
            id: "offset.modal_retire.title",
            message: "Select Carbon Type",
          })}
          currentItem={watch("retirementToken")}
          items={retirementTokenItems(watch("paymentMethod"))}
          isModalOpen={retirementTokenModalOpen}
          onToggleModal={() => setRetirementTokenModalOpen((s) => !s)}
          onItemSelect={(value) => setValue("retirementToken", value)}
        />

        <SelectiveRetirement
          label="Choose a carbon project to redeem"
          projectAddress={watch("projectAddress")}
          selectedRetirementToken={retirementToken}
          setProjectAddress={setProjectAddress}
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
          isRedeem={true}
        />

        <InputField
          id="quantity"
          inputProps={{
            id: "quantity",
            placeholder: "Enter quantity to redeem",
            type: "text",
            onKeyDown: (e) => {
              if (paymentMethod === "fiat" && ["."].includes(e.key)) {
                e.preventDefault();
              }
            },
            ...register("quantity"),
          }}
          label="How much would you like to redeem?"
        />

        {/* TODO: calculate cost */}
        <CostDisplay
          cost={cost}
          paymentMethod={watch("paymentMethod")}
          warn={false}
        />

        <PaymentMethodInput
          selectedPaymentMethod={watch("paymentMethod")}
          isModalOpen={paymentMethodModalOpen}
          onToggleModal={() => setPaymentMethodModalOpen((s) => !s)}
          onPaymentMethodSelect={(value) => setValue("paymentMethod", value)}
        />
      </div>
    </RedeemLayout>
  );
};
