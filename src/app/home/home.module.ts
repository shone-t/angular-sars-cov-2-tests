import { ButtonModule } from "primeng/button";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";

import { HomeComponent } from "./home.component";
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [CommonModule, TranslateModule, ButtonModule, RouterModule],
  exports: [HomeComponent],
  declarations: [HomeComponent],
  providers: [],
})
export class HomeModule {}
