import {Component} from '@angular/core';
import {SocketService} from '../../../services/socket.service';
import {NewOrder, QuoteRequest} from '../../../services/socket.schema';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  tradeForm: FormGroup;
  balance:number = 0;

  constructor(private socketService: SocketService) {
    this.tradeForm = new FormGroup({
      symbol: new FormControl('', [Validators.required]),
      route: new FormControl('', []),
      volume: new FormControl(Number(), []),
      value: new FormControl(Number(), []),
      balance: new FormControl({value: Number(), disabled: true}),
    })
    this.socketService.listenBalance().subscribe(b => this.balance = b);
  }

  subscribe() {
    const symbol: string = this.tradeForm.controls['symbol'].value
    this.socketService.sendQuoteRequest(new QuoteRequest(symbol))
  }

  newOrder() {
    const symbol: string = this.tradeForm.controls['symbol'].value
    const route: string = this.tradeForm.controls['route'].value
    const volume: number = this.tradeForm.controls['volume'].value
    const value: number = this.tradeForm.controls['value'].value
    this.socketService.sendNewOrder(new NewOrder(symbol, route, value, volume))
  }

  getBalance():number {
    return this.balance
  }

  sendDisconnect() {

  }
}
