import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule ,NgForm } from '@angular/forms';
import { CommonModule} from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../_service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  showPassword: boolean = false;

  constructor(private authService: AuthService, private router: Router ) { }
  onLogin(form: NgForm) {
    if(form.invalid) return;

    const { email , password} = form.value;
    this.authService.login(email, password).subscribe({
      next: (res) => {
      console.log('Login success');
      this.authService.saveUserData(res.token, res.user);
      this.router.navigate(['/dashboard']);
      },
      error: (err) => {
      console.error('Login failed', err);
      }
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
