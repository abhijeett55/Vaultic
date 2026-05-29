import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule} from '@angular/common';
import { AuthService } from '../../_service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  showPassword: boolean = false;

  constructor(private router: Router, private authService: AuthService) { }

    creationDate: string = new Date().toISOString().split('T')[0];
    
    onRegister(form: NgForm) {
    if(form.invalid) return;

    const { name, email, password, confirmPassword, createdDate } = form.value;

    if(password !== confirmPassword) {
      console.error('Password do not match');
      return;
    }


    this.authService.register(name, email, password, createdDate).subscribe({
      next: (res) => {
        console.log('Registration success', res);
        this.authService.saveUserData(res.token , res.user);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Registration failed', err);
        alert(err.error?.message || "Registration failed");
      }
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
