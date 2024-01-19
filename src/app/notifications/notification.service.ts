import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Notification } from './model/notification';
import { environment } from 'src/env/env';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private httpClient: HttpClient) { }

  getAllFor(id: number): Observable<Notification[]> {
    return this.httpClient.get<Notification[]>(environment.apiHost + '/users/' + id + '/notifications');
  }
}
