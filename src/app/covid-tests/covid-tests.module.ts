import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CovidTestsRoutingModule } from './covid-tests-routing.module';
import { CovidTestsComponent } from './covid-tests.component';
import { FormComponent } from './form/form.component';


@NgModule({
  declarations: [
    CovidTestsComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    CovidTestsRoutingModule
  ]
})
export class CovidTestsModule { }
