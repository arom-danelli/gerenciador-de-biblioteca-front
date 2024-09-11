import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'biblioteca-arom-front';
  
}

export const apiUrl = {
  apiUrl: 'http://localhost:8080/api/',
};
