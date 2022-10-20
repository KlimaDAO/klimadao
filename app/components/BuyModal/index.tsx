import React, { FC, useEffect, useState } from "react";
import { useAppDispatch } from "../../state";
import { AppState, setAppState } from "../../state/app";
import * as styles from "./styles";
import { Text, Spinner } from "@klimadao/lib/components";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import { selectAppState } from "../../state/selectors";
import { useWeb3 } from "@klimadao/lib/utils";
import { urls } from "@klimadao/lib/constants";
import { t } from "@lingui/macro";

type MobilumResponse = {
  result: {
    widgetBase64Html: string;
    widgetBase64ScriptUrl: string;
  };
};

const isValidMobilumResponse = (
  body: Record<string, unknown> | string | null | undefined | MobilumResponse
): body is MobilumResponse => {
  return !!(
    !!body &&
    (body as MobilumResponse).result &&
    (body as MobilumResponse).result.widgetBase64ScriptUrl &&
    (body as MobilumResponse).result.widgetBase64Html
  );
};

export const BuyModal: FC = () => {
  const dispatch = useAppDispatch();
  const { buyModalService }: AppState = useSelector(selectAppState);

  const [isLoading, setIsLoading] = useState(false);
  const [didLoad, setDidLoad] = useState(false);

  const web3 = useWeb3();

  useEffect(() => {
    if (buyModalService && buyModalService.length > 0) {
      if (buyModalService === "mobilum") {
        const _getWidget = async (): Promise<void> => {
          setIsLoading(true);
          const res = await fetch(urls.getMobilumWidget, {
            method: "POST",
            headers: {
              ApiKey: process.env.NEXT_PUBLIC_MOBILUM_API_KEY as string,
              "Content-Type": "application/json",
            },
          });

          const json = await res.json();

          if (!isValidMobilumResponse(json)) {
            setIsLoading(false);
            throw new Error(
              t({
                id: "buymodal.mobilume.fetch.error",
                message: "Failed to fetch data",
              })
            );
          }

          const htmlBuffer = Buffer.from(
            json.result.widgetBase64Html,
            "base64"
          );
          const html = htmlBuffer.toString();

          const scriptUrlBuffer = Buffer.from(
            json.result.widgetBase64ScriptUrl,
            "base64"
          );
          const scriptUrl = scriptUrlBuffer.toString();

          const element = document.getElementById("mobilumWidgetContainer");
          if (element) {
            element.innerHTML = html;
            const script = document.createElement("script");
            script.async = true;
            script.src = scriptUrl;
            element.appendChild(script);
            script.addEventListener("load", () => {
              setDidLoad(true);
              setIsLoading(false);
            });
          }
        };

        _getWidget();
      }
    }
  }, [buyModalService]);

  useEffect(() => {
    if (!didLoad && !isLoading && buyModalService === "transak") {
      setIsLoading(true);
    }
  }, [buyModalService]);

  if (!buyModalService || buyModalService.length === 0) return null;

  const closeModal = function (): void {
    dispatch(setAppState({ buyModalService: null }));
  };

  return (
    <div className={styles.bg}>
      <div className={styles.card}>
        <div className={styles.card_header}>
          <Text>{buyModalService}</Text>
          <button onClick={closeModal} className={styles.close_button}>
            <CloseIcon />
          </button>
        </div>
        <div className={styles.card_connected}></div>
        {isLoading && (
          <div className={styles.spinner_container}>
            <Spinner />
          </div>
        )}
        {buyModalService === "mobilum" && (
          <div
            id={"mobilumWidgetContainer"}
            className={styles.card_iframe_container}
          ></div>
        )}
        {buyModalService === "transak" && (
          <div className={styles.iframe_wrapper}>
            <iframe
              id={"transakIframe"}
              height="700"
              title={t({
                id: "buymodal.transak.iframe.title",
                message: "Transak On/Off Ramp Widget",
              })}
              src={`https://global.transak.com?apiKey=${process.env.NEXT_PUBLIC_TRANSAK_API_KEY}&cryptoCurrencyCode=KLIMA&fiatCurrency=EUR&walletAddress=${web3.address}&fiatAmount=100`}
              allowTransparency
              allowFullScreen
              style={{
                display: "block",
                width: "100%",
                maxWidth: "500px",
                border: "none",
              }}
              onLoad={() => {
                setDidLoad(true);
                setIsLoading(false);
              }}
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
};
