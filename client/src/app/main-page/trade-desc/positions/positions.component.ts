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
    this.dataSource = []
  }

  isActive(position:Position) {
    return false;
  }

  closePosition(position:Position) {

  }

  getPositionTypeClass(position: Position) {

  }
}
