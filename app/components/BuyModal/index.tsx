import React, { FC, useEffect, useState } from "react";
import { useAppDispatch } from "../../state";
import { AppState, setAppState } from "../../state/app";
import * as styles from "./styles";
import { Text, Spinner } from "@klimadao/lib/components";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import { selectAppState } from "../../state/selectors";

type Props = {
  address?: string;
};

export const BuyModal: FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  const { buyModalService }: AppState = useSelector(selectAppState);

  const [isLoadingMobilumWidget, setIsLoadingMobilumWidget] = useState(false);

  useEffect(() => {
    if (buyModalService && buyModalService.length > 0) {
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

  if (!buyModalService || buyModalService.length === 0) return null;

  const closeModal = function (): void {
    dispatch(setAppState({ buyModalService: null }));
  };

  return (
    <div className={styles.bg}>
      <div className={styles.card}>
        <div className={styles.card_header}>
          <Text>{buyModalService}</Text>
          <button onClick={closeModal} className={styles.closeButton}>
            <CloseIcon />
          </button>
        </div>
        <div className={styles.card_connected}></div>
        {buyModalService === "mobilum" && (
          <>
            {isLoadingMobilumWidget && (
              <div className={styles.spinner_container}>
                <Spinner />
              </div>
            )}
            <div
              id={"mobilumWidgetContainer"}
              className={styles.card_iframe_container}
            ></div>
          </>
        )}
        {buyModalService === "transak" && (
          <iframe
            height="700"
            title="Transak On/Off Ramp Widget"
            src={`https://global.transak.com?apiKey=${process.env.NEXT_PUBLIC_TRANSAK_API_KEY}&cryptoCurrencyCode=KLIMA`}
            allowTransparency
            allowFullScreen
            style={{
              display: "block",
              width: "100%",
              maxHeight: "700px",
              maxWidth: "500px",
              border: "none",
            }}
          ></iframe>
        )}
      </div>
    </div>
  );
};
