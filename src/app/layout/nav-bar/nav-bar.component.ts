import { Component, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css', "../../../styles.css"]
})
export class NavBarComponent implements OnInit {

  role: string;
  constructor(private router: Router,
              public authService: AuthService) {
  }


  ngOnInit(): void {

    const helper : JwtHelperService = new JwtHelperService();
    const token = localStorage.getItem('user');
    if (token == null) {
      this.role = 'NO_USER';
    }
    else {
      const role = helper.decodeToken(token).role;
      this.role = role
    }

    this.router.events.pipe(
      filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.ngOnInit();
    });
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['login'])
  }
  refreshNavbar() {
    
  }
}
