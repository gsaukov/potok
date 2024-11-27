import { Component } from '@angular/core';
import {MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import {SocketService} from '../../../services/socket.service';
import {Execution, OrderConfirmation, Position} from '../../../services/socket.schema';

@Component({
  selector: 'app-positions',
  standalone: true,
  imports: [MatTableModule, MatButtonModule],
  templateUrl: './positions.component.html',
  styleUrl: './positions.component.scss'
})
export class PositionsComponent {

  positions: Position[] = []
  dataSource = new MatTableDataSource<Position>();
  displayedColumns: string[] = ['UUID', 'Symbol', 'Route', 'Quantity', 'Wap'];

  constructor(private socketService:SocketService) {
    // this.positions = [
    //   {uuid:'Some UUID', createdTimestamp: 'timstamp', symbol: 'SAPJ', route: 'BUY', account: 'My Account', volume: 100, weightedAveragePrice: 99, averagePerformance: 0},
    //   {uuid:'Some UUID', createdTimestamp: 'timstamp', symbol: 'SAPJ', route: 'BUY', account: 'My Account', volume: 100, weightedAveragePrice: 99, averagePerformance: 0},
    //   {uuid:'Some UUID', createdTimestamp: 'timstamp', symbol: 'SAPJ', route: 'BUY', account: 'My Account', volume: 100, weightedAveragePrice: 99, averagePerformance: 0},
    // ]

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
    return false;
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
}
