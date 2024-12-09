import { Component } from '@angular/core';
import {MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import {SocketService} from '../../../services/socket.service';
import {Position} from '../../../services/socket.schema';
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

  positions: Map<string, Position> = new Map()
  dataSource = new MatTableDataSource<Position>();
  displayedColumns: string[] = ['UUID', 'Symbol', 'Route', 'Quantity', 'Wap', 'Actions'];
  lowValue = 0;
  highValue = 5;

  constructor(private socketService:SocketService) {
    this.dataSource.data = Array.from(this.positions.values())
    this.socketService.listenPositionNotification().subscribe(p => {
      this.applyPosition(p)
      this.dataSource.data = Array.from(this.positions.values())
    })
  }

  applyPosition(position: Position) {
    //Potential issue should order position change by size. In case position update coming in the wrong order.
    this.positions.set(position.uuid, position);
  }

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
