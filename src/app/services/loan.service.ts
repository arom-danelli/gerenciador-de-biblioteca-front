import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Loan } from '../models/loan.model';
import { apiUrl } from '../app.component';
import { Book } from '../models/book.model';


@Injectable({
  providedIn: 'root'
})
export class LoanService {

  constructor(private http: HttpClient) {}

  createLoan(loan: Loan): Observable<Loan> {
    return this.http.post<Loan>(apiUrl.apiUrl+"loans", loan);
  }

  getAllLoans(): Observable<Loan[]> {
    return this.http.get<Loan[]>(apiUrl.apiUrl + 'loans');
  }

  getRecomendedBooks(userId: number): Observable<Book[]> {
    return this.http.get<Book[]>(`${apiUrl.apiUrl}loans/recomendations/${userId}`);
  }

  deleteLoan(loanId: number): Observable<void> {
    return this.http.delete<void>(`${apiUrl.apiUrl}loans/${loanId}`);
  }

  updateLoan(loanId: number, returnDate: string, status: string): Observable<Loan> {
    let params = new HttpParams().set('returnDate', returnDate);
    if (status) {
      params = params.set('status', status);
    }
    return this.http.put<Loan>(`${apiUrl.apiUrl}loans/${loanId}`, {}, { params: params });
  }
  
  
}
