import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from "../model/user.model"
import { UserService } from '../user.service';
import { environment } from 'src/env/env';
import { Country } from 'src/env/country';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css', '../../../styles.css']
})
export class ProfileComponent implements OnInit {

  user: User;

  imgPath: string= "";

  constructor(private route: ActivatedRoute, private userService: UserService) {
  }

  ngOnInit(): void {
    //autentification
    const id = 1;
    this.userService.getUser(id).subscribe({
      
      next: (data: User) => {
        this.user = data;
        this.imgPath = environment.apiHost + '/image/' + data.image;
      },

      error: (_) => { console.log('Error in getUser'); }
    });
  }

}
