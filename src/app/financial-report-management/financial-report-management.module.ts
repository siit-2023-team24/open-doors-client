import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinancialReportPageComponent } from './financial-report-page/financial-report-page.component';
import { BrowserModule } from '@angular/platform-browser';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';



@NgModule({
  declarations: [
    FinancialReportPageComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    CanvasJSAngularChartsModule
  ]
})
export class FinancialReportManagementModule { }
