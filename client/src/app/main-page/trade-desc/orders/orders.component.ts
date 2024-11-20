import { Component } from '@angular/core';
import { OrderConfirmation } from '../../../services/socket.schema';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

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

  constructor() {

    this.dataSource = [
      {symbol: 'SAPJ', route: 'BUY', uuid: 'Some UUID', val: 27, volume: 60, active: true, originalVolume: 70, account: 'some acc', blockedPrice: -1, timestamp: "123123434324"},
      {symbol: 'SAPJ', route: 'BUY', uuid: 'Some UUID', val: 27, volume: 60, active: true, originalVolume: 70, account: 'some acc', blockedPrice: -1, timestamp: "123123434324"},
      {symbol: 'SAPJ', route: 'BUY', uuid: 'Some UUID', val: 27, volume: 60, active: true, originalVolume: 70, account: 'some acc', blockedPrice: -1, timestamp: "123123434324"},
      {symbol: 'SAPJ', route: 'BUY', uuid: 'Some UUID', val: 27, volume: 60, active: true, originalVolume: 70, account: 'some acc', blockedPrice: -1, timestamp: "123123434324"},
      {symbol: 'SAPJ', route: 'BUY', uuid: 'Some UUID', val: 27, volume: 60, active: true, originalVolume: 70, account: 'some acc', blockedPrice: -1, timestamp: "123123434324"},
      {symbol: 'SAPJ', route: 'BUY', uuid: 'Some UUID', val: 27, volume: 60, active: true, originalVolume: 70, account: 'some acc', blockedPrice: -1, timestamp: "123123434324"},
      {symbol: 'SAPJ', route: 'BUY', uuid: 'Some UUID', val: 27, volume: 60, active: true, originalVolume: 70, account: 'some acc', blockedPrice: -1, timestamp: "123123434324"},
      {symbol: 'SAPJ', route: 'BUY', uuid: 'Some UUID', val: 27, volume: 60, active: true, originalVolume: 70, account: 'some acc', blockedPrice: -1, timestamp: "123123434324"},
      {symbol: 'SAPJ', route: 'BUY', uuid: 'Some UUID', val: 27, volume: 60, active: true, originalVolume: 70, account: 'some acc', blockedPrice: -1, timestamp: "123123434324"},
      {symbol: 'SAPJ', route: 'BUY', uuid: 'Some UUID', val: 27, volume: 60, active: true, originalVolume: 70, account: 'some acc', blockedPrice: -1, timestamp: "123123434324"},
      {symbol: 'SAPJ', route: 'BUY', uuid: 'Some UUID', val: 27, volume: 60, active: true, originalVolume: 70, account: 'some acc', blockedPrice: -1, timestamp: "123123434324"},
      {symbol: 'SAPJ', route: 'BUY', uuid: 'Some UUID', val: 27, volume: 60, active: true, originalVolume: 70, account: 'some acc', blockedPrice: -1, timestamp: "123123434324"},
      {symbol: 'SAPJ', route: 'BUY', uuid: 'Some UUID', val: 27, volume: 60, active: true, originalVolume: 70, account: 'some acc', blockedPrice: -1, timestamp: "123123434324"},
    ]
  }

  cancelOrder() {

  }

  addOrderToTable(newOrder: OrderConfirmation) {
    var table = document.getElementById("orderTable");
    // var row = table.insertRow(0);
    let  row:any;
    row.id = 'orderRow' + newOrder.uuid;
    var uuid = row.insertCell(0);
    var symbol = row.insertCell(1);
    var route = row.insertCell(2);
    var price = row.insertCell(3);
    var quantity = row.insertCell(4);
    var filled = row.insertCell(5);
    var left = row.insertCell(6);

    uuid.innerHTML = newOrder.uuid + ' ' + "<a href='#' class='btn btn-default btn-close' aria-label='Cancel' onclick=\"cancelOrder('" + newOrder.uuid + "');\" style='font-size: 40px; line-height: 0'>&times;</a>";

    symbol.innerHTML = newOrder.symbol;
    route.innerHTML = newOrder.route;
    price.innerHTML = newOrder.val;
    quantity.innerHTML = newOrder.originalVolume;
    filled.innerHTML = newOrder.originalVolume - newOrder.volume;
    left.innerHTML = newOrder.volume;
    if(newOrder.route === 'BUY') {
      if(newOrder.volume > 0) {
        row.classList.add('long-order');
      } else {
        row.classList.add('filled-long-order');
      }
    } else {
      if(newOrder.volume > 0) {
        row.classList.add('short-order');
      } else {
        row.classList.add('filled-short-order');
      }
    }
  }

}
