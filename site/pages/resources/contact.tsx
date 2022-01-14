import { GetStaticProps } from "next";
import { Contact, Props } from "components/pages/Resources/Contact";

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: {},
    revalidate: 60,
  };
};

export default Contact;
