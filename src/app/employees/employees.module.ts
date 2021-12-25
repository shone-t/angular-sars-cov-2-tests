import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EmployeesComponent } from "./employees.component";
import { EmployeesRoutingModule } from "./employees-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AutoCompleteModule } from "primeng/autocomplete";
import { BadgeModule } from "primeng/badge";
import { ButtonModule } from "primeng/button";
import { CalendarModule } from "primeng/calendar";
import { DialogModule } from "primeng/dialog";
import { DropdownModule } from "primeng/dropdown";
import { InputMaskModule } from "primeng/inputmask";
import { InputTextModule } from "primeng/inputtext";
import { InputTextareaModule } from "primeng/inputtextarea";
import { RadioButtonModule } from "primeng/radiobutton";
import { TableModule } from "primeng/table";
import { ToastModule } from "primeng/toast";
import { ToolbarModule } from "primeng/toolbar";

@NgModule({
  declarations: [EmployeesComponent],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    ToastModule,
    ButtonModule,
    TableModule,
    ToolbarModule,
    DialogModule,
    DropdownModule,
    RadioButtonModule,
    InputTextModule,
    InputTextareaModule,
    BadgeModule,
    AutoCompleteModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    InputMaskModule,
  ],
  exports: [EmployeesComponent],
})
export class EmployeesModule {}
