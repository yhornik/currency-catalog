import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { from, Subject } from 'rxjs';
import { concatMap, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';


import { Currency, CurrencyMetaData, filterOptions, ParamsCurrency } from '../shared/interfaces/currency';
import { CurrencyService } from '../shared/services/currency.service';

@Component({
  selector: 'app-currency-list',
  templateUrl: './currency-list.component.html',
  styleUrls: ['./currency-list.component.css']
})
export class CurrencyListComponent implements OnInit {
  currencyForm: FormGroup;
  currencies: Array<Currency>;
  allCurrencies: Array<Currency> = [];
  currencyFields: Array<{ id: string, label: string }> = filterOptions;
  rowsPerPageOpts = [10, 50, 100];
  isLoading = false;

  private onDestroy$ = new Subject();

  constructor(
    private route: ActivatedRoute,
    private currencyService: CurrencyService,
    private formBuilder: FormBuilder
  ) {

    this.currencyService.initPageChanges({first: 0, rows: 800});

    this.currencyForm = this.formBuilder.group({
      field: new FormControl(null),
      search: new FormControl(''),
      nbrItem: new FormControl(10),
      idx: new FormControl(0)
    });
  }

  ngOnInit() {
    const ids = this.createList(8);
    from(ids).pipe(
      concatMap(id => this.currencyService.getCurrenciesWithParams(
        new ParamsCurrency({first: id, rows: 100}, {field: null, search: ''}))),
      takeUntil(this.onDestroy$)
    )
      .subscribe((data: CurrencyMetaData) => {
        this.isLoading = true;
        if (data) {
          this.isLoading = false;
          this.allCurrencies.push(...data.data.map(d => d.attributes));
          this.currencies = [...this.allCurrencies];
        } else {
          this.isLoading = true;
        }
      });

    this.currencyForm.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this.onDestroy$))
      .subscribe(data => {
        this.filterCurrencies(data);
      });
  }

  pageEvent(event: any) {
    this.currencyForm.get('nbrItem').setValue(event.rows);
    this.currencyForm.get('idx').setValue(event.first);
  }

  private filterCurrencies(data:  {field: {id: string, label: string}, search: string, nbrItem: number, idx: number}) {
    if (data.search !== '') {
      // filter
      if (data.field && data.field.id !== '') {
        switch (data.field.id) {
          case 'code' : {
            this.currencies = [...this.allCurrencies.filter(c => c.code.toLowerCase().includes(data.search.toLowerCase()))];
            break;
          }
          case 'currency_type' : {
            this.currencies = [...this.allCurrencies.filter(c => c.currency_type.toLowerCase().includes(data.search.toLowerCase()))];
            break;
          }
          case 'code_estandards_alpha' : {
            this.currencies =
              [...this.allCurrencies.filter(c => c.code_estandards_alpha.toLowerCase().includes(data.search.toLowerCase()))];
            break;
          }
          case 'code_iso_numeric3' : {
            this.currencies = [...this.allCurrencies.filter(c => c.code_iso_numeric3.toLowerCase().includes(data.search.toLowerCase()))];
            break;
          }
          case 'code_iso_alpha3' : {
            this.currencies = [...this.allCurrencies.filter(c => c.code_iso_alpha3.toLowerCase().includes(data.search.toLowerCase()))];
            break;
          }
          case 'category' : {
            this.currencies  = [...this.allCurrencies.filter(c => c.category.toLowerCase().includes(data.search.toLowerCase()))];
            break;
          }
          default  : {
            this.currencies  = [...this.allCurrencies];
            break;
          }
        }
      } else {
        // search on All fields
        this.currencies  = [...this.allCurrencies.filter(c =>
                  c.code.toLowerCase().includes(data.search.toLowerCase()) ||
                  c.currency_type.toLowerCase().includes(data.search.toLowerCase()) ||
                  c.code_estandards_alpha.toLowerCase().includes(data.search.toLowerCase()) ||
                  c.code_iso_numeric3.toLowerCase().includes(data.search.toLowerCase()) ||
                  c.code_iso_alpha3.toLowerCase().includes(data.search.toLowerCase()) ||
                  c.category.toLowerCase().includes(data.search.toLowerCase()))];
      }
    } else {
      this.currencies = [...this.allCurrencies];
    }
  }

  private createList(pages: number) {
    const array: Array<number> = [];

    for (let i = 1; i <= pages; i++) {
      array.push(i);
    }
    return array;
  }

}
