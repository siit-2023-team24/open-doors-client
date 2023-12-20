import { Component, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css', "../../../styles.css"]
})
export class NavBarComponent implements OnInit {

  role: string = "";
  isLoggedIn : boolean;
  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.refreshNavbar();

    this.router.events.pipe(
      filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.refreshNavbar();
    });
  }

  logout(){
    localStorage.removeItem('user');
    this.router.navigate(['login'])
  }
  refreshNavbar() {
    this.isLoggedIn=localStorage.getItem('user')!=null;
  }
}
