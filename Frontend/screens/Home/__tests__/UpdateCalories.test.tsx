import React from "react";
import {
  render,
  screen,
  userEvent,
  waitFor,
} from "@testing-library/react-native";
import UpdateCaloriesScreen from "../CalorieTracker/UpdateCaloriesScreen";
import { updateCalories } from "../CalorieTracker/UpdateCaloriesScreen";
import { Alert } from "react-native";
global.alert = jest.fn()

describe("Updating daily calories work correctly", () => {
    it("textbox to input calories renders correctly", () => {
        render(<UpdateCaloriesScreen/>)
        const inputBox = screen.getByLabelText("InputBox")
        expect(inputBox).toBeTruthy()
    })

    it("Submit button renders correctly", () => {
        render(<UpdateCaloriesScreen/>)
        const submitButton = screen.getByLabelText("SubmitButton")
        expect(submitButton).toBeTruthy()
    })

    it("Checks that invalid calorie inputs are handled", async () => {
        const calorieInputs: string[] = [
            "-100",
            "abcdefg",
            "@#$%",
            "=5555"
        ]
        const setCaloriesMock = jest.fn();
        for (let i = 0; i < calorieInputs.length; i++) {
            updateCalories.call({ setCalories: setCaloriesMock }, calorieInputs[i]);
            expect(global.alert).toHaveBeenCalledWith("Error, input needs to be a number and greater than 0")
        }
    })

})