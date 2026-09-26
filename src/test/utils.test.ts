import { describe, it, expect } from "vitest";
import { cn } from "@/lib/utils";

describe("cn utility", () => {
  it("merges class names correctly", () => {
    expect(cn("px-2 py-1", "bg-red-500")).toBe("px-2 py-1 bg-red-500");
  });

  it("handles conditional class names", () => {
    const isActive = true;
    const isInactive = false;
    expect(cn("base-class", isActive && "active", isInactive && "inactive")).toBe("base-class active");
  });

  it("resolves Tailwind conflicting classes using tailwind-merge", () => {
    expect(cn("px-2 px-4", "text-red-500 text-blue-500")).toBe("px-4 text-blue-500");
  });
});
