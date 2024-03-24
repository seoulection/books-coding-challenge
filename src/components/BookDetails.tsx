import type { Book } from "../types";

interface BookDetailsProps {
  book: Book;
}
function BookDetails({ book }: BookDetailsProps) {
  const {
    amazonProductUrl,
    author,
    bestsellersDate,
    description,
    publisher,
    rank,
    title,
  } = book;

  return (
    <div className="bookDetails" data-testid="BookDetails">
      <h2>{title}</h2>
      <p>by {author}</p>
      <p>Current rank: {rank}</p>
      <p>Bestsellers Date: {bestsellersDate}</p>
      <div className="description">
        <p>Description:</p>
        <p>{description}</p>
      </div>
      <p>Publisher: {publisher}</p>
      <a href={amazonProductUrl} target="_blank" rel="noreferrer noopener">
        Buy now from Amazon
      </a>
    </div>
  );
}

export default BookDetails;
