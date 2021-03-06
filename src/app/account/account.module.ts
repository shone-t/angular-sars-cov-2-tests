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
import { ResetComponent } from "./reset.component";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AccountRoutingModule,
    ButtonModule,
    PasswordModule,
    TranslateModule
  ],
  declarations: [
    LayoutComponent,
    LoginComponent,
    RegisterComponent,
    ForgotComponent,
    VerifyComponent,
    ResetComponent,
  ],
})
export class AccountModule {}
