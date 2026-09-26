import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ProjectsSection from "@/components/ProjectsSection";

describe("ProjectsSection", () => {
  it("renders the section heading and description", () => {
    render(<ProjectsSection />);
    expect(screen.getByText("Creations")).toBeInTheDocument();
    expect(
      screen.getByText(/A showcase of engineering excellence/i)
    ).toBeInTheDocument();
  });

  it("renders all featured projects with secure demo links", () => {
    render(<ProjectsSection />);
    const projects = [
      "UVIndia Enterprise",
      "Tridev Car Care",
      "ArudhaTech",
      "Finance Module"
    ];

    projects.forEach((title) => {
      expect(screen.getByText(title)).toBeInTheDocument();
      const link = screen.getByLabelText(new RegExp(`View live demo of ${title}`, "i"));
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });
  });
});
