import { fetchGasPrices } from "@/utils/fetchGasPrices";
import { getAggregatorContract } from "@/utils/getAggregatorContract";
import { getStaticProvider } from "@/utils/getStaticProvider";
import { getTokenInfo } from "@/utils/getTokenInfo";
import { isDefaultProjectAddress } from "@/utils/isDefaultProjectAddress";
import { validateReqBody } from "@/utils/validateReqBody";
import { parseUnits, TransactionReceipt, Wallet } from "ethers";
import { NextResponse } from "next/server";

enum TransferMode {
  EXTERNAL = 0,
  INTERNAL = 1,
  EXTERNAL_INTERNAL = 2,
  INTERNAL_TOLERANT = 3,
}

// 0xa17B52d5E17254B03dFdf7b4dfF2fc0C6108FaAc
const API_DEMO_WALLET_PHRASE = process.env.API_DEMO_WALLET_PHRASE;

/**
 * Execute transactions from a serverless function.
 * In this example wallet funds are controlled by you.
 * Don't want to deal with wallets, gas and blockchain transactions? See our Provide Services example integration instead.
 *
 * The application instantiates a wallet using a seed phrase, and then dispatches transactions to the Retirement Aggregator smart contract.
 * The wallet is pre-funded with a balance of USDC.e tokens, which is used to pay for the carbon.
 * The wallet also holds MATIC tokens, which are used to pay for the Polygon network fees (a few cents per txn).
 */
export async function POST(req: Request) {
  try {
    if (!API_DEMO_WALLET_PHRASE) {
      throw new Error(
        "This environment does not have the API_DEMO_WALLET_PHRASE variable."
      );
    }
    const body = validateReqBody(await req.json());
    const ServerWallet = Wallet.fromPhrase(API_DEMO_WALLET_PHRASE).connect(
      getStaticProvider()
    );
    const RetirementAggregator = getAggregatorContract(ServerWallet);

    // A spend approval needs to be given to the retirement aggregator contract.
    // 👇 To avoid having to do a spend-approval transaction for every retirement, uncomment this to do a single approval for the maximum quantity 👇
    // await approveMaxUsdc(ServerWallet);

    const paymentTokenAddress = getTokenInfo("usdc").address;
    const poolTokenAddress = getTokenInfo(body.pool).address;

    // slippage prevention - specify the max amount of USDC.e that can be spent. 3 cent max for demo purposes
    // It's up to the developer how they want to determine the max.
    // e.g. the tonne price shown to the customer, or the most recent quoted price, plus a small buffer
    const maxAmountIn = parseUnits("0.03", getTokenInfo("usdc").decimals);

    const amountToRetire = parseUnits(
      body.quantity.toString(),
      getTokenInfo(body.pool).decimals
    );
    const retiringEntityString = "";
    const beneficiaryAddress = ServerWallet.address; // Demo wallet is the beneficiary address

    /** Specify gas and fees based on the current network state, to ensure the retirement transaction is always prioritized. Thankfully polygon gas is cheap! */
    const gas = await fetchGasPrices();

    const params = [
      maxAmountIn,
      amountToRetire,
      retiringEntityString,
      beneficiaryAddress,
      body.beneficiaryName,
      body.retirementMessage,
      TransferMode.EXTERNAL,
      gas,
    ];

    // In order to construct a URL, we need to know the number (index) of the new retirement.
    // The easiest way to do this is just 'simulate' a retirement with staticCallResult
    // If you don't want to predict the URL, you don't have to do this.
    const [retirementIndex]: bigint[] =
      await RetirementAggregator.retireExactCarbonDefault.staticCallResult(
        paymentTokenAddress,
        poolTokenAddress,
        ...params.slice(0, params.length - 1) // don't need gas for staticCall
      );

    // Now we create the real retirement
    let txn;
    if (isDefaultProjectAddress(body.projectTokenAddress)) {
      txn = await RetirementAggregator.retireExactCarbonDefault(
        paymentTokenAddress,
        poolTokenAddress,
        ...params
      );
    } else {
      txn = await RetirementAggregator.retireExactCarbonSpecific(
        paymentTokenAddress,
        poolTokenAddress,
        body.projectTokenAddress,
        ...params
      );
    }
    // wait for 1 node to confirm that the transaction has been added to a block
    // In the worst case we might get skipped for 10 blocks (20 seconds)
    // 👉 consider if your serverless environment or webhook handler has a timeout!
    const receipt: TransactionReceipt = await txn.wait(1);

    // the receipt can be parsed to get the final cost after slippage and actual gas paid.
    // const values = receipt.logs.reduce(parseLog);
    return NextResponse.json({
      url: `https://carbonmark.com/retirements/${ServerWallet.address}/${retirementIndex}`,
    });
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "Unknown error occurred" },
      { status: 500 }
    );
  }
}
