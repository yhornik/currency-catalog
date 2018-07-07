import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CurrencyDetailComponent } from './currency-detail/currency-detail.component';
import { CurrencyListComponent } from './currency-list/currency-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PrimengModule } from './shared/primeng/primeng.module';
import { CurrencyService } from './shared/services/currency.service';
import { DataResolverService } from './shared/services/data-resolver.service';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    CurrencyDetailComponent,
    CurrencyListComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    PrimengModule,
    AngularFontAwesomeModule,
  ],
  providers: [
    CurrencyService,
    DataResolverService],
  bootstrap: [AppComponent]
})
export class AppModule { }
