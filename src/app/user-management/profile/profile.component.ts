import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from "../model/user.model"
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css', '../../../styles.css']
})
export class ProfileComponent implements OnInit {

  user: User;

  constructor(private route: ActivatedRoute, private userService: UserService) {
  }

  ngOnInit(): void {
    //autentification
    const id = 1;
    this.userService.getUser(id).subscribe({
      
      next: (data: User) => {
        this.user = data
      },

      error: (_) => { console.log('Error in getUser'); }
    });
  }

}
