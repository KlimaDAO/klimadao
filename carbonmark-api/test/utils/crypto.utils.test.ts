import { formatUSDC } from "../../src/utils/crypto.utils";

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
