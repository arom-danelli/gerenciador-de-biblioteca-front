import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Book } from '../../../models/book.model';
import { BookService } from '../../../services/book.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-book-dialog',
  templateUrl: './book-dialog.component.html',
  styleUrls: ['./book-dialog.component.css'],
})
export class BookDialogComponent {
  book: Book = {
    title: '',
    author: '',
    isbn: '',
    publicationDate: '',
    category: '',
    thumbnail_url: '',
  };

  constructor(
    public dialogRef: MatDialogRef<BookDialogComponent>,
    private bookService: BookService,
    private snackBar: MatSnackBar
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.bookService.addBook(this.book).subscribe((response) => {
      this.snackBar.open('Livro adicionado com sucesso!', 'Fechar', {
        duration: 3000,
      });
      this.dialogRef.close(response);
    });
  }
}
