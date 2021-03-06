import { AdminGuard } from "./_helpers/admin.guard";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./home";
import { AuthGuard } from "./_helpers";

const accountModule = () =>
  import("./account/account.module").then((x) => x.AccountModule);
const usersModule = () =>
  import("./users/users.module").then((x) => x.UsersModule);
const covidTest = () =>
  import("./covid-tests/covid-tests.module").then((m) => m.CovidTestsModule);
const employees = () =>
  import("./employees/employees.module").then((m) => m.EmployeesModule);

const routes: Routes = [
  { path: "", component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: "users",
    loadChildren: usersModule,
    canActivate: [AuthGuard, AdminGuard],
  },
  { path: "account", loadChildren: accountModule },
  { path: "covid-tests", loadChildren: covidTest, canActivate: [AuthGuard] },
  { path: "employees", loadChildren: employees, canActivate: [AuthGuard] },

  // otherwise redirect to home
  { path: "**", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
