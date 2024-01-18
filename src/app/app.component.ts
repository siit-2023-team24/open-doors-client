import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import * as Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import { environment } from 'src/env/env';
import { Message } from './shared/model/notification';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnDestroy{
  title: string = 'Open Doors';
  private routeSubscription: Subscription;

  private serverUrl = environment.apiHost + '/socket'
  private stompClient: any;
  isLoaded: boolean = false;
  isCustomSocketOpened = false;
  messages: Message[] = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
     private snackBar: MatSnackBar, private authService: AuthService) {
    this.routeSubscription = this.router.events.subscribe((event)=> {
      if (event instanceof NavigationEnd) {
        this.title = this.activatedRoute.snapshot.firstChild?.queryParamMap.get('title') || 'Open Doors';
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }

  ngOnInit() {
    this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection() {
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;

    this.stompClient.connect({}, function () {
      that.isLoaded = true;
      that.openGlobalSocket()
    });

  }

  sendMessageUsingSocket(message: Message) {
      this.stompClient.send("/socket-subscriber/send/message", {}, JSON.stringify(message));
  }

  openGlobalSocket() {
    if (this.isLoaded) {
      this.stompClient.subscribe("/socket-publisher", (message: { body: string; }) => {
        this.handleResult(message);
      });
    }
  }

  openSocket() {
    if (this.isLoaded && this.authService.getId()) {
      this.isCustomSocketOpened = true;
      this.stompClient.subscribe("/socket-publisher/" + this.authService.getId(), (message: { body: string; }) => {
        this.handleResult(message);
      });
    }
  }

  handleResult(message: { body: string; }) {
    if (message.body) {
      let messageResult: Message = JSON.parse(message.body);
      this.showSnackBar(message.body);
      this.messages.push(messageResult);
    }
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }

}
