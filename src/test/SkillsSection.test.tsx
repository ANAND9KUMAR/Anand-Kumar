import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import SkillsSection from "@/components/SkillsSection";

describe("SkillsSection", () => {
  it("renders heading and description", () => {
    render(<SkillsSection />);
    expect(screen.getByText("Stack")).toBeInTheDocument();
    expect(screen.getByText(/Technical/i)).toBeInTheDocument();
  });

  it("renders key skill categories and technologies", () => {
    render(<SkillsSection />);
    expect(screen.getByText("Development Core")).toBeInTheDocument();
    expect(screen.getByText("Styling & UI")).toBeInTheDocument();
    expect(screen.getByText("Tools & Systems")).toBeInTheDocument();

    expect(screen.getByText("React 18+")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("Tailwind CSS")).toBeInTheDocument();
  });
});
