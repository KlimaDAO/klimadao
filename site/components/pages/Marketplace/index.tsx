import { NextPage } from "next";

import { Section, Text } from "@klimadao/lib/components";
import { Footer } from "components/Footer";
import { Navigation } from "components/Navigation";
import { PageHead } from "components/PageHead";

import * as styles from "./styles";

type Props = {
  temp?: string;
};

export const Home: NextPage<Props> = () => {
  return (
    <>
      <PageHead
        title="Project Bezos"
        mediaTitle="Coming Never"
        metaDescription="This Project Doesn't Exist"
      />
      <Navigation activePage="Home" />

      <Section variant="gray">
        <div className={styles.stack}>
          <Text t="h1">Project Bezos</Text>
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube-nocookie.com/embed/2x2jAuSXMOg?controls=0"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <Text>Coming never...</Text>
        </div>
        <div className={styles.stack}></div>
      </Section>
      <Footer />
    </>
  );
};
