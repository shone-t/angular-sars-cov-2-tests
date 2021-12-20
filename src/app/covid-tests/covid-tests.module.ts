import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CovidTestsRoutingModule } from "./covid-tests-routing.module";
import { CovidTestsComponent } from "./covid-tests.component";
import { FormComponent } from "./form/form.component";
import { ToastModule } from "primeng/toast";
import { MessageService } from "primeng/api";
import { FileUploadModule } from "primeng/fileupload";
import { ButtonModule } from "primeng/button";
import { TableModule } from "primeng/table";
import { ToolbarModule } from "primeng/toolbar";
import { DialogModule } from "primeng/dialog";
import { DropdownModule } from "primeng/dropdown";
import { RadioButtonModule } from "primeng/radiobutton";
import { InputTextModule } from "primeng/inputtext";
import { InputTextareaModule } from "primeng/inputtextarea";
import { BadgeModule } from "primeng/badge";
import { CovidTestsService } from "../_services/covidTest.sevice";

@NgModule({
  declarations: [CovidTestsComponent, FormComponent],
  imports: [
    CommonModule,
    CovidTestsRoutingModule,
    ToastModule,
    FileUploadModule,
    ButtonModule,
    TableModule,
    ToolbarModule,
    DialogModule,
    DropdownModule,
    RadioButtonModule,
    InputTextModule,
    InputTextareaModule,
    BadgeModule,
  ],
  providers: [MessageService, CovidTestsService],
})
export class CovidTestsModule {}
