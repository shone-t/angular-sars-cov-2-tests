import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { UsersRoutingModule } from "./users-routing.module";
import { LayoutComponent } from "./layout.component";
import { ListComponent } from "./list.component";
import { AddEditComponent } from "./add-edit.component";

import { UserService } from "../_services/user.service";
import { TableModule } from "primeng/table";
import { DialogModule } from "primeng/dialog";
import { ToolbarModule } from "primeng/toolbar";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { PasswordModule } from "primeng/password";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ConfirmationService } from "primeng/api";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    UsersRoutingModule,
    TableModule,
    ToolbarModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    ConfirmDialogModule,
  ],
  declarations: [LayoutComponent, ListComponent, AddEditComponent],
  exports: [LayoutComponent, ListComponent, AddEditComponent],
  providers: [UserService, ConfirmationService],
})
export class UsersModule {}
