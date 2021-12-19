import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { UsersRoutingModule } from "./users-routing.module";
import { LayoutComponent } from "./layout.component";
import { ListComponent } from "./list.component";
import { AddEditComponent } from "./add-edit.component";

import { InputTextModule } from "primeng/inputtext";
import { CalendarModule } from "primeng/calendar";
import { UserService } from "../_services/user.service";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    UsersRoutingModule,
    InputTextModule,
    CalendarModule,
  ],
  declarations: [LayoutComponent, ListComponent, AddEditComponent],
  exports: [LayoutComponent, ListComponent, AddEditComponent],
  providers: [UserService],
})
export class UsersModule {}
