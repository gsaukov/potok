import { Component } from '@angular/core';
import {MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import {SocketService} from '../../../services/socket.service';
import {Position} from '../../../services/socket.schema';
import {TEST_POSITIONS} from './test.positions';
import {MatPaginator, PageEvent } from '@angular/material/paginator';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-positions',
  standalone: true,
  imports: [SlicePipe, MatTableModule, MatButtonModule, MatPaginator],
  templateUrl: './positions.component.html',
  styleUrl: './positions.component.scss'
})
export class PositionsComponent {

  positions: Position[] = []
  dataSource = new MatTableDataSource<Position>();
  displayedColumns: string[] = ['UUID', 'Symbol', 'Route', 'Quantity', 'Wap', 'Actions'];
  lowValue = 0;
  highValue = 5;

  constructor(private socketService:SocketService) {
    this.positions = TEST_POSITIONS
    this.dataSource.data = this.positions
    this.socketService.listenPositionNotification().subscribe(p => {
      this.positions.push(p)
      this.dataSource.data = this.positions
    })
  }

  // applyExecution(execution: Execution) {
  //   const order:OrderConfirmation = this.getOrderById(execution.orderUuid);
  //   order.volume = execution.orderLeftQuantity;
  // }

  isActive(position:Position) {
    return position.volume > 0;
  }

  closePosition(position:Position) {

  }

  getPositionTypeClass(position: Position) {
    if(position.route === 'BUY') {
      return position.volume > 0?'long-position':'closed-long-position'
    } else {
      return position.volume < 0?'short-position':'closed-short-position'
    }
  }

  public getPaginatorData(event: PageEvent): PageEvent {
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    return event;
  }
}
