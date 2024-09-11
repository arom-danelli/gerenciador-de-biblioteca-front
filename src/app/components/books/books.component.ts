import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { BookDialogComponent } from '../dialogs/book-dialog/book-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Book } from '../../models/book.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookDetailDialogComponent } from '../dialogs/book-detail-dialog/book-detail-dialog.component';
import { Loan } from '../../models/loan.model';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrl: './books.component.css',
})
export class BooksComponent implements OnInit {
  books: Book[] = [];
  loans: Loan[] = []; 


  book = {
    title: '',
    author: '',
    isbn: '',
    publicationDate: '',
    category: '',
  };

  constructor(
    private bookService: BookService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  onSubmit() {
    this.bookService.addBook(this.book).subscribe();
  }

  openAddBookDialog(): void {
    const dialogRef = this.dialog.open(BookDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Livro salvo:', result);
      }
    });
  }

  loadBooks(): void {
    this.bookService.getAllBooks().subscribe((books) => {
      this.books = books;
    });
  }

  isBookLoaned(book: Book): boolean {
    return book.loans ? book.loans.some((loan: Loan) => !loan.return_date) : false;
  }
  
  openBookDetails(bookTitle: string): void {
    this.bookService.searchBookDetails(bookTitle).subscribe((response: any) => {
      const book = response.items[0].volumeInfo;
    
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

  deleteBook(bookId: number | undefined): void {
    if (bookId !== undefined) {
      if (confirm('Tem certeza que deseja deletar este livro?')) {
        this.bookService.deleteBook(bookId).subscribe(() => {
          this.loadBooks();
          this.snackBar.open('Livro deletado com sucesso', 'Fechar', {
            duration: 3000,
          });
        });
      }
    } else {
      console.error('Book ID is undefined.');
    }
  }
}