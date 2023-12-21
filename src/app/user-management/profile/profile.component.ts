import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Country } from 'src/app/shared/model/country';
import { ImageService } from 'src/app/image-management/image.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { Router } from '@angular/router';
import { EditUser } from '../model/edit-user.model';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css', '../../../styles.css']
})
export class ProfileComponent implements OnInit {
  
  user: EditUser = {firstName: "", lastName: "", id: 0, country: Country.VATICAN_CITY, city: "", street: "", number: 0, phone: ""}

  username: string = this.authService.getUsername();
  
  imgPath: string= "";

  constructor(private userService: UserService, private imageService: ImageService,
    private dialog: MatDialog, private router: Router, private authService: AuthService) {
  }


  ngOnInit(): void {
    
    const id = this.authService.getId();
    this.userService.getUser(id).subscribe({
      
      next: (data: EditUser) => {
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
    this.userService.delete(this.user.id).subscribe({
      next: () => {
        console.log('Deleted user with id: ' + this.user.id);

        this.authService.logout();

        this.router.navigate(['home']);
      },
      error: (error) => {
        console.error(error.error.message);
        alert(error.error.message)
      }
    })
  }

}
