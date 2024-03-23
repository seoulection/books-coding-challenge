import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import BookDetails from './BookDetails'
import type { Book } from '../types'

describe('BookDetails', () => {
  test('displays book details', () => {
    const book: Book = {
      amazonProductUrl: 'some-url',
      author: 'Some Author',
      bestsellersDate: '2020-03-04',
      description: 'Some description',
      publisher: 'Cool Publisher',
      rank: '1',
      title: 'Some Book'
    }

    render(<BookDetails book={book} />)

    const title = screen.getByRole('heading')
    expect(title).toHaveTextContent('Some Book')

    const author = screen.getByText(/some author/i)
    expect(author).toBeVisible()

    const rank = screen.getByText(/rank: 1/i)
    expect(rank).toBeVisible()

    const bestsellersDate = screen.getByText(/bestsellers date: 2020-03-04/i)
    expect(bestsellersDate).toBeVisible()

    const description = screen.getByText(/some description/i)
    expect(description).toBeVisible()

    const publisher = screen.getByText(/publisher: cool publisher/i)
    expect(publisher).toBeVisible

    const anchor = screen.getByRole('link')
    expect(anchor).toBeVisible()
    expect(anchor).toHaveTextContent('Buy now from Amazon')
    expect(anchor.getAttribute('href')).toEqual('some-url')
    expect(anchor.getAttribute('target')).toEqual('_blank')
    expect(anchor.getAttribute('rel')).toEqual('noreferrer noopener')
  })
})
