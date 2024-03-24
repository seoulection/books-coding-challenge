import { useEffect, useState } from "react";
import { API_KEY } from "../constants";
import type { ApiResponse, Book, BookDetails } from "../types";

export function useBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await fetch(
          `https://api.nytimes.com/svc/books/v3/lists.json?list=hardcover-fiction&api-key=${API_KEY}`,
        );
        if (!response.ok) {
          throw Error(response.statusText);
        }

        const { results } = await response.json();
        const books = transform(results);

        setBooks(books);
      } catch (error) {
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchBooks();
  }, []);

  return { books, error, isLoading };
}

function transform(results: ApiResponse[] | undefined): Book[] {
  if (!results) return [];

  return results.map(
    ({
      amazon_product_url,
      bestsellers_date,
      book_details,
      rank,
    }: ApiResponse) => {
      const [{ author, description, publisher, title }] =
        book_details as BookDetails[];

      return {
        amazonProductUrl: amazon_product_url,
        author,
        bestsellersDate: bestsellers_date,
        description,
        publisher,
        rank,
        title,
      };
    },
  );
}
