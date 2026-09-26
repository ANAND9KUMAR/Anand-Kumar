import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import AutomationSection from "@/components/AutomationSection";

describe("AutomationSection", () => {
  it("renders section heading and autonomous engineering badge", () => {
    render(<AutomationSection />);
    expect(screen.getByText("Automation Hub")).toBeInTheDocument();
    expect(screen.getByText(/Autonomous Engineering/i)).toBeInTheDocument();
  });

  it("renders CI/CD pipeline steps and commands", () => {
    render(<AutomationSection />);
    expect(screen.getByText("Code Quality & ESLint")).toBeInTheDocument();
    expect(screen.getByText("Vitest Automated Suites")).toBeInTheDocument();
    expect(screen.getByText("Production Optimization")).toBeInTheDocument();
    expect(screen.getByText("Edge Deployment & Cache")).toBeInTheDocument();
  });

  it("renders telemetry bento metrics", () => {
    render(<AutomationSection />);
    expect(screen.getByText("Lighthouse Performance")).toBeInTheDocument();
    expect(screen.getByText("State & UI Latency")).toBeInTheDocument();
    expect(screen.getByText("Critical Post-Launch")).toBeInTheDocument();
  });

  it("allows triggering pipeline simulation", async () => {
    render(<AutomationSection />);
    const button = screen.getByRole("button", { name: /Test Automation Pipeline/i });
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(screen.getByText(/Simulating Pipeline.../i)).toBeInTheDocument();
  });
});
