import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import {
  AccountDataRequest,
  CancelOrder,
  Execution,
  NewOrder,
  OrderConfirmation,
  Position,
  QuoteRequest,
  QuoteResponse
} from './socket.schema';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket!: Socket;

  constructor() {
    this.connect().subscribe()
  }

  connect(): Observable<string> {
    this.socket = io('https://localhost:9092', {
      transports: ['websocket'],
      forceNew: true,
      path: '',
      secure: true,
      rejectUnauthorized: false,
      extraHeaders: {'x-clientid': 'bazooka'},
      query: {'SESSIONID': 'NGZhMWE0OGEtOTdiZS00MjEyLWJhNTYtMDcwOTZiNGY1Y2Ji'},
      upgrade: false
    });

    return new Observable((subscriber) => {
      this.socket.on('connect', () => {
        this.sendAccountDataRequest()
      });
    });
  }

  listenDisconnect(): Observable<string> {
    return new Observable((subscriber) => {
      this.socket.on('disconnect', (data: any) => {
        subscriber.next(data);
      });
    });
  }

  listenMessage(): Observable<string> {
    return new Observable((subscriber) => {
      this.socket.on('message', (data: any) => {
        subscriber.next(data);
      });
    });
  }

  listenQuoteResponse(): Observable<QuoteResponse> {
    return new Observable((subscriber) => {
      this.socket.on('quoteResponse', (data: QuoteResponse) => {
        subscriber.next(data);
      });
    });
  }

  listenOrderConfirm(): Observable<OrderConfirmation> {
    return new Observable((subscriber) => {
      this.socket.on('orderConfirm', (data: OrderConfirmation) => {
        subscriber.next(data);
      });
    });
  }

  listenOrderCancel(): Observable<OrderConfirmation> {
    return new Observable((subscriber) => {
      this.socket.on('canceledOrder', (data: OrderConfirmation) => {
        subscriber.next(data);
      });
    });
  }

  listenExecution(): Observable<Execution> {
    return new Observable((subscriber) => {
      this.socket.on('execution', (data: Execution) => {
        subscriber.next(data);
      });
    });
  }

  listenBalance(): Observable<number> {
    return new Observable((subscriber) => {
      this.socket.on('balance', (data:number) => {
        subscriber.next(data);
      });
    });
  }

  listenPositionNotification(): Observable<Position> {
    return new Observable((subscriber) => {
      this.socket.on('positionNotification', (data) => {
        subscriber.next(data);
      });
    });
  }

  sendAccountDataRequest(): void {
    this.socket.emit('accountDataRequest', new AccountDataRequest());
  }

  sendQuoteRequest(quoteRequest: QuoteRequest): void {
    this.socket.emit('quoteRequest', quoteRequest);
  }

  sendNewOrder(newOrder: NewOrder): void {
    this.socket.emit('newOrder', newOrder);
  }

  sendCancelOrder(cancelOrder: CancelOrder): void {
    this.socket.emit('cancelOrder', cancelOrder);
  }

  // Disconnect the socket
  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  isConnected(): boolean {
    return this.socket.connected
  }
}
