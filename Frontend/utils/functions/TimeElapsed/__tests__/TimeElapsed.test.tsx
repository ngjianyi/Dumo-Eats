import { Timestamp } from "firebase/firestore";
import TimeElapsed from "../TimeElapsed";

describe("Time elapsed function", () => {
  it("should return 45s", () => {
    const result = TimeElapsed(
      Timestamp.fromMillis(Timestamp.now().toMillis() - 45 * 1000)
    );
    expect(result).toBe("45s");
  });

  it("should return 27m", () => {
    const result = TimeElapsed(
      Timestamp.fromMillis(Timestamp.now().toMillis() - 27 * 1000 * 60)
    );
    expect(result).toBe("27m");
  });

  it("should return 6h", () => {
    const result = TimeElapsed(
      Timestamp.fromMillis(Timestamp.now().toMillis() - 6 * 1000 * 60 * 60)
    );
    expect(result).toBe("6h");
  });

  it("should return 4d", () => {
    const result = TimeElapsed(
      Timestamp.fromMillis(Timestamp.now().toMillis() - 4 * 1000 * 60 * 60 * 24)
    );
    expect(result).toBe("4d");
  });

  it("should return 35w", () => {
    const result = TimeElapsed(
      Timestamp.fromMillis(
        Timestamp.now().toMillis() - 35 * 1000 * 60 * 60 * 24 * 7
      )
    );
    expect(result).toBe("35w");
  });

  it("should return 3y", () => {
    const result = TimeElapsed(
      Timestamp.fromMillis(
        Timestamp.now().toMillis() - 3 * 1000 * 60 * 60 * 24 * 365
      )
    );
    expect(result).toBe("3y");
  });
});
