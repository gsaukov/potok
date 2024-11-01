import { Component } from '@angular/core';
import {ToolbarComponent} from './toolbar/toolbar.component';

@Component({
  selector: 'app-trade-desc',
  standalone: true,
  imports: [
    ToolbarComponent
  ],
  templateUrl: './trade-desc.component.html',
  styleUrl: './trade-desc.component.scss'
})
export class TradeDescComponent {

}
