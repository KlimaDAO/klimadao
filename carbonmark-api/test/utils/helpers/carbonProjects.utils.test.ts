import { CreditId } from "../../../src/utils/helpers/carbonProjects.utils";

describe("CreditId", () => {
  test("Accepts CreditIdentifier string", () => {
    expect(new CreditId("VCS-191-2008").toString()).toBe("VCS-191-2008");
  });

  test("Accepts IDParams", () => {
    expect(
      new CreditId({
        standard: "VCS",
        registryProjectId: "191",
        vintage: "2008",
      }).toString()
    ).toBe("VCS-191-2008");
  });

  test("Derives and initializes properties", () => {
    const { creditId, projectId, standard, registryProjectId, vintage } =
      new CreditId("VCS-191-2008");
    expect(creditId).toBe("VCS-191-2008");
    expect(projectId).toBe("VCS-191");
    expect(standard).toBe("VCS");
    expect(registryProjectId).toBe("191");
    expect(vintage).toBe("2008");
  });

  test("Converts standard to uppercase - string input", () => {
    const { creditId, projectId, standard } = new CreditId("vcs-191-2008");
    expect(creditId).toBe("VCS-191-2008");
    expect(projectId).toBe("VCS-191");
    expect(standard).toBe("VCS");
  });

  test("Converts standard to uppercase - params input", () => {
    const { creditId, projectId, standard } = new CreditId({
      standard: "vcs",
      registryProjectId: "191",
      vintage: "2008",
    });
    expect(creditId).toBe("VCS-191-2008");
    expect(projectId).toBe("VCS-191");
    expect(standard).toBe("VCS");
  });

  test("isValidCreditId - static method", () => {
    expect(CreditId.isValidCreditId("VCS-191-2008")).toBe(true);
    expect(CreditId.isValidCreditId("vcs-191-2008")).toBe(true);
    expect(CreditId.isValidCreditId("VCS-191-0")).toBe(false);
    expect(CreditId.isValidCreditId("VCS-0")).toBe(false);
    expect(CreditId.isValidCreditId({})).toBe(false);
    expect(CreditId.isValidCreditId("")).toBe(false);
    expect(CreditId.isValidCreditId(null)).toBe(false);
    expect(CreditId.isValidCreditId(undefined)).toBe(false);
  });

  test("Throws on invalid string input", () => {
    expect(() => new CreditId("VCS-0-0")).toThrow();
    expect(() => new CreditId("VCS-191")).toThrow();
  });
  test("Throws on invalid params input", () => {
    expect(
      () =>
        new CreditId({
          standard: "VCS",
          registryProjectId: "",
          vintage: "",
        })
    ).toThrow();
    expect(
      () =>
        new CreditId({
          standard: "VCS",
          registryProjectId: "0",
          vintage: "0",
        })
    ).toThrow();
  });
});
