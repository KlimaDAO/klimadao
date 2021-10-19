import { useSelector } from "react-redux";

export const useBond = bond => {
  const price = useSelector(state => {
    return state.bonding[bond] && state.bonding[bond].bondPrice;
  });
  const discount = useSelector(state => {
    return state.bonding[bond] && state.bonding[bond].bondDiscount;
  });
  return {
    price,
    discount,
    name: {
      bct: "BCT",
      klima_bct_lp: "BCT/KLIMA LP",
      bct_usdc_lp: "BCT/USDC LP"
      // future bond names go here
    }[bond],
    description: {
      bct: "Base Carbon Tons (Verra Carbon Standard)",
      klima_bct_lp: "BCT/KLIMA Sushiswap LP Bonds",
      bct_usdc_lp: "BCT/USDC Sushiswap LP Bonds"
      // future bond descriptions go here
    }[bond],
    href: {
      bct: "/bonds/bct",
      klima_bct_lp: "/bonds/klima_bct_lp",
      bct_usdc_lp: "/bonds/bct_usdc_lp"
      // future bond hrefs go here
    }[bond],
  };
};
