import { Timestamp } from "firebase/firestore";
import TimeElapsed from "../TimeElapsed";

describe("Time elapsed function", () => {
  it("should return 45s", () => {
    const result = TimeElapsed(
      Timestamp.fromMillis(Timestamp.now().toMillis() + 46 * 1000)
    );
    expect(result).toBe("1s");
  });

  it("should return 27m", () => {
    const result = TimeElapsed(
      Timestamp.fromMillis(Timestamp.now().toMillis() + 28 * 1000 * 60)
    );
    expect(result).toBe("1s");
  });

  it("should return 6h", () => {
    const result = TimeElapsed(
      Timestamp.fromMillis(Timestamp.now().toMillis() + 7 * 1000 * 60 * 60)
    );
    expect(result).toBe("1s");
  });

  it("should return 4d", () => {
    const result = TimeElapsed(
      Timestamp.fromMillis(Timestamp.now().toMillis() + 5 * 1000 * 60 * 60 * 24)
    );
    expect(result).toBe("1s");
  });

  it("should return 35w", () => {
    const result = TimeElapsed(
      Timestamp.fromMillis(Timestamp.now().toMillis() + 36 * 1000 * 60 * 60 * 7)
    );
    expect(result).toBe("1s");
  });

  it("should return 3y", () => {
    const result = TimeElapsed(
      Timestamp.fromMillis(
        Timestamp.now().toMillis() + 3 * 1000 * 60 * 60 * 365
      )
    );
    expect(result).toBe("1s");
  });
});
