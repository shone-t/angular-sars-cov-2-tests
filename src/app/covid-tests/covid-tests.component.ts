import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { Component, OnInit } from "@angular/core";
import { CandidatesService } from "../_services/candidates.service";

@Component({
  selector: "app-covid-tests",
  templateUrl: "./covid-tests.component.html",
  styleUrls: ["./covid-tests.component.scss"],
})
export class CovidTestsComponent implements OnInit {
  list!: Observable<any>;

  constructor(private _service: CandidatesService) {}

  ngOnInit(): void {
    this.list = this._service.getAllUsers().pipe(map((item) => item.result));
  }
}
