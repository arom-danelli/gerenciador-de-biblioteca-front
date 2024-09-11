import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { Book } from '../../models/book.model';
import { LoanService } from '../../services/loan.service';
import { BookDetailDialogComponent } from '../dialogs/book-detail-dialog/book-detail-dialog.component';
import { BookService } from '../../services/book.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-recomendations',
  templateUrl: './recomendations.component.html',
  styleUrls: ['./recomendations.component.css'],
})
export class RecomendationsComponent implements OnInit {
  userControl = new FormControl();
  filteredUsers!: Observable<User[]>;
  recomendations: Book[] = [];

  constructor(
    private userService: UserService,
    private loanService: LoanService,
    private bookService: BookService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.userControl.valueChanges
      .pipe(
        startWith(''),
        map((value) => this._filter(value))
      )
      .subscribe((filteredUsers) => {
        this.filteredUsers = filteredUsers;
      });
  }

  private _filter(value: any): Observable<User[]> {
    const filterValue = typeof value === 'string' ? value.toLowerCase() : '';

    return this.userService
      .getAllUsers()
      .pipe(
        map((users) =>
          users.filter((user) => user.name.toLowerCase().includes(filterValue))
        )
      );
  }

  onUserSelected(userName: string): void {
    this.userService.getAllUsers().subscribe((users) => {
      const selectedUser = users.find((user) => user.name === userName);
      if (selectedUser) {
        this.loadRecomendations(selectedUser.id);
      }
    });
  }

  loadRecomendations(userId: number): void {
    this.loanService.getRecomendedBooks(userId).subscribe(
      (recomendations: Book[]) => {
        if (recomendations.length === 0) {
          this.snackBar.open(
            'Você precisa ter empréstimos para receber recomendações de livros.',
            'Fechar',
            {
              duration: 5000,
            }
          );
        } else {
          this.recomendations = recomendations;
        }
      },
      (error) => {
        console.error('Erro ao carregar recomendações:', error);
        this.snackBar.open(
          'Erro ao carregar recomendações. Tente novamente mais tarde.',
          'Fechar',
          {
            duration: 5000,
          }
        );
      }
    );
  }

  openBookDetails(bookTitle: string): void {
    this.bookService.searchBookDetails(bookTitle).subscribe((response: any) => {
      const book = response.items[0].volumeInfo;

      this.dialog.open(BookDetailDialogComponent, {
        width: '400px',
        data: {
          title: book.title,
          author: book.authors ? book.authors.join(', ') : 'Autor desconhecido',
          category: book.categories
            ? book.categories.join(', ')
            : 'Categoria desconhecida',
          summary: book.description
            ? book.description
            : 'Resumo não disponível',
          thumbnail_url: book.imageLinks
            ? book.imageLinks.thumbnail
            : 'assets/book-thumbnail.png',
        },
      });
    });
  }
}
