import { NextPage } from "next";
import Link from "next/link";

import { Copy, Section, Heading } from "@klimadao/lib/components";
import { t } from "@lingui/macro";

import styles from "./styles";
import { Container } from "../Container";

export type Props = HTMLHtmlElement & {};

export const Community: NextPage<Props> = ({}) => {
  return (
    <Container activePage={"community"}>
      <Section contentVariant="contained">
        <Heading
          align="center"
          text={t({
            message: "Community",
          })}
        />
        <Copy
          align={"center"}
          text={t({
            message:
              "KlimaDAO harnesses the power of cryptocurrency, blockchain and smart contracts to create.",
          })}
        />
      </Section>
    </Container>
  );
};
