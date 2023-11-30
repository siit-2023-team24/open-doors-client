import { Component, OnInit } from '@angular/core';

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

}
