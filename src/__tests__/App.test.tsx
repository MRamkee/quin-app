// © Copyright 2022 Ramkee-Mukuru Quin-App

import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/Quin-App/i);
  expect(linkElement).toBeInTheDocument();
});
