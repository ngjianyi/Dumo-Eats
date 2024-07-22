import React from "react";
import {
  render,
  screen,
} from "@testing-library/react-native";

import ProgressTracker from "../CalorieTracker/ProgressTracker";

describe("Calorie bar is rendered correctly", () => {
    it("Checks that progress bar is rendered correctly", () => {
        render(<ProgressTracker/>)
        const bar = screen.getByLabelText("caloriebar")
        const updateButton = screen.getByLabelText("UpdateButton")
        const resetButton = screen.getByLabelText("ResetButton")
        expect(resetButton).toBeTruthy()
        expect(updateButton).toBeTruthy()
        expect(bar).toBeTruthy()
    })
})
