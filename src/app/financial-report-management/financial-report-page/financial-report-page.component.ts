import { Component, OnInit } from '@angular/core';
import { DateRangeReportParams } from '../model/date-range-report-params';
import { DateRangeReport } from '../model/date-range-report';
import { AuthService } from 'src/app/auth/auth.service';
import { FinancialReportService } from '../financial-report.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccommodationService } from 'src/app/accommodation-management/accommodation.service';
import { AccommodationNameDTO } from 'src/app/accommodation-management/model/accommodation-name';
import { CanvasJS } from '@canvasjs/angular-charts';

@Component({
  selector: 'app-financial-report-page',
  templateUrl: './financial-report-page.component.html',
  styleUrls: ['./financial-report-page.component.css']
})
export class FinancialReportPageComponent implements OnInit{
	chart:any;
	chart2:any;

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

	ngOnInit(): void {
		this.chart = new CanvasJS.Chart("chartContainer", {
		theme: "light2", // "light2", "dark1", "dark2"
		title: {
			text: "Reservations per Accommodation"
		},
		data: [
			{
			type: "pie", // Change type to "bar", "area", "spline", "pie",etc.
			dataPoints: []
			}
		]
		});
		this.chart.render();
		this.chart2 = new CanvasJS.Chart("hallo", {
			theme: "light2", // "light2", "dark1", "dark2"
			title: {
				text: "Profit per Accommodation"
			},
			data: [
				{
				type: "pie", // Change type to "bar", "area", "spline", "pie",etc.
				dataPoints: []
				}
			]
		});
		this.chart2.render();
	}

	getDateRangeReport() {
		const params = this.dateRangeReportParams;
		this.totalNumOfReservation = 0;
		this.totalProfit = 0;

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
						this.chart.options.data[0].dataPoints = this.dateRangeReports.map(report => ({
							y: report.numOfReservations / this.totalNumOfReservation,
							label: report.accommodationName
						}));
					} else {
						this.chart.options.data[0].dataPoints = [];
					}
					this.chart.render();

					if(this.totalProfit != 0) {
						this.chart2.options.data[0].dataPoints = this.dateRangeReports.map(report => ({
							y: report.profit / this.totalProfit,
							label: report.accommodationName
						}));
					} else {
						this.chart2.options.data[0].dataPoints = [];
					}
					this.chart2.render();

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
