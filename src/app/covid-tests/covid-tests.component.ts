import { map, take } from "rxjs/operators";
import { Observable } from "rxjs";
import { Component, OnInit } from "@angular/core";
import { CovidTestsService } from "../_services";
import { LazyLoadEvent } from "primeng/api";

@Component({
  selector: "app-covid-tests",
  templateUrl: "./covid-tests.component.html",
  styleUrls: ["./covid-tests.component.scss"],
})
export class CovidTestsComponent implements OnInit {
  list!: Observable<any>;
  statuses: any[] = [];
  productDialog: boolean = false;
  covidTestsData: any[] = [];
  covidTest: any;
  selectedTest: any[] = [];
  totalRecords: number = 0;
  loading: boolean = true;
  filterValue: LazyLoadEvent = {};
  searchText: string = '';

  constructor(private covidTests: CovidTestsService) {}

  ngOnInit(): void {
    this.covidTests
      .getAllEmployees()
      .pipe(take(1))
      .subscribe((data) => {});

    this.statuses = [
      { label: "POSITIVE", value: "positive" },
      { label: "NEGATIVE", value: "negative" },
    ];
  }

  openNew() {
    this.productDialog = true;
  }

  hideDialog() {
    this.productDialog = false;
  }

  loadTests(event: LazyLoadEvent) {
    this.loading = true;
    this.filterValue = event;
    let sortOrder = "";
    if (event.sortOrder == -1) {
      sortOrder = "DESC";
    } else {
      sortOrder = "ASC";
    }

    this.covidTests
      .getAllTest(
        event.first,
        sortOrder,
        event.sortField ?? "",
        event.rows,
        this.searchText ?? ""
      )
      .pipe(take(1))
      .subscribe((data) => {
        this.covidTestsData = data["rows"];
        this.totalRecords = data["count"];
        this.loading = false;
      });
  }

  editTest(covidTest: any) {
    this.productDialog = true;
    console.log(covidTest);
  }

  searchCovidTest(event: any){
    this.searchText = event["data"]
    let sortOrder = "";
    if (this.filterValue.sortOrder == -1) {
      sortOrder = "DESC";
    } else {
      sortOrder = "ASC";
    }

    this.covidTests
      .getAllTest(
        this.filterValue.first,
        this.filterValue.sortOrder,
        this.filterValue.sortField ?? "",
        this.filterValue.rows,
        this.searchText
      )
      .pipe(take(1))
      .subscribe((data) => {
        this.covidTestsData = data["rows"];
        this.totalRecords = data["count"];
        this.loading = false;
      });

  }
}
