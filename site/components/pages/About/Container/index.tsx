import { Footer } from "components/Footer";
import { Navigation } from "components/Navigation";
import { PageHead } from "components/PageHead";
import { FC, ReactNode } from "react";

import { AboutHeader } from "../AboutHeader";

type PageName = "community" | "contact" | "disclaimer";

export type Props = {
  activePage: PageName;
  title: string;
  headline: string;
  subline: JSX.Element | string;
  mediaTitle: string;
  metaDescription: string;
  mediaImageSrc: string;
  headerElements?: ReactNode;
  children: ReactNode;
};

export const Container: FC<Props> = (props) => {
  return (
    <>
      <PageHead
        title={props.title}
        mediaTitle={props.mediaTitle}
        metaDescription={props.metaDescription}
        mediaImageSrc={props.mediaImageSrc}
      />

      <Navigation activePage="About" />

      <AboutHeader
        activePage={props.activePage}
        title={props.headline}
        subline={props.subline}
        headerElements={props.headerElements}
      />

      {props.children}

      <Footer />
    </>
  );
};
