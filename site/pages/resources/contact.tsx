import { GetStaticProps } from "next";
import { Contact } from "components/pages/Resources/Contact";

type Props = {};

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
  return {
    props: {},
    revalidate: 60,
  };
};

export default Contact;
