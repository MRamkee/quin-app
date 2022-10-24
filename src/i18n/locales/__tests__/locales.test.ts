// © Copyright 2022 Ramkee-Mukuru Quin-App

import enMessages from "../en";
import frMessages from "../fr";

describe("Test translation file presence", () => {
  it("contains English translations", () => {
    const title = enMessages.title;
    expect(title).toBeTruthy();
  });
  it("contains French translations", () => {
    const title = frMessages.title;
    expect(title).toBeTruthy();
  });
});
