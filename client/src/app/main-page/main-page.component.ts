import {AfterViewInit, Component } from '@angular/core';
import {SocketService} from '../services/socket.service';
import {TradeDescComponent} from './trade-desc/trade-desc.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    TradeDescComponent
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent  {
  constructor() {
  }

}
