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
  balance:number = -1;

  constructor(public socketService: SocketService) {
    this.tradeForm = new FormGroup({
      symbol: new FormControl('', []),
      route: new FormControl('', []),
      volume: new FormControl(null, []),
      value: new FormControl(null, []),
      balance: new FormControl({value: this.getBalance(), disabled: true}),
    })
    this.socketService.listenBalance().subscribe(b => this.setBalance(b));
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

  setBalance(balance: number) {
    this.balance = balance
  }

  getBalance() {
    return this.socketService.isConnected()?this.balance:'Not Connected'
  }

  sendDisconnect() {

  }
}
