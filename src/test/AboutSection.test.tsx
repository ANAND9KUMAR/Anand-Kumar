import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import AboutSection from "@/components/AboutSection";

describe("AboutSection", () => {
  it("renders heading and summary", () => {
    render(<AboutSection />);
    expect(screen.getByText("Overview")).toBeInTheDocument();
    expect(screen.getByText(/Software Engineer dedicated to building next-generation/i)).toBeInTheDocument();
  });

  it("renders core capability highlights", () => {
    render(<AboutSection />);
    expect(screen.getByText("Modern Stack Expertise")).toBeInTheDocument();
    expect(screen.getByText("Performance Engineering")).toBeInTheDocument();
    expect(screen.getByText("Cross-Platform Precision")).toBeInTheDocument();
    expect(screen.getByText("Architectural Integrity")).toBeInTheDocument();
  });
});
