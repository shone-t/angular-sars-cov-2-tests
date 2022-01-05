import { VerifyComponent } from "./verify.component";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { AccountRoutingModule } from "./account-routing.module";
import { LayoutComponent } from "./layout.component";
import { LoginComponent } from "./login.component";
import { RegisterComponent } from "./register.component";
import { ButtonModule } from "primeng/button";
import { PasswordModule } from "primeng/password";
import { ForgotComponent } from "./forgot.component";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AccountRoutingModule,
    ButtonModule,
    PasswordModule,
  ],
  declarations: [
    LayoutComponent,
    LoginComponent,
    RegisterComponent,
    ForgotComponent,
    VerifyComponent,
  ],
})
export class AccountModule {}
