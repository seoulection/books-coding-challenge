import { useState } from 'react'
import { useBooks } from './hooks'
import { BookDetails, BookList } from './components'
import type { Book } from './types'
import './App.css'

function App() {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  const { books, error, isLoading } = useBooks()

  const handleOnBookSelect = (bookRank: string) => {
    const book = books?.find(({ rank }) => rank === bookRank) ?? null;

    setSelectedBook(book)
  }

  const resetSelectedBook = () => setSelectedBook(null)

  if (isLoading) return <h3 className="loading">Fetching books...</h3>
  if (error) return <h3 className="error">Error: {error.message}</h3>

  return selectedBook ? (
    <div className="details-container">
      <BookDetails book={selectedBook} />
      <button onClick={resetSelectedBook}>
        Go back
      </button>
    </div>
  ) :
    <BookList books={books} onBookSelect={handleOnBookSelect} />
}

export default App
