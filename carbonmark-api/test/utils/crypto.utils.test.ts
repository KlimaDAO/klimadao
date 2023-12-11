import { Wallet } from "ethers";
import { SIGN_PROFILE_MESSAGE } from "../../src/app.constants";
import {
  formatUSDC,
  verifyProfileSignature,
} from "../../src/utils/crypto.utils";

describe("formatUSDC", () => {
  test("formats strings", () => {
    expect(formatUSDC("0")).toBe("0.000000");
    expect(formatUSDC("1")).toBe("0.000001");
    expect(formatUSDC("01")).toBe("0.000001");
    expect(formatUSDC("1000000")).toBe("1.000000");
    expect(formatUSDC("1000001")).toBe("1.000001");
    expect(formatUSDC("1100001")).toBe("1.100001");
    expect(formatUSDC("777777777777777777")).toBe("777777777777.777777");
  });
  test("formats bigints", () => {
    // smallest USDC value
    expect(formatUSDC(BigInt("1"))).toBe("0.000001");
    expect(formatUSDC(BigInt("01"))).toBe("0.000001");
    expect(formatUSDC(BigInt("1000000"))).toBe("1.000000");
    expect(formatUSDC(BigInt("1000001"))).toBe("1.000001");
    expect(formatUSDC(BigInt("1100001"))).toBe("1.100001");
    expect(formatUSDC(BigInt("777777777777777777"))).toBe(
      "777777777777.777777"
    );
  });
});

describe("verifyProfileSignature", () => {
  test("Happy path", async () => {
    const nonce = 123;
    const wallet1 = Wallet.createRandom();
    const message = SIGN_PROFILE_MESSAGE + nonce;
    const signature = await wallet1.signMessage(message);
    expect(
      verifyProfileSignature({
        nonce,
        signature,
        expectedAddress: wallet1.address,
      })
    ).toBe(true);
  });
  test("Returns false if nonce changes", async () => {
    const nonce = 123;
    const wallet1 = Wallet.createRandom();
    const message = SIGN_PROFILE_MESSAGE + nonce;
    const signature = await wallet1.signMessage(message);
    expect(
      verifyProfileSignature({
        nonce: 124, // doesn't match what was signed above
        signature,
        expectedAddress: wallet1.address,
      })
    ).toBe(false);
  });
  test("Returns false if expected message changes", async () => {
    const nonce = 123;
    const wallet1 = Wallet.createRandom();
    const message = "oops_wrong_message" + nonce;
    const signature = await wallet1.signMessage(message);
    expect(
      verifyProfileSignature({
        nonce, // doesn't match what was signed above
        signature,
        expectedAddress: wallet1.address,
      })
    ).toBe(false);
  });
  test("Returns false if signer is not expectedAddress", async () => {
    const nonce = 123;
    const wallet1 = Wallet.createRandom();
    const wallet2 = Wallet.createRandom();
    const message = SIGN_PROFILE_MESSAGE + nonce;
    const signature = await wallet1.signMessage(message);
    expect(
      verifyProfileSignature({
        nonce,
        signature,
        expectedAddress: wallet2.address,
      })
    ).toBe(false);
  });
});
