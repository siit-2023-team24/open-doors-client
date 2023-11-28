import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user-management/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css', "../../../styles.css"]
})
export class NavBarComponent implements OnInit {

  role: string = "";

  constructor() {}

  ngOnInit(): void {
  }

  onLogin(role: string) : void {
    this.role = role;
  }

}
