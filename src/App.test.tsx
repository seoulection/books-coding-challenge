import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import { useBooks } from "./hooks";

jest.mock("./hooks", () => ({
  useBooks: jest.fn(() => jest.fn()),
}));

const BOOKS = [
  {
    amazonProductUrl: "www.one.com",
    author: "Author 1",
    bestsellersDate: "2020-03-20",
    description: "Description 1",
    publisher: "Publisher 1",
    rank: "1",
    title: "Book 1",
  },
  {
    amazonProductUrl: "www.two.com",
    author: "Author 2",
    bestsellersDate: "2020-03-21",
    description: "Description 2",
    publisher: "Publisher 2",
    rank: "2",
    title: "Book 2",
  },
];

describe("App", () => {
  test("shows loading indicator", () => {
    (useBooks as jest.Mock).mockReturnValue({
      books: [],
      error: null,
      isLoading: true,
    });

    render(<App />);

    expect(screen.getByText(/fetching books.../i)).toBeVisible();
  });

  test("shows error indicator", () => {
    (useBooks as jest.Mock).mockReturnValue({
      books: [],
      error: new Error("something bad happened"),
      isLoading: false,
    });

    render(<App />);

    expect(screen.getByText(/error: something bad happened/i)).toBeVisible();
  });

  test("shows book list on page load", () => {
    (useBooks as jest.Mock).mockReturnValue({
      books: BOOKS,
      error: null,
      isLoading: false,
    });

    render(<App />);

    expect(screen.getByTestId("BookList")).toBeVisible();
  });

  test("shows book details and hides book list when selecting a book list item", () => {
    (useBooks as jest.Mock).mockReturnValue({
      books: BOOKS,
      error: null,
      isLoading: false,
    });

    render(<App />);

    expect(screen.queryByTestId("BookDetails")).toBeNull();

    const [firstBook] = screen.getAllByRole("button");
    fireEvent.click(firstBook);

    expect(screen.getByTestId("BookDetails")).toBeVisible();
  });

  test("clicking the back button from book details shows the book list", () => {
    (useBooks as jest.Mock).mockReturnValue({
      books: BOOKS,
      error: null,
      isLoading: false,
    });

    render(<App />);

    const [firstBook] = screen.getAllByRole("button");
    fireEvent.click(firstBook);

    expect(screen.getByTestId("BookDetails")).toBeVisible();
    expect(screen.queryByTestId("BookList")).toBeNull();

    fireEvent.click(screen.getByText(/back/i));

    expect(screen.queryByTestId("BookDetails")).toBeNull();
    expect(screen.getByTestId("BookList")).toBeVisible();
  });
});
