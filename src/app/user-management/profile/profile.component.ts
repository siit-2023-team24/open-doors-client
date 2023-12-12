import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from "../model/user.model"
import { UserService } from '../user.service';
import { environment } from 'src/env/env';
import { Country } from 'src/env/country';
import { ImageService } from 'src/app/image-management/image.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css', '../../../styles.css']
})
export class ProfileComponent implements OnInit {

  user: User = {email: "", firstName: "", lastName: "", id: 0, country: Country.VATICAN_CITY, city: "", street: "", number: 0, phone: ""}

  imgPath: string= "";

  constructor(private route: ActivatedRoute, private userService: UserService, private imageService: ImageService) {
  }

  ngOnInit(): void {
    //autentification
    const id = 1;
    this.userService.getUser(id).subscribe({
      
      next: (data: User) => {
        this.user = data;
        this.imgPath = this.imageService.getPath(data.imageId, true);
      },

      error: (_) => { console.log('Error in getUser'); }
    });
  }

}
