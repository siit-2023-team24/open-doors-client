import { Component, OnInit } from '@angular/core';
import { User } from "../model/user.model"
import { UserService } from '../user.service';
import { Country } from 'src/env/country';
import { ImageService } from 'src/app/image-management/image.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css', '../../../styles.css']
})
export class ProfileComponent implements OnInit {

  user: User = {email: "", firstName: "", lastName: "", id: 0, country: Country.VATICAN_CITY, city: "", street: "", number: 0, phone: ""}

  imgPath: string= "";

  constructor(private userService: UserService, private imageService: ImageService,
    private dialog: MatDialog) {
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

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      question: "Are you sure you wish to delete your account?"
    }

    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe({
      next: (answer: boolean) => {
        if (answer) this.onDelete();
      }
    })
  }

  onDelete(): void {
    //TODO
  }

}
