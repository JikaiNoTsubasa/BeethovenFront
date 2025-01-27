import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {

  @Input() page: number = 1;
  @Input() pageSize: number = 10;
  @Input() total: number = 1;
  @Input() headers: string[] = [];
  @Input() rows: any[] = [];

  @Output() changePage = new EventEmitter<number>();

  pages: number[] = [];
  outputRows: any[][] = [];

  ngOnInit(){
    this.pages = this.range(1, Math.ceil(this.total / this.pageSize));
    this.initTable();
  }

  initTable(){
    this.rows.forEach((row, index) => {
      let curRow: any = [];
      this.headers.forEach((header, idx) => {
        curRow[idx] = this.getValue(row, header);
      });
      this.outputRows[index] = curRow;
    });
  }

  range(min: number, max: number) {
    return Array.from({ length: max - min + 1 }, (_, i) => min + i);
  }

  getValue<T, K extends keyof T>(data: T, key: K) {
    return data[key];
  }
}
