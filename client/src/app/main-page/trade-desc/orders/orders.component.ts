import {ChangeDetectorRef, Component } from '@angular/core';
import {CancelOrder, Execution, OrderConfirmation, Position} from '../../../services/socket.schema';
import {MatTableDataSource, MatTableModule,  } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import {SocketService} from '../../../services/socket.service';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [SlicePipe, MatTableModule, MatButtonModule, MatPaginator],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {
  orders: Map<string, OrderConfirmation> = new Map()
  dataSource = new MatTableDataSource<OrderConfirmation>();
  displayedColumns: string[] = ['UUID', 'Symbol', 'Route', 'Price', 'Quantity', 'Filled', 'Left', 'Actions'];
  lowValue = 0;
  highValue = 5;

  constructor(private socketService: SocketService, private changeDetector: ChangeDetectorRef) {
    this.dataSource.data = Array.from(this.orders.values())
    this.socketService.listenOrderConfirm().subscribe(o => {
        this.orders.set(o.uuid, o)
        this.dataSource.data = Array.from(this.orders.values())
      })
    this.socketService.listenExecution().subscribe(e => {
      this.applyExecution(e)
      this.dataSource.data = Array.from(this.orders.values())
    })
    this.socketService.listenOrderCancel().subscribe(o => {
      this.applyOrderCancel(o)
      this.dataSource.data = Array.from(this.orders.values())
    })
  }

  applyExecution(execution: Execution) {
    //Potential issue should order position change by size. In case position update coming in the wrong order.
    const order = this.orders.get(execution.orderUuid)!
    order.volume = execution.orderLeftQuantity
    this.orders.set(order.uuid, order);
  }

  applyOrderCancel(order: OrderConfirmation) {
    this.orders.set(order.uuid, order);
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

  public getPaginatorData(event: PageEvent): PageEvent {
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    return event;
  }

}
