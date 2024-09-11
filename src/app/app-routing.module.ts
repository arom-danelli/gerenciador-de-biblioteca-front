import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksComponent } from './components/books/books.component';
import { GoogleBooksComponent } from './components/google-books/google-books.component';
import { LoansComponent } from './components/loans/loans.component';
import { RecomendationsComponent } from './components/recomendations/recomendations.component';
import { UsersComponent } from './components/users/users.component';


const routes: Routes = [
  { path: 'users', component: UsersComponent },
  { path: 'books', component: BooksComponent },
  { path: 'loans', component: LoansComponent },
  { path: 'recomendations', component: RecomendationsComponent },
  { path: 'google-books', component: GoogleBooksComponent },
  { path: '', redirectTo: '/users', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
