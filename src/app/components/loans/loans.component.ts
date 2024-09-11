import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoanService } from '../../services/loan.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Loan } from '../../models/loan.model';
import { LoanDialogComponent } from '../dialogs/loan-dialog/loan-dialog.component';
import { EditLoanDialogComponent } from '../dialogs/edit-dialogs/edit-loan-dialog/edit-loan-dialog.component';

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrl: './loans.component.css',
})
export class LoansComponent implements OnInit {
  displayedColumns: string[] = [
    'bookTitle',
    'userName',
    'loanDate',
    'returnDate',
    'status',
    'action',
  ];
  dataSource = new MatTableDataSource<Loan>();

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private loanService: LoanService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadLoans();
  }

  loadLoans(): void {
    this.loanService.getAllLoans().subscribe((loans) => {
      console.log(loans);

      this.dataSource.data = loans;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openAddLoanDialog(): void {
    const dialogRef = this.dialog.open(LoanDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadLoans();
      }
    });
  }

  deleteLoan(loanId: number): void {
    if (confirm('Tem certeza que deseja deletar este empréstimo?')) {
      this.loanService.deleteLoan(loanId).subscribe(() => {
        this.loadLoans();
        this.snackBar.open('Empréstimo deletado com sucesso', 'Fechar', {
          duration: 3000,
        });
      });
    }
  }

  editLoan(loan: Loan): void {
    const dialogRef = this.dialog.open(EditLoanDialogComponent, {
      width: '400px',
      data: loan,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loanService
          .updateLoan(result.loanId, result.returnDate, result.status)
          .subscribe(() => {
            this.loadLoans();
            this.snackBar.open('Empréstimo atualizado com sucesso', 'Fechar', {
              duration: 3000,
            });
          });
      }
    });
  }
}
