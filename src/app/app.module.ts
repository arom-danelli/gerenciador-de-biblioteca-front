import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { UsersComponent } from './components/users/users.component';
import { BooksComponent } from './components/books/books.component';
import { LoansComponent } from './components/loans/loans.component';
import { RecomendationsComponent } from './components/recomendations/recomendations.component';
import { GoogleBooksComponent } from './components/google-books/google-books.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import {
  HttpClientModule,
  provideHttpClient,
  withFetch,
} from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { UserDialogComponent } from './components/dialogs/user-dialog/user-dialog.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { BookDialogComponent } from './components/dialogs/book-dialog/book-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LoanDialogComponent } from './components/dialogs/loan-dialog/loan-dialog.component';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { EditLoanDialogComponent } from './components/dialogs/edit-dialogs/edit-loan-dialog/edit-loan-dialog.component';
import { EditUserDialogComponent } from './components/dialogs/edit-dialogs/edit-user-dialog/edit-user-dialog.component';
import { DatePipe } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { BookDetailDialogComponent } from './components/dialogs/book-detail-dialog/book-detail-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    BooksComponent,
    LoansComponent,
    RecomendationsComponent,
    GoogleBooksComponent,
    UserDialogComponent,
    BookDialogComponent,
    LoanDialogComponent,
    EditLoanDialogComponent,
    EditUserDialogComponent,
    BookDetailDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    DatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
