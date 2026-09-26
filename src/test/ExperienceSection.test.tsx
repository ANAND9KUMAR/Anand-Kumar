import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ExperienceSection from "@/components/ExperienceSection";

describe("ExperienceSection", () => {
  it("renders history heading", () => {
    render(<ExperienceSection />);
    expect(screen.getByText("History")).toBeInTheDocument();
  });

  it("renders experience role and achievements", () => {
    render(<ExperienceSection />);
    expect(screen.getByText("Software Engineering Consultant")).toBeInTheDocument();
    expect(screen.getByText("Independent / Digital Agencies")).toBeInTheDocument();
    expect(
      screen.getByText(/Engineered comprehensive design systems reducing development time by 30%/i)
    ).toBeInTheDocument();
  });
});
