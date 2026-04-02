import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Spinner from "../components/Spinner";

describe("Spinner", () => {
  it("renderiza correctamente", () => {
    render(<Spinner color="#f59e0b" />);
    expect(screen.getByText(/generando/i)).toBeInTheDocument();
  });
});