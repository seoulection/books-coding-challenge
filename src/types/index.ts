export type ApiResponse = {
  amazon_product_url: string;
  bestsellers_date: string;
  book_details: BookDetails[];
  rank: string;
};

export type Book = {
  amazonProductUrl: string;
  author: string;
  bestsellersDate: string;
  description: string;
  publisher: string;
  rank: string;
  title: string;
};

export type BookDetails = {
  author: string;
  description: string;
  publisher: string;
  title: string;
};
