import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Currency } from '../shared/interfaces/currency';
import { CurrencyService } from '../shared/services/currency.service';

@Component({
  selector: 'app-currency-detail',
  templateUrl: './currency-detail.component.html',
  styleUrls: ['./currency-detail.component.css']
})
export class CurrencyDetailComponent implements OnInit {
  currency: Currency;
  constructor(
    private route: ActivatedRoute,
    private currencyService: CurrencyService
  ) {
  }

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap(data => this.handleCurrency(data))
      )
      .subscribe(res => {
        this.currency = res.data.attributes;
      });
  }

  handleCurrency(data: any) {
    return this.currencyService.getCurrency(data.get('code'));
  }

}
