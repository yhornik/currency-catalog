import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


import { CurrencyMetaData, CurrencyWrapperOne, PageChanges, ParamsCurrency } from '../interfaces/currency';

const urlAPI = 'https://api.openfintech.io/v1/currencies';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/vnd.api+json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  pagesChanges$: Observable<PageChanges>;
  private pageChanges: BehaviorSubject<PageChanges>;

  constructor(private http: HttpClient) {
  }

  getCurrency(id: string) {
    const url = `${urlAPI}/${id}`;
    return this.http.get<CurrencyWrapperOne>(url, httpOptions)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  getCurrenciesWithParams(params: ParamsCurrency) {
    const httpOptionsCurr = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.api+json'
      })
    };
    const urlParams = this.buildParams(params);
    const uri = `${urlAPI}${urlParams}`;
    return this.http.get<CurrencyMetaData>(uri, httpOptionsCurr)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  initPageChanges(event: PageChanges) {
    this.pageChanges = new BehaviorSubject<PageChanges>(event);
    this.pagesChanges$ = this.pageChanges.asObservable();
  }

  private buildParams(params: ParamsCurrency) {

    const urlParams1 = params.first !== '' ? `page[number]=${params.first}` : '';
    const urlParams2 = params.rows !== '0' && params.rows !== '' ? `page[size]=${params.rows}` : '';
    let urlParams3: string;

    if (params.field && params.field !== '' && params.search !== '') {
      urlParams3 = `filter[${params.field}]=${params.search}`;
    } else if (!params.field && params.search !== '') {
      urlParams3 = `filter[search]=${params.search}`;
    }

    let url = '';
    if (urlParams1 !== '' || urlParams2 !== '' || urlParams3 !== '') {
      url = `?`;
    }

    url = urlParams1 !== '' ? `${url}${urlParams1}` : `${url}`;

    url = urlParams2 !== '' ? url !== '?' ? `${url}&${urlParams2}` : `${url}${urlParams2}` : `${url}`;

    url = urlParams3 !== undefined && urlParams3 !== '' ? url !== '?' ? `${url}&${urlParams3}` : `${url}${urlParams3}` : `${url}`;


    return url;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}
