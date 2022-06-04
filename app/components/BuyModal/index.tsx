import React, { FC, useEffect, useState } from "react";
import { useAppDispatch } from "../../state";
import { AppState, setAppState } from "../../state/app";
import * as styles from "./styles";
import { Text, Spinner } from "@klimadao/lib/components";
import { Trans } from "@lingui/macro";
import { concatAddress } from "@klimadao/lib/utils";
import CloseIcon from "@mui/icons-material/Close";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Check from "@mui/icons-material/Check";
import { useSelector } from "react-redux";
import { selectAppState } from "../../state/selectors";
import TransakSDK from "@transak/transak-sdk";

type Props = {
  address?: string;
};

export const BuyModal: FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  const { buyModalService }: AppState = useSelector(selectAppState);

  const [isAddressCopied, setIsAddressCopied] = useState(false);
  const [isLoadingMobilumWidget, setIsLoadingMobilumWidget] = useState(false);

  useEffect(() => {
    if (buyModalService && buyModalService.length > 0) {
      if (buyModalService === "transak") {
        const transak = new TransakSDK({
          apiKey: process.env.NEXT_PUBLIC_TRANSAK_API_KEY as string,
          environment: "PRODUCTION",
          widgetHeight: "625px",
          widgetWidth: "500px",
          defaultCryptoCurrency: "KLIMA",
          fiatCurrency: "EUR",
          walletAddress: props.address as string,
        });

        transak.init();
      }
      if (buyModalService === "mobilum") {
        const _getWidget = async (): Promise<void> => {
          setIsLoadingMobilumWidget(true);
          const res = await fetch("/api/buy", {
            method: "POST",
            body: JSON.stringify({
              address: props.address,
            }),
          });

          const json = await res.json();

          const element = document.getElementById("mobilumWidgetContainer");
          if (element) {
            setIsLoadingMobilumWidget(false);
            element.innerHTML = json.html;
            const script = document.createElement("script");
            script.async = true;
            script.src = json.scriptUrl;
            element.appendChild(script);
          }
        };

        _getWidget();
      }
    }
  }, [buyModalService]);

  if (
    !buyModalService ||
    buyModalService.length === 0 ||
    buyModalService === "transak"
  )
    return null;

  const handleCopyAddressClick = (): void => {
    if (props.address) {
      setIsAddressCopied(true);
      navigator.clipboard.writeText(props.address);
      if (document.activeElement) {
        (document.activeElement as HTMLElement).blur();
      }
      setTimeout(() => {
        setIsAddressCopied(false);
      }, 3000);
    }
  };

  const closeModal = function (): void {
    dispatch(setAppState({ buyModalService: null }));
  };

  return (
    <div className={styles.bg}>
      <div className={styles.card}>
        <div className={styles.card_header}>
          <Text>
            <Trans id={"buy.modal.headline"}>Buy Klima</Trans>
          </Text>
          <button onClick={closeModal} className={styles.closeButton}>
            <CloseIcon />
          </button>
        </div>
        <div className={styles.card_connected}>
          <Text t={"h5"} color={"default"}>
            <Trans id={"buy.modal.connected"}>Connected address</Trans>
          </Text>
          <button
            className={styles.copyAddress}
            onClick={handleCopyAddressClick}
          >
            {!isAddressCopied && (
              <>
                <span>{props.address ? concatAddress(props.address) : ""}</span>
                <ContentCopyIcon />
              </>
            )}
            {isAddressCopied && (
              <>
                <span>Copied!</span>
                <Check />
              </>
            )}
          </button>
        </div>
        {isLoadingMobilumWidget && (
          <div className={styles.spinner_container}>
            <Spinner />
          </div>
        )}
        <div
          id={"mobilumWidgetContainer"}
          className={styles.card_iframe_container}
        >
          {/*<iframe*/}
          {/*  className={styles.buyCard_iframe}*/}
          {/*  src={"https://klima.mobilum.com/"}*/}
          {/*></iframe>*/}
        </div>
      </div>
    </div>
  );
};
