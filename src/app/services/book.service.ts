import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';
import { apiUrl } from '../app.component';


@Injectable({
  providedIn: 'root'
})
export class BookService {

  private googleBooksApiUrl = 'https://www.googleapis.com/books/v1/volumes';

  constructor(private http: HttpClient) {}

  addBook(book: any) {
    return this.http.post(apiUrl.apiUrl+"books", book);
  }

  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(apiUrl.apiUrl + 'books');
  }

  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(`${apiUrl.apiUrl}${id}`);
  }

  deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(`${apiUrl.apiUrl}books/${id}`);
  }

  searchGoogleBooks(query: string): Observable<Book[]> {
    return this.http.get<Book[]>(`${apiUrl.apiUrl}search?query=${query}`);
  }

  searchBookDetails(title: string): Observable<any> {
    const queryUrl = `${this.googleBooksApiUrl}?q=intitle:${title}`;
    return this.http.get<any>(queryUrl);
  }
}
