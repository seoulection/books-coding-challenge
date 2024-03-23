import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import BookList from './BookList'
import type { Book } from '../types'

const books: Book[] = [
  {
    amazonProductUrl: 'some-url-1',
    author: 'Some Author 1',
    bestsellersDate: '2020-03-01',
    description: 'Some description 1',
    publisher: 'Cool Publisher 1',
    rank: '1',
    title: 'Book 1'
  },
  {
    amazonProductUrl: 'some-url-2',
    author: 'Some Author 2',
    bestsellersDate: '2020-03-02',
    description: 'Some description',
    publisher: 'Cool Publisher 2',
    rank: '2',
    title: 'Book 2'
  }
]

describe('BookList', () => {
  test('displays given books in a list', () => {
    render(<BookList books={books} onBookSelect={jest.fn()} />)

    const bookList = screen.getByTestId('BookList')
    expect(bookList).toBeVisible()

    const heading = screen.getByRole('heading')
    expect(heading).toBeVisible()
    expect(heading).toHaveTextContent('NYT Bestselling Hardcover Fictions')

    const [firstBook, secondBook] = screen.getAllByRole('listitem')
    expect(firstBook).toHaveTextContent('Book 1 by Some Author 1')
    expect(secondBook).toHaveTextContent('Book 2 by Some Author 2')
  })

  test('sends the book rank on book select', () => {
    const mockFn = jest.fn()

    render(<BookList books={books} onBookSelect={mockFn} />)

    const [firstBook, secondBook] = screen.getAllByRole('button')

    fireEvent.click(firstBook)
    expect(mockFn).toHaveBeenCalledWith('1')

    fireEvent.click(secondBook)
    expect(mockFn).toHaveBeenCalledWith('2')
  })
})
