import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DateRangeReport } from './model/date-range-report';
import { environment } from 'src/env/env';
import { DateRangeReportParams } from './model/date-range-report-params';

@Injectable({
  providedIn: 'root'
})
export class FinancialReportService {

  constructor(private http: HttpClient) { }

  getDateRangeReport(params: DateRangeReportParams): Observable<DateRangeReport[]> {
    return this.http.post<DateRangeReport[]>(environment.apiHost + "/financialReport/dateRangeReports", params);
  }
}
