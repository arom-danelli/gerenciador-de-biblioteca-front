import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css'],
})
export class UserDialogComponent {
  user: User = {
    id: 0,
    name: '',
    email: '',
    phoneNumber: '',
  };

  constructor(
    public dialogRef: MatDialogRef<UserDialogComponent>,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.userService.registerUser(this.user).subscribe(
      (response) => {
        this.dialogRef.close(response);
        this.snackBar.open('Cadastro realizado com sucesso!', 'Fechar', {
          duration: 3000,
        });
      },
      (error) => {
        this.snackBar.open('Erro ao cadastrar! Tente novamente! ', 'Fechar', {
          duration: 3000,
        });
      }
    );
  }
}
