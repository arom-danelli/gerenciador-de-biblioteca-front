import { Loan } from "./loan.model";

export interface Book {
    id?: number;
    title: string;
    author: string;
    isbn: string;
    publicationDate?: string;
    category: string;
    thumbnail_url: string;
    summary?: string;
    loans?: Loan[];
  }
  