import { Component } from '@angular/core';
import {SocketService} from '../../../services/socket.service';
import {QuoteRequest} from '../../../services/socket.schema';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {

  constructor(private socketService: SocketService) {
  }

  subscribe(symbol: string) {
    this.socketService.sendQuoteRequest(new QuoteRequest(symbol))
  }

  newOrder() {

  }

  sendDisconnect() {

  }
}
