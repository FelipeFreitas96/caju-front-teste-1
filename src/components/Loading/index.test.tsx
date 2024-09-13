import { render, screen } from "@testing-library/react";
import { Loading } from ".";
import "@testing-library/jest-dom";

describe("Loading", () => {
  it("Should not display children when loading", () => {
    const { debug } = render(<Loading isLoading>Teste</Loading>);
    debug(); // Imprime o DOM atual
    expect(screen.queryByText(/Teste/i)).not.toBeInTheDocument();
  });

  it("Should display children when not loading", () => {
    const { debug } = render(<Loading isLoading={false}>Teste</Loading>);
    debug(); // Imprime o DOM atual
    expect(screen.getByText(/Teste/i)).toBeInTheDocument();
  });
});