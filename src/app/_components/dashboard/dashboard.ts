import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { AuthService } from '../../_service/auth.service';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

  constructor(private authService: AuthService, private router: Router) {

  }

  goToDashboard() {
    if(this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  uploadFiles() {
    if(this.authService.isLoggedIn()) {
      this.router.navigate(['/uploadFiles']);
    } else {
      this.router.navigate(['/login']);
    }
  }
  
}
