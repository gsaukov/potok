import { Component, ElementRef, ViewChild } from '@angular/core';
import {QuoteResponse} from '../../../services/socket.schema';
import {SocketService} from '../../../services/socket.service';

@Component({
  selector: 'app-quotes',
  standalone: true,
  imports: [],
  templateUrl: './quotes.component.html',
  styleUrl: './quotes.component.scss'
})
export class QuotesComponent {
  @ViewChild('tradingWindowBidTable', { static: true }) tradingWindowBidTable!: ElementRef;
  @ViewChild('tradingWindowAskTable', { static: true }) tradingWindowAskTable!: ElementRef;

  constructor(private socketService: SocketService) {
    socketService.listenQuoteResponse().subscribe(quoteResponse => this.buildBidAskTable(quoteResponse))
  }

  buildBidAskTable(quoteResponse:QuoteResponse) {
    let bidData = quoteResponse.bidQuotes;
    let askData = quoteResponse.askQuotes;
    let bidTable = this.buildHtmlTable(bidData);
    let askTable = this.buildHtmlTable(askData);
    this.tradingWindowBidTable.nativeElement = bidTable.innerHTML;
    this.tradingWindowBidTable.nativeElement = askTable.innerHTML;
  }

  buildHtmlTable(arr: any[]): HTMLTableElement {
    const table: HTMLTableElement = document.createElement('table');
    const tr: HTMLTableRowElement = document.createElement('tr');
    const th: HTMLTableCellElement = document.createElement('th');
    const td: HTMLTableCellElement = document.createElement('td');

    table.style.borderCollapse = 'separate';
    table.style.borderSpacing = '10px 0';

    const columns = this.addAllColumnHeaders(arr, table, tr, th);
    for (const rowData of arr) {
      const row: HTMLTableRowElement = tr.cloneNode(false) as HTMLTableRowElement;
      for (const column of columns) {
        const cell: HTMLTableCellElement = td.cloneNode(false) as HTMLTableCellElement;
        const cellValue = rowData[column] || '';
        cell.textContent = cellValue;
        row.appendChild(cell);
      }
      table.appendChild(row);
    }
    return table;
  }

  private addAllColumnHeaders(arr: any[], table: HTMLTableElement, tr: HTMLTableRowElement, th: HTMLTableCellElement): string[] {
    const columnSet: string[] = [];
    const headerRow: HTMLTableRowElement = tr.cloneNode(false) as HTMLTableRowElement;

    for (const item of arr) {
      for (const key in item) {
        if (item.hasOwnProperty(key) && !columnSet.includes(key)) {
          columnSet.push(key);
          const headerCell: HTMLTableCellElement = th.cloneNode(false) as HTMLTableCellElement;
          headerCell.textContent = key;
          headerRow.appendChild(headerCell);
        }
      }
    }

    table.appendChild(headerRow);
    return columnSet;
  }

}
