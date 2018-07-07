import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CurrencyDetailComponent } from './currency-detail/currency-detail.component';
import { CurrencyListComponent } from './currency-list/currency-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DataResolverService } from './shared/services/data-resolver.service';

const routes: Routes = [
  { path: 'currency/:code',
    component: CurrencyDetailComponent,
    resolve: { currencyData: DataResolverService}
  },
  {
    path: 'currency',
    component: CurrencyListComponent,
    resolve: { currencyData: DataResolverService}
  },
  { path: '',
    redirectTo: '/currency',
    pathMatch: 'full'
  },
  { path: '**',
    component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
