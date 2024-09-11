import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Book } from '../../../models/book.model';

@Component({
  selector: 'app-book-detail-dialog',
  templateUrl: './book-detail-dialog.component.html',
  styleUrl: './book-detail-dialog.component.css',
})
export class BookDetailDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<BookDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Book
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
