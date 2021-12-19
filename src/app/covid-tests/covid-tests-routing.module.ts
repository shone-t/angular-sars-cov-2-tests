import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CovidTestsComponent } from "./covid-tests.component";
import { FormComponent } from "./form/form.component";

const routes: Routes = [
  {
    path: "",
    component: CovidTestsComponent,
    children: [{ path: "add", component: FormComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CovidTestsRoutingModule {}
