import { Component } from '@angular/core';
import {ToolbarComponent} from './toolbar/toolbar.component';
import {QuotesComponent} from './quotes/quotes.component';
import {OrdersComponent} from './orders/orders.component';

@Component({
  selector: 'app-trade-desc',
  standalone: true,
  imports: [
    ToolbarComponent,
    QuotesComponent,
    OrdersComponent
  ],
  templateUrl: './trade-desc.component.html',
  styleUrl: './trade-desc.component.scss'
})
export class TradeDescComponent {

}
