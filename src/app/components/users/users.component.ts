import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { UserDialogComponent } from '../dialogs/user-dialog/user-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { User } from '../../models/user.model';
import { EditUserDialogComponent } from '../dialogs/edit-dialogs/edit-user-dialog/edit-user-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'phoneNumber', 'action'];
  dataSource = new MatTableDataSource<User>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe((users) => {
      this.dataSource.data = users;
      this.dataSource.paginator = this.paginator;
    });
  }

  openRegisterDialog(): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadUsers();
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteUser(userId: number): void {
    if (confirm('Tem certeza que deseja deletar este usuário?')) {
      this.userService.deleteUser(userId).subscribe(() => {
        this.loadUsers();
        this.snackBar.open('Usuário deletado com sucesso', 'Fechar', {
          duration: 3000,
        });
      });
    }
  }

  editUser(user: User): void {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      width: '400px',
      data: user,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userService.updateUser(result.id, result).subscribe(() => {
          this.loadUsers();
          this.snackBar.open('Usuário atualizado com sucesso', 'Fechar', {
            duration: 3000,
          });
        });
      }
    });
  }
}
