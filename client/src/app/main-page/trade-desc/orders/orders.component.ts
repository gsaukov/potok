import {ChangeDetectorRef, Component } from '@angular/core';
import {CancelOrder, Execution, OrderConfirmation} from '../../../services/socket.schema';
import {MatTableDataSource, MatTableModule } from '@angular/material/table';
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
  orders: OrderConfirmation[] = []
  dataSource = new MatTableDataSource<OrderConfirmation>();
  displayedColumns: string[] = ['UUID', 'Symbol', 'Route', 'Price', 'Quantity', 'Filled', 'Left', 'Actions'];

  constructor(private socketService: SocketService, private changeDetector: ChangeDetectorRef) {

    // this.dataSource = [
    //   {symbol: 'SAPJ', route: 'BUY', uuid: 'Some UUID', val: 27, volume: 60, active: true, originalVolume: 70, account: 'some acc', blockedPrice: -1, timestamp: "123123434324"},
    //   {symbol: 'SAPJ', route: 'SELL', uuid: 'Some UUID', val: 27, volume: 60, active: true, originalVolume: 70, account: 'some acc', blockedPrice: -1, timestamp: "123123434324"},
    //   {symbol: 'SAPJ', route: 'SHORT', uuid: 'Some UUID', val: 27, volume: 60, active: true, originalVolume: 70, account: 'some acc', blockedPrice: -1, timestamp: "123123434324"},
    //   {symbol: 'SAPJ', route: 'SELL', uuid: 'Some UUID', val: 27, volume: 60, active: true, originalVolume: 70, account: 'some acc', blockedPrice: -1, timestamp: "123123434324"},
    //   {symbol: 'SAPJ', route: 'BUY', uuid: 'Some UUID', val: 27, volume: 60, active: false, originalVolume: 70, account: 'some acc', blockedPrice: -1, timestamp: "123123434324"},
    //   {symbol: 'SAPJ', route: 'SELL', uuid: 'Some UUID', val: 27, volume: 60, active: false, originalVolume: 70, account: 'some acc', blockedPrice: -1, timestamp: "123123434324"},
    //   {symbol: 'SAPJ', route: 'SHORT', uuid: 'Some UUID', val: 27, volume: 60, active: false, originalVolume: 70, account: 'some acc', blockedPrice: -1, timestamp: "123123434324"},
    //   {symbol: 'SAPJ', route: 'BUY', uuid: 'Some UUID', val: 27, volume: 60, active: true, originalVolume: 70, account: 'some acc', blockedPrice: -1, timestamp: "123123434324"},
    //   {symbol: 'SAPJ', route: 'BUY', uuid: 'Some UUID', val: 27, volume: 60, active: true, originalVolume: 70, account: 'some acc', blockedPrice: -1, timestamp: "123123434324"},
    //   {symbol: 'SAPJ', route: 'SELL', uuid: 'Some UUID', val: 27, volume: 60, active: true, originalVolume: 70, account: 'some acc', blockedPrice: -1, timestamp: "123123434324"},
    //   {symbol: 'SAPJ', route: 'SELL', uuid: 'Some UUID', val: 27, volume: 0, active: true, originalVolume: 70, account: 'some acc', blockedPrice: -1, timestamp: "123123434324"},
    //   {symbol: 'SAPJ', route: 'BUY', uuid: 'Some UUID', val: 27, volume: 0, active: true, originalVolume: 70, account: 'some acc', blockedPrice: -1, timestamp: "123123434324"},
    //   {symbol: 'SAPJ', route: 'SHORT', uuid: 'Some UUID', val: 27, volume: 0, active: true, originalVolume: 70, account: 'some acc', blockedPrice: -1, timestamp: "123123434324"},
    // ]
    this.socketService.listenOrderConfirm().subscribe(o => {
        this.orders.push(o)
        this.dataSource.data = this.orders
      })
  }

  cancelOrder(uuid:string) {
    this.socketService.sendCancelOrder(new CancelOrder(uuid))
  }

  getOrderTypeClass(order: OrderConfirmation):string {
    if(order.route === 'BUY') {
      return this.isActive(order)?'long-order': 'filled-long-order';
    } else {
      return this.isActive(order)?'short-order':'filled-short-order'
    }
  }

  isActive(order: OrderConfirmation){
    return order.active && order.volume > 0
  }

  getOrderById(uuid:string):OrderConfirmation {
    return this.orders.find(e => e.uuid === uuid)!
  }

}
