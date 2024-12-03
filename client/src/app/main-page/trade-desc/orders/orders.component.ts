import {ChangeDetectorRef, Component } from '@angular/core';
import {CancelOrder, OrderConfirmation} from '../../../services/socket.schema';
import {MatTableDataSource, MatTableModule,  } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import {SocketService} from '../../../services/socket.service';
import {TEST_ORDERS} from './test.orders';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatPaginator],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {
  orders: OrderConfirmation[] = []
  dataSource = new MatTableDataSource<OrderConfirmation>();
  displayedColumns: string[] = ['UUID', 'Symbol', 'Route', 'Price', 'Quantity', 'Filled', 'Left', 'Actions'];

  constructor(private socketService: SocketService, private changeDetector: ChangeDetectorRef) {
    this.orders = TEST_ORDERS
    this.dataSource.data = this.orders
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
