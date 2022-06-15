import { FC, PropsWithChildren, ReactNode } from "react";
import { PageHead } from "components/PageHead";
import { Navigation } from "components/Navigation";
import { Footer } from "components/Footer";

import { ResourcesHeader } from "../ResourcesHeader";

type PageName = "blog" | "community" | "contact" | "podcast";

export type Props = PropsWithChildren<ReactNode> & {
  activePage: PageName;
  title: string;
  headline: string;
  subline: Element | string;
  mediaTitle: string;
  metaDescription: string;
  mediaImageSrc: string;
  headerElements?: FC<PropsWithChildren<ReactNode>>;
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

      <Navigation activePage="Resources" />

      <ResourcesHeader
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
