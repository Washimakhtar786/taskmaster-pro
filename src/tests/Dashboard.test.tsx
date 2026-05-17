import {
  render,
  screen,
} from "@testing-library/react";

import {
  describe,
  it,
  expect,
} from "vitest";

import {
  BrowserRouter,
} from "react-router-dom";

import {
  HomePage,
} from "../pages/HomePage";

describe(
  "Home Page",
  () => {

    it(
      "renders homepage",
      () => {

        render(

          <BrowserRouter>

            <HomePage />

          </BrowserRouter>

        );

        const text =
          screen.getByRole(
  "heading",
  {
    name: /taskmaster pro/i,
  }
);

        expect(
          text
        ).toBeInTheDocument();

      }
    );

  }
);