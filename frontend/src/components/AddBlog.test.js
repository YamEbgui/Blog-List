import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AddBlog from "./AddBlog";

test("<AddBlog /> updates parent state and calls onSubmit", () => {
  const createBlog = jest.fn();

  const component = render(<AddBlog createBlog={createBlog} />);

  const inputTitle = component.container.querySelectorAll("input")[0];
  const inputAuthor = component.container.querySelectorAll("input")[1];
  const inputUrl = component.container.querySelectorAll("input")[2];
  console.log(inputTitle);
  const form = component.container.querySelector("form");

  fireEvent.change(inputTitle, {
    target: { value: "testing of forms could be easier" },
  });
  fireEvent.change(inputAuthor, {
    target: { value: "test author" },
  });
  fireEvent.change(inputUrl, {
    target: { value: "test url" },
  });
  fireEvent.submit(form);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].content).toBe(
    "testing of forms could be easier"
  );
});
