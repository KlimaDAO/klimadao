import { offsetInputTokens } from "@klimadao/lib/constants";
import { useWeb3 } from "@klimadao/lib/utils";
import { t } from "@lingui/macro";
import { useSelector } from "react-redux";
import { selectBalances } from "state/selectors";

import { DropdownWithModal } from "components/DropdownWithModal";
import { tokenInfo } from "lib/getTokenInfo";
import Fiat from "public/icons/Fiat.png";

// TODO make types stronger
type Props = {
  selectedPaymentMethod: string;
  isModalOpen: boolean;
  onPaymentMethodSelect: (paymentMethod: string) => void;
  onToggleModal: () => void;
};

export const PaymentMethodInput: React.FC<Props> = (props) => {
  const { isConnected } = useWeb3();
  const balances = useSelector(selectBalances);

  const paymentMethodItems = offsetInputTokens
    .map((tkn) => ({
      ...tokenInfo[tkn],
      description: (function () {
        // if (isLoading) return <Trans id="shared.loading" />;
        if (!isConnected || !Number(balances?.[tkn])) return "0";
        return Number(balances?.[tkn]).toFixed(2);
      })(),
      disabled: !balances?.[tkn] || !Number(balances[tkn]),
    }))
    .sort((a, b) => Number(b.description ?? 0) - Number(a.description ?? 0));
  paymentMethodItems.unshift({
    description: "",
    disabled: false,
    icon: Fiat,
    key: "fiat",
    label: "Credit Card",
  });

  return (
    <DropdownWithModal
      label={t({
        id: "offset.dropdown_payWith.label",
        message: "Pay with",
      })}
      modalTitle={t({
        id: "offset.modal_payWith.title",
        message: "Select Token",
      })}
      currentItem={props.selectedPaymentMethod}
      items={paymentMethodItems}
      isModalOpen={props.isModalOpen}
      onToggleModal={props.onToggleModal}
      onItemSelect={props.onPaymentMethodSelect}
    />
  );
};
