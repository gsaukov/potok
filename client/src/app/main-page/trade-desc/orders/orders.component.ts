import { Component } from '@angular/core';
import {CancelOrder, OrderConfirmation} from '../../../services/socket.schema';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import {SocketService} from '../../../services/socket.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [MatTableModule, MatButtonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {
  dataSource: OrderConfirmation[]
  displayedColumns: string[] = ['UUID', 'Symbol', 'Route', 'Price', 'Quantity', 'Filled', 'Left', 'Actions'];

  constructor(private socketService: SocketService) {

    this.dataSource = [
      {symbol: 'SAPJ', route: 'BUY', uuid: 'Some UUID', val: 27, volume: 60, active: true, originalVolume: 70, account: 'some acc', blockedPrice: -1, timestamp: "123123434324"},
      {symbol: 'SAPJ', route: 'SELL', uuid: 'Some UUID', val: 27, volume: 60, active: true, originalVolume: 70, account: 'some acc', blockedPrice: -1, timestamp: "123123434324"},
      {symbol: 'SAPJ', route: 'SHORT', uuid: 'Some UUID', val: 27, volume: 60, active: true, originalVolume: 70, account: 'some acc', blockedPrice: -1, timestamp: "123123434324"},
      {symbol: 'SAPJ', route: 'SELL', uuid: 'Some UUID', val: 27, volume: 60, active: true, originalVolume: 70, account: 'some acc', blockedPrice: -1, timestamp: "123123434324"},
      {symbol: 'SAPJ', route: 'BUY', uuid: 'Some UUID', val: 27, volume: 60, active: true, originalVolume: 70, account: 'some acc', blockedPrice: -1, timestamp: "123123434324"},
      {symbol: 'SAPJ', route: 'BUY', uuid: 'Some UUID', val: 27, volume: 60, active: true, originalVolume: 70, account: 'some acc', blockedPrice: -1, timestamp: "123123434324"},
      {symbol: 'SAPJ', route: 'BUY', uuid: 'Some UUID', val: 27, volume: 60, active: true, originalVolume: 70, account: 'some acc', blockedPrice: -1, timestamp: "123123434324"},
      {symbol: 'SAPJ', route: 'BUY', uuid: 'Some UUID', val: 27, volume: 60, active: true, originalVolume: 70, account: 'some acc', blockedPrice: -1, timestamp: "123123434324"},
      {symbol: 'SAPJ', route: 'BUY', uuid: 'Some UUID', val: 27, volume: 60, active: true, originalVolume: 70, account: 'some acc', blockedPrice: -1, timestamp: "123123434324"},
      {symbol: 'SAPJ', route: 'SELL', uuid: 'Some UUID', val: 27, volume: 60, active: true, originalVolume: 70, account: 'some acc', blockedPrice: -1, timestamp: "123123434324"},
      {symbol: 'SAPJ', route: 'SELL', uuid: 'Some UUID', val: 27, volume: 0, active: true, originalVolume: 70, account: 'some acc', blockedPrice: -1, timestamp: "123123434324"},
      {symbol: 'SAPJ', route: 'BUY', uuid: 'Some UUID', val: 27, volume: 0, active: true, originalVolume: 70, account: 'some acc', blockedPrice: -1, timestamp: "123123434324"},
      {symbol: 'SAPJ', route: 'SHORT', uuid: 'Some UUID', val: 27, volume: 0, active: true, originalVolume: 70, account: 'some acc', blockedPrice: -1, timestamp: "123123434324"},
    ]
  }

  cancelOrder(uuid:string) {
    this.socketService.sendCancelOrder(new CancelOrder(uuid))
  }

  getOrderTypeClass(order: OrderConfirmation):string {
    if(order.route === 'BUY') {
      if(order.active && order.volume > 0) {
        return 'long-order';
      } else {
        return 'filled-long-order';
      }
    } else {
      if(order.active && order.volume > 0) {
        return 'short-order';
      } else {
        return 'filled-short-order';
      }
    }
  }

}
