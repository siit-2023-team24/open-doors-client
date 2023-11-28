import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../../../styles.css']
})
export class LoginComponent {

  constructor(private userService: UserService) {}

  @Output()
  loggedIn: EventEmitter<string> = new EventEmitter<string>();

  onLogin() :void {
    this.loggedIn.emit(this.userService.getCurrentUser().role);
  }


}
