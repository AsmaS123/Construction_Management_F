import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Login from "./Login";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../const/httpinterceptor";

jest.mock("axios");
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("Login Component", () => {
  const mockNavigate = jest.fn();

  // beforeEach(() => {
  //   useNavigate.mockReturnValue(mockNavigate);
  // });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders the login form", () => {
    render(<Login />);

    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign in/i }),
    ).toBeInTheDocument();
  });

  test("submits the form and navigates to the dashboard on successful login", async () => {
    // axiosInstance.post.mockResolvedValueOnce({
    //   data: { token: 'fake-token', roles: ['user'] },
    // });

    render(<Login />);

    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    // Wait for navigation
    await screen.findByText(/sign in/i); // This waits for the login form to be gone

    expect(localStorage.getItem("loginData")).toEqual(
      JSON.stringify({ token: "fake-token", roles: ["user"] }),
    );
    expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
  });

  test("displays an error message on failed login", async () => {
    // axiosInstance.post.mockRejectedValueOnce(new Error('Login failed'));

    render(<Login />);

    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    // Since there’s no direct output for errors in the provided code,
    // this test won't check for error rendering directly.
    // You might want to modify your component to display the error state.
  });

  test("navigates to signup on link click", () => {
    render(<Login />);

    fireEvent.click(
      screen.getByRole("link", { name: /don't have an account\? sign up/i }),
    );

    expect(mockNavigate).toHaveBeenCalledWith("/signup");
  });
});
