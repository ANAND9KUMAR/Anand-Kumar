import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Navbar from "@/components/Navbar";

describe("Navbar", () => {
  it("renders branding logo", () => {
    render(<Navbar />);
    expect(screen.getByText("ANAND")).toBeInTheDocument();
  });

  it("renders all navigation links", () => {
    render(<Navbar />);
    const navItems = ["About", "Skills", "Projects", "Experience", "Contact"];
    navItems.forEach((item) => {
      const links = screen.getAllByRole("link", { name: new RegExp(item, "i") });
      expect(links.length).toBeGreaterThan(0);
    });
  });
});
