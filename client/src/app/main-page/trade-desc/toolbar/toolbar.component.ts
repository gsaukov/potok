import { Component } from '@angular/core';
import {SocketService} from '../../../services/socket.service';
import {NewOrder, QuoteRequest} from '../../../services/socket.schema';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  tradeForm!: FormGroup;

  constructor(private socketService: SocketService) {
  }

  subscribe() {
    this.socketService.sendQuoteRequest(new QuoteRequest(symbol))
  }

  newOrder() {
    this.socketService.sendNewOrder(new NewOrder(symbol, route, val, volume))
  }

  sendDisconnect() {

  }
}
