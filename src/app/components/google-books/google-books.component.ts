import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BookService } from '../../services/book.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookDetailDialogComponent } from '../dialogs/book-detail-dialog/book-detail-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-google-books',
  templateUrl: './google-books.component.html',
  styleUrls: ['./google-books.component.scss'],
})
export class GoogleBooksComponent {
  searchQuery: string = '';
  books: any[] = [];

  constructor(private http: HttpClient, private bookService: BookService, private snackBar: MatSnackBar, public dialog: MatDialog) {}

  searchBooks() {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${this.searchQuery}`;
    this.http.get<any>(url).subscribe((response) => {
      this.books = response.items.map(
        (item: {
          volumeInfo: {
            title: any;
            authors: any[];
            imageLinks: { thumbnail: string };
            publishedDate: string;
            industryIdentifiers?: any[];
            categories?: string[];
          };
        }) => ({
          title: item.volumeInfo.title,
          author: item.volumeInfo.authors
            ? item.volumeInfo.authors[0]
            : 'Autor desconhecido',
          thumbnail_url: item.volumeInfo.imageLinks
            ? item.volumeInfo.imageLinks.thumbnail
            : 'assets/default-book-thumbnail.png',
          publicationDate: item.volumeInfo.publishedDate || 'Data desconhecida',
          isbn: item.volumeInfo.industryIdentifiers
            ? item.volumeInfo.industryIdentifiers[0].identifier
            : 'ISBN desconhecido',
          category: item.volumeInfo.categories
            ? item.volumeInfo.categories[0]
            : 'Categoria desconhecida',
        })
      );
    });
  }

  addBookToLibrary(book: any) {
    const newBook = {
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      publicationDate: book.publicationDate,
      category: book.category,
      thumbnail_url: book.thumbnail_url,
    };

    this.bookService.addBook(newBook).subscribe(
      (response) => {
        console.log('Livro adicionado com sucesso à biblioteca:', response);
        this.snackBar.open('Livro adicionado com sucesso!', 'Fechar', {
          duration: 3000,
        });
      },
      (error) => {
        console.error('Erro ao adicionar o livro:', error);
        this.snackBar.open('Erro ao adicionar o livro. Tente novamente.', 'Fechar', {
          duration: 3000,
        });
      }
    );
  }

  openBookDetails(bookTitle: string): void {
    this.bookService.searchBookDetails(bookTitle).subscribe((response: any) => {
      const book = response.items[0].volumeInfo; // Get the first book result
    
      this.dialog.open(BookDetailDialogComponent, {
        width: '400px',
        data: {
          title: book.title,
          author: book.authors ? book.authors.join(', ') : 'Autor desconhecido',
          category: book.categories ? book.categories.join(', ') : 'Categoria desconhecida',
          summary: book.description ? book.description : 'Resumo não disponível',
          thumbnail_url: book.imageLinks ? book.imageLinks.thumbnail : 'assets/book-thumbnail.png'
        }
      });
    });
  }
}
