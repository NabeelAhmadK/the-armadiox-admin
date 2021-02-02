import { CustomerTable } from '../../../shared/models/customer';
import { PaginationModel, FiltersByModel } from '../../../shared/models';

export class CustomerListFilter {
    public name: string;
    public role: string;
    public status: number;
    public sortBy: string;
    public searchText: string;
    public searchBy: string;
    public pagination: PaginationModel;

    public filterBy: FiltersByModel;
    public filtersBy: Array<FiltersByModel> = [];

    constructor() {
        this.name = null;
        this.role = 'user';
        this.status = null;
        this.sortBy = 'updatedAt:desc';
        this.searchText = '';
        this.pagination = new PaginationModel();
        this.buildFilterBy(this);
    }

    buildFilterBy(model) {
        let obj = new CustomerTable();
        for (const key in obj) {
            this.filtersBy.push(new FiltersByModel(key));
        }
        model.searchBy = this.filtersBy[0].value;
        model.filterBy = this.filtersBy[0];
    }

    filterByChange(selectVal) {
        this.filterBy = selectVal;
        this.searchBy = selectVal.value;
    }
}
