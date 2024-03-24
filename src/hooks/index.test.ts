import { renderHook, waitFor } from "@testing-library/react";
import { useBooks } from ".";

jest.mock("../constants", () => ({
  API_KEY: "some api key",
}));

describe("useBooks", () => {
  test("sets isLoading to true prior to fetch", async () => {
    global.fetch = jest.fn();

    const { result } = renderHook(() => useBooks());

    await waitFor(() => {
      expect(result.current.books).toEqual([]);
      expect(result.current.error).toEqual(null);
      expect(result.current.isLoading).toEqual(true);
    });
  });

  test("sets error on fetch error", async () => {
    const error = new Error("some error");
    global.fetch = jest.fn(() => Promise.reject(error));

    const { result } = renderHook(() => useBooks());

    await waitFor(() => {
      expect(result.current.books).toEqual([]);
      expect(result.current.error).toEqual(error);
      expect(result.current.isLoading).toEqual(false);
    });
  });

  test("sets error for non-200 status codes", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        statusText: "some status text",
      }),
    ) as jest.Mock;

    const { result } = renderHook(() => useBooks());

    await waitFor(() => {
      expect(result.current.books).toEqual([]);
      expect(result.current.error instanceof Error).toEqual(true);
      expect(result.current.error?.message).toEqual("some status text");
      expect(result.current.isLoading).toEqual(false);
    });
  });

  test("sets books on success", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            results: [
              {
                amazon_product_url: "some-url",
                bestsellers_date: "some-date",
                book_details: [
                  {
                    author: "some author",
                    description: "some description",
                    publisher: "some publisher",
                    title: "some title",
                  },
                ],
                rank: "1",
              },
            ],
          }),
        ok: true,
      }),
    ) as jest.Mock;

    const { result } = renderHook(() => useBooks());

    await waitFor(() => {
      expect(result.current.books).toEqual([
        {
          amazonProductUrl: "some-url",
          author: "some author",
          bestsellersDate: "some-date",
          description: "some description",
          publisher: "some publisher",
          rank: "1",
          title: "some title",
        },
      ]);
      expect(result.current.error).toEqual(null);
      expect(result.current.isLoading).toEqual(false);
    });
  });
});
