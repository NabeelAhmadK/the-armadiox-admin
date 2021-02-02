import {
  StringConverter,
  BooleanConverter,
  NumberConverter,
} from '../../core/utils';

export class PaginationModel {
  public totalPages: number;
  public pageNum: number;
  public currentPage: number;
  public pageSize: number;
  public totalResults: number;
  public sortBy: string;
  public sortOrder: string;
  public filter: string;

  public constructor(data: any = {}) {
    this.totalPages = NumberConverter(data.totalPages || 1);
    this.currentPage = NumberConverter(data.currentPage || 1);
    this.pageNum = NumberConverter(data.pageNum || this.currentPage);
    this.pageSize = NumberConverter(data.pageSize || 10);
    this.totalResults = NumberConverter(data.totalResults || 0);
    this.sortBy = StringConverter(data.sortBy || '');
    this.sortOrder = StringConverter(data.sortOrder || 'asc');
    this.filter = StringConverter(data.filter || '');
  }
}
