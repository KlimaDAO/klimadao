import { Pool } from "@/types";
import { fetchPoolPrice } from "@/utils/fetchPoolPrice";

export async function CurrentPoolPrice(props: {
  pool: Pool;
  mode: "default" | "selective";
}) {
  const poolPrice = await fetchPoolPrice({
    pool: props.pool,
    quantity: 1,
    mode: props.mode,
  });
  const formattedPrice = Number(poolPrice).toFixed(2);
  return <>${formattedPrice}</>;
}
