import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { LayoutComponent } from "./layout.component";
import { LoginComponent } from "./login.component";
import { RegisterComponent } from "./register.component";
import { VerifyComponent } from "./verify.component";
import { ForgotComponent } from "./forgot.component";
import { ResetComponent } from "./reset.component";

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      { path: "login", component: LoginComponent },
      { path: "register", component: RegisterComponent },
      { path: "forgot", component: ForgotComponent },
      { path: "verify", component: VerifyComponent },
      { path: "reset-password/:token", component: ResetComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
