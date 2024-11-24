import { Component } from '@angular/core';
import {Position} from '../../../services/socket.schema';

@Component({
  selector: 'app-positions',
  standalone: true,
  imports: [],
  templateUrl: './positions.component.html',
  styleUrl: './positions.component.scss'
})
export class PositionsComponent {

  dataSource:Position[]
  displayedColumns: string[] = ['UUID', 'Symbol', 'Route', 'Quantity', 'Wap'];
  
  constructor() {
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
