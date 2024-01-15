import { t } from "@lingui/macro";
import { ButtonPrimary } from "components/Buttons/ButtonPrimary";
import { ButtonSecondary } from "components/Buttons/ButtonSecondary";
import FeatureBanner from "components/FeatureBanner";
import { urls } from "lib/constants";
import { FC, useEffect, useState } from "react";

export const BankTransferBanner: FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [localStorage, setLocalStorage] = useState("0");
  const [sessionStorage, setSessionStorage] = useState("0");

  const isInitialBanner = localStorage === "0";

  useEffect(() => {
    updateStateValues();
  }, []);

  useEffect(() => {
    setIsVisible(!(sessionStorage !== "0" || localStorage === "2"));
  }, [localStorage, sessionStorage]);

  const updateStateValues = () => {
    setLocalStorage(window.localStorage.getItem("feature-banner") ?? "0");
    setSessionStorage(window.sessionStorage.getItem("feature-banner") ?? "0");
  };

  const setStorageValues = (
    [local, session]: string[],
    shouldUpdate = true
  ) => {
    window.localStorage.setItem("feature-banner", local || "0");
    window.sessionStorage.setItem("feature-banner", session || "0");
    if (shouldUpdate) updateStateValues();
  };

  const onLetsGo = () => {
    setStorageValues(["1"], false);
  };

  const onClose = () => {
    setStorageValues(["1"]);
  };

  const onShowLater = () => {
    setIsVisible(false);
    setStorageValues(["0", "1"], false);
  };

  const onDontRemindLater = () => {
    setStorageValues(["2", "2"]);
  };

  return (
    <>
      <FeatureBanner
        isVisible={isVisible}
        isInitialBanner={isInitialBanner}
        onClose={onClose}
        title={t`Pay via Bank Transfer / Wire`}
        showClose={isInitialBanner}
        showNewFeatureLabel={isInitialBanner}
        description={
          isInitialBanner
            ? t`Purchase retirements from any project on Carbonmark and pay via bank transfer.`
            : t`Can we remind you about this new feature later?`
        }
      >
        {isInitialBanner ? (
          <>
            <ButtonPrimary
              onClick={onLetsGo}
              label={t`Let's Go!`}
              href="/retire/pay-with-bank"
            />
            <ButtonSecondary
              target="_blank"
              label={t`Learn More`}
              href={urls.payViaBankDocs}
            />
          </>
        ) : (
          <>
            <ButtonPrimary label={t`Sure`} onClick={onShowLater} />
            <ButtonSecondary
              label={t`Don't Remind Me`}
              onClick={onDontRemindLater}
            />
          </>
        )}
      </FeatureBanner>
    </>
  );
};
