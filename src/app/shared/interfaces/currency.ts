export interface Currency {
  code: string;
  name: string;
  currency_type: string;
  code_estandards_alpha: string
  code_iso_numeric3: string;
  code_iso_alpha3: string;
  symbol: string;
  native_symbol: string;
  category: string;
}

export interface CurrencyWrapper {
  type: string;
  id: string;
  attributes: Currency;
}

export interface CurrencyWrapperOne {
  data: {
    type: string,
    id: string;
    attributes: Currency;
  };
}

export interface CurrencyMetaData {
  meta: {
    total: number;
    pages: number;
  };
  links: {
    first: string;
    next: string;
    last?: string;
    prev?: string;
  };
  data: Array<CurrencyWrapper>;
}

export const filterOptions = [
  {id: '', label: ''},
  {id: 'code', label: 'ID'},
  {id: 'currency_type', label: 'Type'},
  {id: 'code_estandards_alpha', label: 'Code estandards alpha'},
  {id: 'code_iso_numeric3', label: 'Code iso numeric3'},
  {id: 'code_iso_alpha3', label: 'Code iso alpha3'},
  {id: 'category', label: 'Category'}
];

export interface PageChanges {
  first: number;
  rows: number;
}

export interface FilterCurrency {
  field: { id: string, label: string };
  search: string;
}

export class ParamsCurrency {

  first: string;
  rows: string;
  field: string;
  search: string;

  constructor(pageChanges: PageChanges, filterCurr: FilterCurrency) {
    this.first = pageChanges && pageChanges.first >= 0 ? pageChanges.first.toString() : '0';
    this.rows = pageChanges && pageChanges.rows > 0 ? pageChanges.rows.toString() : '10';
    this.field = filterCurr && filterCurr.field ? filterCurr.field.id : '';
    this.search = filterCurr && filterCurr.search ? filterCurr.search : '';
  }
}



