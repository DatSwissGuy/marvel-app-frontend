import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {

  @Input() offset: number;
  @Input() limit: number;
  @Input() total: number;
  @Output() pageChange = new EventEmitter();

  get totalPages(): number {
    return Math.ceil(this.total / this.limit);
  }

  get isTotalPagesNaN(): boolean {
    return isNaN(this.totalPages);
  }

  get isButtonNextDisabled(): boolean {
    return this.page === this.totalPages;
  }

  get isButtonLastDisabled(): boolean {
    return this.page === this.totalPages;
  }

  get isButtonFirstDisabled(): boolean {
    return this.page === 1;
  }

  get isButtonPreviousDisabled(): boolean {
    return this.page === 1;
  }

  nextPage(): void {
    if (this.page !== this.totalPages) {
      if (this.page + 1 <= this.totalPages) {
        this.pageChange.emit({offset: this.offset + this.limit, limit: this.limit});
      }
    }
  }

  previousPage(): void {
    if (this.page !== 1) {
      const previousPage = this.page - 1;
      if (previousPage >= 1) {
        this.pageChange.emit({offset: this.offset - this.limit, limit: this.limit});
      }
    }
  }

  firstPage(): void {
    if (this.page !== 1) {
      this.pageChange.emit({offset: 0, limit: this.limit});
    }
  }

  lastPage(): void {
    if (this.page !== this.totalPages) {
      this.pageChange.emit({offset: Math.floor(this.total / this.limit) * this.limit, limit: this.limit});
    }
  }

  get page(): number {
    return Math.ceil(this.offset / this.limit + 1);
  }
}
