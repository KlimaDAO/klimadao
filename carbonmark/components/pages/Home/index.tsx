import { Section, Text } from "@klimadao/lib/components";
import { Trans } from "@lingui/macro";
import { NextPage } from "next";

export interface Props {
  deleteme?: () => void;
}

export const Home: NextPage<Props> = () => {
  return (
    <>
      <Section variant="gray">
        <Text>
          <Trans>A new era for kleema dow</Trans>
        </Text>
      </Section>
    </>
  );
};
