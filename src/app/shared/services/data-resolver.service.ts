import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { CurrencyMetaData } from '../interfaces/currency';
import { CurrencyService } from './currency.service';

@Injectable({
  providedIn: 'root'
})
export class DataResolverService implements Resolve<Array<CurrencyMetaData>> {

  constructor(
    private currencyService: CurrencyService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Array<CurrencyMetaData> {
    return this.getCurrencies();
  }


  private getCurrencies(): Array<CurrencyMetaData> {
    const nbrPages = 8;
    const max = 100;

    const array: Array<CurrencyMetaData> = [];
    return array;
  }


  private createList(pages: number) {
    const array: Array<number> = [];

    for (let i = 1; i <= pages; i++) {
      array.push(i);
    }
    return array;
  }
}
