import { Component } from '@angular/core';
import { DateRangeReportParams } from '../model/date-range-report-params';
import { DateRangeReport } from '../model/date-range-report';
import { AuthService } from 'src/app/auth/auth.service';
import { FinancialReportService } from '../financial-report.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccommodationService } from 'src/app/accommodation-management/accommodation.service';
import { AccommodationNameDTO } from 'src/app/accommodation-management/model/accommodation-name';

@Component({
  selector: 'app-financial-report-page',
  templateUrl: './financial-report-page.component.html',
  styleUrls: ['./financial-report-page.component.css']
})
export class FinancialReportPageComponent {

	dateRangeReportParams: DateRangeReportParams = {
		hostId: this.authService.getId(),
		startDate: null,
		endDate:  null
	};
	dateRangeReports : DateRangeReport[] = [];

	dateRangeReportsReady: boolean = false;
	totalNumOfReservation:  number = 0;
	totalProfit: number = 0;

	accommodations: AccommodationNameDTO[] = [];
	selectedAccommodation: AccommodationNameDTO;

	startDateFilter = (date: Date | null): boolean => {
		const yesterday = new Date();
		yesterday.setDate(yesterday.getDate() - 1);
		return date ? (!this.dateRangeReportParams.endDate || date < this.dateRangeReportParams.endDate) : true;
	  };  
	
	endDateFilter = (date: Date | null): boolean => {
		return date ? (!this.dateRangeReportParams.startDate || date > this.dateRangeReportParams.startDate) : true;
	};

	constructor(
		private authService: AuthService, 
		private reportService: FinancialReportService,
		private accommodationService: AccommodationService,
		private snackBar: MatSnackBar) {}

	getDateRangeReport() {
		const params = this.dateRangeReportParams;
		if(params.startDate != null && params.endDate != null) {
			this.reportService.getDateRangeReport(params).subscribe(
				(reports: DateRangeReport[]) => {
					this.dateRangeReports = reports;
					console.log(reports);
					for (const report of this.dateRangeReports) {
						this.totalNumOfReservation += report.numOfReservations;
						this.totalProfit += report.profit;
					}

					if(this.totalNumOfReservation != 0) {
						this.numOfReservationsChartOptions.data[0].dataPoints = this.dateRangeReports.map(report => ({
							y: report.numOfReservations / this.totalNumOfReservation,
							name: report.accommodationName
						}));
					}

					if(this.totalProfit != 0) {
						this.profitChartOptions.data[0].dataPoints = this.dateRangeReports.map(report => ({
							y: report.profit / this.totalProfit,
							name: report.accommodationName
						}));
					}

					this.dateRangeReportsReady = true;
				},
				error => {
				  console.error("Error fetching reports: ", error);
				}
			);
		} else {
			this.showSnackBar("Please input valid dates!");
			this.dateRangeReportsReady = false;
		}
		
	}

	displayedColumns: string[] = ['accommodationId', 'accommodationName', 'numOfReservations', 'profit'];
	
	numOfReservationsChartOptions = {
		animationEnabled: true,
		theme: "light2",
		title:{
			text: "Reservations per Accommodation"
		},
		data: [{
			type: "pie",
			startAngle: 45,
			indexLabel: "{name}: {y}",
			indexLabelPlacement: "outside",
			yValueFormatString: "#,###.##'%'",
			dataPoints: [
			{ y: 0, name: "" }
			]
		}]
	}

	profitChartOptions = {
		animationEnabled: true,
		theme: "light2",
		title:{
			text: "Profit per Accommodation"
		},
		data: [{
			type: "pie",
			startAngle: 45,
			indexLabel: "{name}: {y}",
			indexLabelPlacement: "outside",
			yValueFormatString: "#,###.##'%'",
			dataPoints: [
			{ y: 0, name: "" }
			]
		}]
	}

	getHostAccommodations() {
		this.accommodationService.getHostAccommodationNames(this.authService.getId()).subscribe(
			(accommodations: AccommodationNameDTO[]) => { 
				this.accommodations = accommodations;
				console.log(this.accommodations);
			},
			error => {
				console.error("Error fetching accommodation names: ", error);
			}
		);
	}

	getAccommodationReport() {

	}

	private showSnackBar(message: string): void {
		this.snackBar.open(message, 'Close', {
		  duration: 3000,
		});
	  }
}
