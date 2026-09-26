import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ContactSection from "@/components/ContactSection";

describe("ContactSection", () => {
  it("renders heading and description", () => {
    render(<ContactSection />);
    expect(screen.getByText("Conversation")).toBeInTheDocument();
    expect(
      screen.getByText(/Currently open to new opportunities/i)
    ).toBeInTheDocument();
  });

  it("renders all valid contact methods with appropriate links", () => {
    render(<ContactSection />);
    expect(screen.getByText("ananadgupta88099@gmail.com")).toBeInTheDocument();
    expect(screen.getByText("+91 9304705319")).toBeInTheDocument();
    expect(screen.getByText("kum_ar_aanand")).toBeInTheDocument();

    const mailLink = screen.getByRole("link", { name: /Direct Inquiry/i });
    expect(mailLink).toHaveAttribute("href", "mailto:ananadgupta88099@gmail.com");

    const phoneLink = screen.getByRole("link", { name: /Direct Consultation/i });
    expect(phoneLink).toHaveAttribute("href", "tel:+919304705319");
  });
});
