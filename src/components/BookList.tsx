import type { Book } from '../types'

interface BookListProps {
  books: Book[]
  onBookSelect: (rank: string) => void
}

function BookList({ books, onBookSelect }: BookListProps) {
  const bookItems = books.map(({ author, rank, title }) => (
      <li key={rank}>
        <button onClick={() => onBookSelect(rank)}>
          {title} by {author}
        </button>
      </li>
    )
  )

  return (
    <div className="bookList" data-testid="BookList">
      <h2 className="bookList__header">NYT Bestselling Hardcover Fictions</h2>
      <ul>{bookItems}</ul>
    </div>
  )
}

export default BookList
