import { CPFValidator } from "./validateCPF";

describe("Validate CPF", () => {
  it("Should not validate CPF with less than 11 digits", () => {
    expect(CPFValidator.validate("123.456.789-0")).toBe(false);
  });
  it("Should not validate CPF with more than 11 digits", () => {
    expect(CPFValidator.validate("123.456.789-098")).toBe(false);
  });
  it("Should not validate CPF with all digits equal", () => {
    expect(CPFValidator.validate("111.111.111-11")).toBe(false);
  });
  it("Should not validate CPF with all digits zero", () => {
    expect(CPFValidator.validate("000.000.000-00")).toBe(false);
  });
  it("Should validate CPF with 11 digits", () => {
    expect(CPFValidator.validate("487.209.120-56")).toBe(true);
  });
});
