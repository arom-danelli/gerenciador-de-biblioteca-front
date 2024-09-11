import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Loan } from '../../../models/loan.model';
import { User } from '../../../models/user.model';
import { Book } from '../../../models/book.model';
import { LoanService } from '../../../services/loan.service';
import { UserService } from '../../../services/user.service';
import { BookService } from '../../../services/book.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-loan-dialog',
  templateUrl: './loan-dialog.component.html',
  styleUrls: ['./loan-dialog.component.css'],
})
export class LoanDialogComponent implements OnInit {
  loan: Loan = {
    user: { id: 0 },
    book: { id: 0 },
    return_date: '',
    status: 'EMPRESTADO',
    userName: '',
    bookTitle: '',
    loanDate: '',
  };

  users: User[] = [];
  books: Book[] = [];

  constructor(
    public dialogRef: MatDialogRef<LoanDialogComponent>,
    private loanService: LoanService,
    private userService: UserService,
    private bookService: BookService,
    private snackBar: MatSnackBar,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadBooks();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe((users) => {
      this.users = users;
    });
  }

  loadBooks(): void {
    this.bookService.getAllBooks().subscribe((books) => {
      this.books = books;
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    console.log('Payload enviado:', this.loan);
    if (this.loan.user.id && this.loan.book.id) {
      this.loanService.createLoan(this.loan).subscribe(
        (response) => {
          console.log('Empréstimo criado com sucesso:', response);
          this.dialogRef.close(response);
          this.snackBar.open('Empréstimo criado com sucesso!', 'Fechar', {
            duration: 5000,
          });
        },
        (error) => {
          console.error('Erro ao criar o empréstimo:', error);
          this.snackBar.open(
            'Ocorreu um erro, tente novamente! Livro já emprestado ou devolução está no passado ',
            'Fechar',
            {
              duration: 3000,
            }
          );
        }
      );
    }
  }
}
