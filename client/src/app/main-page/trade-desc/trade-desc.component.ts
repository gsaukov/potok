import { Component } from '@angular/core';
import {ToolbarComponent} from './toolbar/toolbar.component';
import {QuotesComponent} from './quotes/quotes.component';

@Component({
  selector: 'app-trade-desc',
  standalone: true,
  imports: [
    ToolbarComponent,
    QuotesComponent
  ],
  templateUrl: './trade-desc.component.html',
  styleUrl: './trade-desc.component.scss'
})
export class TradeDescComponent {

}
