import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import {SocketService} from '../../../services/socket.service';
import {Position} from '../../../services/socket.schema';

@Component({
  selector: 'app-positions',
  standalone: true,
  imports: [MatTableModule, MatButtonModule],
  templateUrl: './positions.component.html',
  styleUrl: './positions.component.scss'
})
export class PositionsComponent {

  dataSource:Position[]
  displayedColumns: string[] = ['UUID', 'Symbol', 'Route', 'Quantity', 'Wap'];

  constructor(private socketService:SocketService) {
    this.dataSource = [
      {uuid:'Some UUID', createdTimestamp: 'timstamp', symbol: 'SAPJ', route: 'BUY', account: 'My Account', volume: 100, weightedAveragePrice: 99, averagePerformance: 0},
      {uuid:'Some UUID', createdTimestamp: 'timstamp', symbol: 'SAPJ', route: 'BUY', account: 'My Account', volume: 100, weightedAveragePrice: 99, averagePerformance: 0},
      {uuid:'Some UUID', createdTimestamp: 'timstamp', symbol: 'SAPJ', route: 'BUY', account: 'My Account', volume: 100, weightedAveragePrice: 99, averagePerformance: 0},
    ]
  }

  isActive(position:Position) {
    return false;
  }

  closePosition(position:Position) {

  }

  getPositionTypeClass(position: Position) {

  }
}
