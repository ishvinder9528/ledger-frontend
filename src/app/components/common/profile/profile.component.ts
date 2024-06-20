import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ProfileService } from '../../../services/common/profile/profile.service';
import { getToken } from '../../../../environments/environment';
import { ImageModule } from 'primeng/image';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CardModule, HttpClientModule,ImageModule,AvatarModule,ButtonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getProfile();
  }

  user: any | undefined='';
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'X-Token': this.getToken(),
  });
  avatar_image:string = `https://avatar.iran.liara.run/public?username=${this.user?._id}`;

  getToken() {
    return getToken();
  }

  getProfile() {
    const profileService = new ProfileService(this.http);

    profileService.getUser(this.headers).subscribe({
      next: (data: any) => {
        console.log('data:', data);
        this.user = data.user;
      },
      error: (error: any) => {
        console.log('some error occurs', error);
      },
    });
  }
}
