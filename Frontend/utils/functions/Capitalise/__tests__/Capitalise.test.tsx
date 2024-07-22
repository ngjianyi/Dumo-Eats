import capitaliseFirstLetter from "../Capitalise";

describe("Capitalise first letter function", () => {
  it("should return empty string", () => {
    const result = capitaliseFirstLetter("");
    expect(result).toBe("");
  });

  it("should capitalise first letter of string", () => {
    const result = capitaliseFirstLetter("test");
    expect(result).toBe("Test");
  });

  it("should return string without changes", () => {
    const result = capitaliseFirstLetter("Test");
    expect(result).toBe("Test");
  });

  it("should capitalise first letter of string", () => {
    const result = capitaliseFirstLetter("test test");
    expect(result).toBe("Test test");
  });

  it("should return string without changes", () => {
    const result = capitaliseFirstLetter("Test test");
    expect(result).toBe("Test test");
  });
});
