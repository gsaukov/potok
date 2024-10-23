import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('https://localhost:9092',
      { transports: ['websocket'],
        forceNew: true,
        path : '',
        secure: true,
        rejectUnauthorized: false,
        extraHeaders: {'x-clientid': 'bazooka'},
        query : {'SESSIONID': 'NGZhMWE0OGEtOTdiZS00MjEyLWJhNTYtMDcwOTZiNGY1Y2Ji'},
        upgrade: false
      });
  }

  listenConnect(): Observable<string> {
    return new Observable((subscriber) => {
      this.socket.on('connect', () => {
        subscriber.next('Client has connected to the server!');
      });
    });
  }

  listenMessage(): Observable<string> {
    return new Observable((subscriber) => {
      this.socket.on('message', (data: any) => {
        subscriber.next(data.line);
      });
    });
  }

  listenQuoteResponse(): Observable<any> {
    return new Observable((subscriber) => {
      this.socket.on('quoteResponse', (data) => {
        subscriber.next(data);
      });
    });
  }

  listenOrderConfirm(): Observable<any> {
    return new Observable((subscriber) => {
      this.socket.on('orderConfirm', (data) => {
        subscriber.next(data);
      });
    });
  }

  listenExecution(): Observable<any> {
    return new Observable((subscriber) => {
      this.socket.on('execution', (data) => {
        subscriber.next(data);
      });
    });
  }

  listenBalance(): Observable<any> {
    return new Observable((subscriber) => {
      this.socket.on('balance', (data) => {
        subscriber.next(data);
      });
    });
  }

  listenPositionNotification(): Observable<any> {
    return new Observable((subscriber) => {
      this.socket.on('positionNotification', (data) => {
        subscriber.next(data);
      });
    });
  }


  // Emit an event
  emit(eventName: string, data: any): void {
    this.socket.emit(eventName, data);
  }

  // Disconnect the socket
  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
