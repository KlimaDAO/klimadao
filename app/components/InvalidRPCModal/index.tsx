import React, { FC } from "react";
import { Modal } from "components/Modal";
import { Trans } from "@lingui/macro";
import { Anchor as A } from "@klimadao/lib/components";
import { urls } from "@klimadao/lib/constants";

import { Text, ButtonPrimary } from "@klimadao/lib/components";

interface Props {
  onHide: () => void;
}

const METAMASK_TROUBLESHOOT_LINK =
  "https://klimadao.notion.site/Fix-LOADING-and-MetaMask-Network-RPC-Issues-ea26b4805440406c95385e57177a6407";

export const InvalidRPCModal: FC<Props> = (props) => (
  <Modal
    title={
      <>
        ⚠<Trans id="invalid_rpc.modal.title">Check your network settings</Trans>
      </>
    }
    onToggleModal={props.onHide}
  >
    <div>
      <Text color="lighter" t="caption">
        <Trans id="invalid_rpc.modal.text">
          The network could not be reached. This is most likely caused by an old
          Polygon RPC configuration in your wallet. See{" "}
          <A href={METAMASK_TROUBLESHOOT_LINK}>this guide</A> for a fix.
          Otherwise, reach out to us on <A href={urls.discordInvite}>Discord</A>{" "}
          if problems persist.
        </Trans>
      </Text>
    </div>
    <div style={{ display: "flex", justifyContent: "end", gap: "0.8rem" }}>
      <ButtonPrimary
        onClick={props.onHide}
        label="OK"
        variant="blue"
        rounded
      ></ButtonPrimary>
    </div>
  </Modal>
);
