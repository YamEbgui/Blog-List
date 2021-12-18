import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Blog from "./Blog";

test("renders title and author", () => {
  const blog = {
    id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
  };

  const component = render(<Blog blog={blog} />);
  component.debug();

  expect(component.container).toHaveTextContent("Type wars");
  expect(component.container).toHaveTextContent("Robert C. Martin");
});

test("click on 'view' button renders all the data of the blog", () => {
  const blog = {
    id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    user: { username: "yamivgi8947", name: "yam ivgi", id: "a1b2c3" },
    likes: 2,
  };

  const component = render(<Blog blog={blog} />);

  expect(component.container.querySelectorAll(".url")).toHaveLength(0);
  expect(component.container.querySelectorAll(".likes")).toHaveLength(0);

  const button = component.getByText("view");
  fireEvent.click(button);

  expect(component.container.querySelectorAll(".url")).toHaveLength(1);
  expect(component.container.querySelector(".url")).toHaveTextContent(
    "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html"
  );
  expect(component.container.querySelectorAll(".likes")).toHaveLength(1);
  expect(component.container.querySelector(".likes")).toHaveTextContent("2");
});

test("click twice on '👍' button will call add like function twice", () => {
  const blog = {
    id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    user: { username: "yamivgi8947", name: "yam ivgi", id: "a1b2c3" },
    likes: 2,
  };
  const addLike = jest.fn();

  const component = render(<Blog blog={blog} addLikeFunction={addLike} />);

  expect(component.container.querySelectorAll(".url")).toHaveLength(0);
  expect(component.container.querySelectorAll(".likes")).toHaveLength(0);

  const button = component.getByText("view");
  fireEvent.click(button);

  const LikeButton = component.getByText("👍");
  fireEvent.click(LikeButton);

  expect(addLike.mock.calls).toHaveLength(1);

  fireEvent.click(LikeButton);

  expect(addLike.mock.calls).toHaveLength(2);
});
