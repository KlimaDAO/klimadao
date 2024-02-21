import { t } from "@lingui/macro";
import { ButtonPrimary } from "components/Buttons/ButtonPrimary";
import { ButtonSecondary } from "components/Buttons/ButtonSecondary";
import FeatureBanner from "components/FeatureBanner";
import { urls } from "lib/constants";
import { FC, useEffect, useState } from "react";

type BannerState = "initial-banner" | "secondary-banner" | "none";
type SessionState = "visible" | "hidden" | "not-shown";

export const BankTransferBanner: FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  // @todo Makka - create useLocalStorage/useSessionStorage hook
  const [localStorage, setLocalStorage] =
    useState<BannerState>("initial-banner");
  const [sessionStorage, setSessionStorage] = useState<SessionState>("visible");

  const isInitialBanner = localStorage === "initial-banner";

  useEffect(() => {
    updateStateValues();
  }, []);

  useEffect(() => {
    setIsVisible(!(sessionStorage !== "visible" || localStorage === "none"));
  }, [localStorage, sessionStorage]);

  const updateStateValues = () => {
    setLocalStorage(
      (window.localStorage.getItem("feature-banner") as BannerState) ??
        "initial-banner"
    );
    setSessionStorage(
      (window.sessionStorage.getItem("feature-banner") as SessionState) ??
        "visible"
    );
  };

  const setStorageValues = (
    [local, session = "visible"]: [BannerState, SessionState?],
    shouldUpdate = true
  ) => {
    window.localStorage.setItem("feature-banner", local || "initial-banner");
    window.sessionStorage.setItem("feature-banner", session || "visible");
    if (shouldUpdate) updateStateValues();
  };

  const onLetsGo = () => {
    // show secondary banner but don't re-render
    setStorageValues(["secondary-banner"], false);
  };

  const onClose = () => {
    // hide the initial banner & show the secondary banner
    setStorageValues(["secondary-banner"]);
  };

  const onShowLater = () => {
    setIsVisible(false);
    // show the initial banner but hide for the current session and don't re-render
    setStorageValues(["initial-banner", "hidden"], false);
  };

  const onDontRemindLater = () => {
    // hide the banner permanently
    setStorageValues(["none", "not-shown"]);
  };

  return (
    <FeatureBanner
      isVisible={isVisible}
      isInitialBanner={isInitialBanner}
      onClose={onClose}
      title={t`Pay via Bank Transfer / Wire`}
      showClose={isInitialBanner}
      featureLabel={isInitialBanner ? t`NEW FEATURE:` : ""}
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
  );
};
