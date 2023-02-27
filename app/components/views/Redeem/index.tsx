import { yupResolver } from "@hookform/resolvers/yup";
import { ButtonPrimary, Text } from "@klimadao/lib/components";
import {
  offsetCompatibility,
  offsetInputTokens,
  retirementTokens,
} from "@klimadao/lib/constants";
import { t, Trans } from "@lingui/macro";
import ParkOutlined from "@mui/icons-material/ParkOutlined";
import debounce from "lodash/debounce";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useAppDispatch } from "state";

import { getRetiredOffsetBalances } from "actions/offset";
import {
  getRedeemAllowances,
  getRedeemCost,
  redeemCarbonTransaction,
} from "actions/redeem";
import { changeApprovalTransaction } from "actions/utils";
import { AppNotificationStatus, setAppState, TxnStatus } from "state/app";
import {
  selectAllowancesWithParams,
  selectNotificationStatus,
} from "state/selectors";
import { setAllowance } from "state/user";

import { DropdownWithModal } from "components/DropdownWithModal";
import { InputField } from "components/Form";
import { TransactionModal } from "components/TransactionModal";
import { tokenInfo } from "lib/getTokenInfo";
import { useOffsetParams } from "lib/hooks/useOffsetParams";
import { useTypedSelector } from "lib/hooks/useTypedSelector";

import { getFiatRetirementCost } from "../Offset/lib/getFiatRetirementCost";
import { SelectiveRetirement } from "../Offset/SelectiveRetirement";
import { CostDisplay } from "./CostDisplay";
import {
  formSchema,
  RedeemErrorId,
  redeemErrorTranslationsMap,
  RedeemFormValues,
} from "./lib/formSchema";
import { getApprovalValue } from "./lib/getApprovalValue";
import { PaymentMethodInput } from "./PaymentMethodInput";
import { RedeemLayout } from "./RedeemLayout";
import { RedeemSuccessModal } from "./RedeemSuccessModal";

import * as styles from "./styles";

/* TODO
  - URL params support ✅
  - debounce cost (if required?)
  - setSelectedRetirementToken is a useEffect on a few conditons
  - default beneficiary address to connected wallet
  - handle approval ✅?
*/

const defaultValues = {
  retirementToken: "bct",
  projectAddress: "0x2f800db0fdb5223b3c3f354886d907a671414a7f", // 0x2F800Db0fdb5223b3C3f354886d907A671414A7F
  project: {},
  quantity: 0,
  paymentMethod: "usdc", //todo fiat default
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
  const [retirementTokenModalOpen, setRetirementTokenModalOpen] =
    useState(false);
  const [paymentMethodModalOpen, setPaymentMethodModalOpen] = useState(false);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [redeemTransactionHash, setRedeemTransactionHash] = useState("");

  const params = useOffsetParams();
  const dispatch = useAppDispatch();
  const allowances = useTypedSelector((state) =>
    selectAllowancesWithParams(state, {
      tokens: offsetInputTokens,
      spender: "retirementAggregatorV2",
    })
  );

  const isLoading = props.isConnected && !allowances?.bct;
  const setStatus = (statusType: TxnStatus | null, message?: string) => {
    if (!statusType) return dispatch(setAppState({ notificationStatus: null }));
    dispatch(setAppState({ notificationStatus: { statusType, message } }));
  };

  const fullStatus: AppNotificationStatus | null = useSelector(
    selectNotificationStatus
  );
  const status = fullStatus?.statusType;

  // form control
  const {
    register,
    reset,
    handleSubmit,
    formState,
    setValue,
    getValues,
    watch,
    values,
  } = useForm<RedeemFormValues>({
    defaultValues,
    mode: "onChange",
    resolver: yupResolver(formSchema),
  });
  const { isDirty, errors } = formState;

  const retirementToken = watch("retirementToken");
  const selectedProject = watch("project");
  const paymentMethod = watch("paymentMethod");
  const quantity = watch("quantity");
  const projectAddress = watch("projectAddress");
  const cost = watch("cost");
  const setSelectedProject = (project) => setValue("project", project);
  const setProjectAddress = (address) => setValue("projectAddress", address);

  /** Initialize input from params after they are extracted, validated & stripped */
  // project address is removed when retirementToken is a param
  useEffect(() => {
    if (params.inputToken) {
      setValue("paymentMethod", params.inputToken);
    }
    if (params.retirementToken) {
      setValue("retirementToken", params.retirementToken);
    }
    if (params.projectTokens) {
      setValue("projectAddress", params.projectTokens);
    }
    if (params.quantity) {
      // handles the case where a decimal value for quantity is passed
      // as a query param - we convert it to a whole number (1.123 -> 2)
      const quantity =
        paymentMethod === "fiat"
          ? Math.ceil(Number(params.quantity)).toString()
          : params.quantity;
      setValue("quantity", quantity);
    }
  }, [params]);

  // const values = getValues();

  // useEffect(() => {
  //   console.log(allowances);
  // }, [values]);

  useEffect(() => {
    if (props.isConnected && props.address) {
      dispatch(
        getRetiredOffsetBalances({
          address: props.address,
          onRPCError: props.onRPCError,
        })
      );
      dispatch(
        getRedeemAllowances({
          address: props.address,
          onRPCError: props.onRPCError,
        })
      );
    }
  }, [props.isConnected, props.address]);

  // calculate cost
  useEffect(() => {
    if (quantity === 0) return;

    const awaitGetOffsetConsumptionCost = async () => {
      return setValue("cost", "5");
      // setValue("quantity", 0);
      const values = getValues();
      if (paymentMethod !== "fiat") {
        const consumptionCost = await getRedeemCost({ ...values });

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
        setValue("cost", cost);
      }
    };
    const debouncedCost = debounce(awaitGetOffsetConsumptionCost, 2000);

    debouncedCost();
  }, [quantity, projectAddress, paymentMethod, retirementToken]);

  const closeTransactionModal = () => {
    setStatus(null);
    setShowTransactionModal(false);
  };

  const hasApproval =
    paymentMethod !== "fiat" &&
    !!allowances?.[paymentMethod] &&
    !!Number(allowances?.[paymentMethod]) &&
    Number(cost) <= Number(allowances?.[paymentMethod]); // Caution: Number trims values down to 17 decimal places of precision

  const insufficientBalance =
    props.isConnected &&
    !isLoading &&
    paymentMethod !== "fiat" &&
    Number(cost) > Number(balances?.[paymentMethod] ?? "0");

  const handleApprove = async () => {
    try {
      if (!props.provider || paymentMethod === "fiat" || !cost) return;

      const token = paymentMethod;
      const spender = "retirementAggregatorV2";

      const approvedValue = await changeApprovalTransaction({
        value: getApprovalValue({ cost, paymentMethod }),
        provider: props.provider,
        token,
        spender,
        onStatus: setStatus,
      });

      dispatch(
        setAllowance({
          token,
          spender,
          value: approvedValue,
        })
      );
    } catch (e) {
      return;
    }
  };

  const handleRedeem = async () => {
    try {
      if (!props.address || !props.provider || paymentMethod === "fiat") return;

      const receipt = await redeemCarbonTransaction({
        paymentMethod,
        poolToken: retirementToken,
        maxAmountIn: cost,
        projectAddress,
        amount: quantity,
        provider: props.provider,
        onStatus: setStatus,
      });

      closeTransactionModal();
      // this opens RedeemSuccessModal
      setRedeemTransactionHash(receipt.transactionHash);
    } catch (e) {
      return;
    }
  };

  const getButtonProps = () => {
    if (!props.isConnected) {
      return {
        label: t({
          id: "shared.login_connect",
          message: "Login / Connect",
        }),
        onClick: props.toggleModal,
      };
      // } else if (isLoading || !cost) {
      //   return {
      //     label: t({ id: "shared.loading", message: "Loading..." }),
      //     disabled: true,
      //   };
    } else if (paymentMethod !== "fiat" && insufficientBalance) {
      return {
        label: t({
          id: "shared.insufficient_balance",
          message: "Insufficient balance",
        }),
        disabled: true,
      };
    } else if (paymentMethod !== "fiat" && !hasApproval) {
      return {
        label: t({ id: "shared.approve", message: "Approve" }),
        onClick: () => setShowTransactionModal(true),
      };
    }
    return {
      label: t({ id: "shared.redeem", message: "Redeem carbon" }),
      onClick: () => setShowTransactionModal(true),
    };
  };

  return (
    <>
      <RedeemLayout>
        <div className={styles.offsetCard_ui}>
          <DropdownWithModal
            label={t({
              id: "redeem.select_carbon_pool",
              message: "Select carbon pool type",
            })}
            modalTitle={t({
              id: "redeem.select_carbon_pool.title",
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
              type: "number",
              onKeyDown: (e) => {
                if (paymentMethod === "fiat" && ["."].includes(e.key)) {
                  e.preventDefault();
                }
              },
              ...register("quantity"),
            }}
            label="How much would you like to redeem?"
            errorMessage={
              redeemErrorTranslationsMap[
                errors.quantity?.message as RedeemErrorId
              ]
            }
          />

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

          <ButtonPrimary
            disabled={!isDirty}
            type="submit"
            {...getButtonProps()}
          />
        </div>

        {showTransactionModal && paymentMethod !== "fiat" && (
          <TransactionModal
            title={
              <Text t="h4" className={styles.redeemCard_header_title}>
                <ParkOutlined />
                <Trans>Redeem Carbon</Trans>
              </Text>
            }
            onCloseModal={closeTransactionModal}
            token={paymentMethod}
            spender={"retirementAggregatorV2"}
            value={cost.toString()}
            approvalValue={getApprovalValue({ cost, paymentMethod })}
            status={fullStatus}
            onResetStatus={() => setStatus(null)}
            onApproval={handleApprove}
            hasApproval={true}
            // hasApproval={hasApproval}
            onSubmit={handleRedeem}
          />
        )}
      </RedeemLayout>

      {redeemTransactionHash && (
        <RedeemSuccessModal
          onSuccessModalClose={() => {
            setRedeemTransactionHash("");
            reset();
          }}
          retirementUrl="#"
        />
      )}
    </>
  );
};
