import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../_service/auth.service';

@Component({
  selector: 'app-profile',
  standalone:true,
  imports: [RouterModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {

  userName: string = '';
  userEmail: string = '';
  createdDate: string = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {

    this.authService.currentUser$.subscribe(user => {
      if(user) {
        console.log(user);
        this.userName = user.name;
        this.userEmail = user.email;
        this.createdDate = user.createdDate || '';
      }
    });
  }
}
