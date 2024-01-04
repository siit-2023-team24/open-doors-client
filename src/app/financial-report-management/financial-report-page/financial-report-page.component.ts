import { Component } from '@angular/core';

@Component({
  selector: 'app-financial-report-page',
  templateUrl: './financial-report-page.component.html',
  styleUrls: ['./financial-report-page.component.css']
})
export class FinancialReportPageComponent {

  chartOptions = {
	  animationEnabled: true,
	  theme: "dark2",
	  title:{
		text: "Social Media Engagement"
	  },
	  data: [{
		type: "pie",
		startAngle: 45,
		indexLabel: "{name}: {y}",
		indexLabelPlacement: "inside",
		yValueFormatString: "#,###.##'%'",
		dataPoints: [
		  { y: 21.3, name: "Facebook" },
		  { y: 27.7, name: "Instagram" },
		  { y: 17, name: "Twitter" },
		  { y: 14.9, name: "LinkedIn" },
		  { y: 10.6, name: "Pinterest" },
		  { y: 8.5, name: "Others" }
		]
	  }]
	}
}
