import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-write-report-card',
  templateUrl: './write-report-card.component.html',
  styleUrls: ['./write-report-card.component.css']
})
export class WriteReportCardComponent implements OnInit{
  @Input() username: String

  reason: String = "";

  ngOnInit(): void {
    
  }

}
