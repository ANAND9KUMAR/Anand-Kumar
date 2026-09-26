import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Chatbot from "@/components/Chatbot";
import { getBotResponse } from "@/lib/chatbotEngine";

describe("Chatbot Knowledge Base & Intent Routing", () => {
  it("responds intelligently to greetings", () => {
    const res = getBotResponse("Hello");
    expect(res.text).toContain("Welcome to Anand Kumar's portfolio");
    expect(res.actions?.length).toBeGreaterThan(0);
  });

  it("provides detailed project links for project queries", () => {
    const res = getBotResponse("Tell me about your projects");
    expect(res.text).toContain("UVIndia Enterprise");
    expect(res.text).toContain("Tridev Car Care");
    expect(res.text).toContain("Finance Module");
    expect(res.actions?.some((a) => a.url?.includes("uvindia.in"))).toBe(true);
  });

  it("lists core technical skills", () => {
    const res = getBotResponse("What are your core skills?");
    expect(res.text).toContain("React 18+");
    expect(res.text).toContain("TypeScript");
    expect(res.text).toContain("Node.js");
  });

  it("provides verified contact details", () => {
    const res = getBotResponse("How to contact Anand?");
    expect(res.text).toContain("ananadgupta88099@gmail.com");
    expect(res.text).toContain("+91 9304705319");
  });

  it("provides CV / Resume download link", () => {
    const res = getBotResponse("Can I download your resume?");
    expect(res.text).toContain("curriculum vitae (CV)");
    expect(res.actions?.some((a) => a.url?.includes("drive.google.com"))).toBe(true);
  });

  it("returns helpful fallback for unmapped queries", () => {
    const res = getBotResponse("random unrelated question 12345");
    expect(res.text).toContain("Thanks for asking!");
    expect(res.actions?.length).toBeGreaterThan(0);
  });
});

describe("Chatbot UI Component", () => {
  it("renders the floating chat toggle button", () => {
    render(<Chatbot />);
    const toggleButton = screen.getByLabelText(/Open AI Assistant chat/i);
    expect(toggleButton).toBeInTheDocument();
  });

  it("opens the chat modal when toggle button is clicked", () => {
    render(<Chatbot />);
    const toggleButton = screen.getByLabelText(/Open AI Assistant chat/i);
    fireEvent.click(toggleButton);

    expect(screen.getByText("Anand's AI Assistant")).toBeInTheDocument();
    expect(screen.getByText(/Automated & Online/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Ask about projects, skills, contact.../i)).toBeInTheDocument();
  });

  it("allows user to type a message and send it", async () => {
    render(<Chatbot />);
    const toggleButton = screen.getByLabelText(/Open AI Assistant chat/i);
    fireEvent.click(toggleButton);

    const input = screen.getByPlaceholderText(/Ask about projects, skills, contact.../i);
    fireEvent.change(input, { target: { value: "Tell me about your projects" } });

    const sendButton = screen.getByLabelText(/Send message/i);
    fireEvent.click(sendButton);

    // Verify user message appears
    expect(screen.getByText("Tell me about your projects")).toBeInTheDocument();

    // Verify bot response appears after delay
    await waitFor(
      () => {
        expect(screen.getByText(/UVIndia Enterprise/i)).toBeInTheDocument();
      },
      { timeout: 1500 }
    );
  });

  it("closes the chat modal when close button is clicked", async () => {
    render(<Chatbot />);
    const toggleButton = screen.getByLabelText(/Open AI Assistant chat/i);
    fireEvent.click(toggleButton);

    const closeButton = screen.getByLabelText(/Close chat/i);
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByText("Anand's AI Assistant")).not.toBeInTheDocument();
    });
  });
});
