import { NgModule } from '@angular/core';
import { CardModule } from 'primeng/card';
import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/primeng';


@NgModule({
  imports: [
    CardModule,
    DataViewModule,
    DropdownModule,
    InputTextModule,
    ProgressSpinnerModule,
  ],
  exports: [
    CardModule,
    DataViewModule,
    DropdownModule,
    InputTextModule,
    ProgressSpinnerModule,
  ]
})
export class PrimengModule {
}
