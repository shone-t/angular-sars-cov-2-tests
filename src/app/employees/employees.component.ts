import { FormBuilder, Validators } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { LazyLoadEvent } from "primeng/api";
import { Observable, take } from "rxjs";
import { CandidatesService } from "../_services/candidates.service";
import { Employee } from "./../_models/employee";
import { AlertService } from "../_services";

@Component({
  selector: "app-employees",
  templateUrl: "./employees.component.html",
  styleUrls: ["./employees.component.scss"],
})
export class EmployeesComponent implements OnInit {
  list!: Observable<any>;
  statuses: any[] = [];
  productDialog: boolean = false;
  employeesData: any[] = [];
  employee: any;
  selectedTest: any[] = [];
  totalRecords: number = 0;
  loading: boolean = true;
  filterValue: LazyLoadEvent = {};
  searchText: string = "";

  editMode = false;
  formEmployee: FormGroup;
  lastTableLazyLoadEvent: LazyLoadEvent = {};
  // employeeTests: any[] = [];
  // listOfTestVisible: boolean = false;

  constructor(
    private service: CandidatesService,
    private _formBuilder: FormBuilder,
    private alertService: AlertService
  ) {
    this.formEmployee = this._formBuilder.group({
      uuid: [""],
      name: ["", Validators.required],
      address: ["", Validators.required],
      dateOfBirth: ["", Validators.required],
      emailOrTelephone: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {}

  loadEmployees(event: any) {
    this.loading = true;
    this.lastTableLazyLoadEvent = event;
    this.filterValue = event;
    let sortOrder = "";
    if (event.sortOrder == -1) {
      sortOrder = "DESC";
    } else {
      sortOrder = "ASC";
    }

    this.service
      .getAllEmployee(
        event.first,
        sortOrder,
        event.sortField ?? "",
        event.rows,
        this.searchText ?? ""
      )
      .pipe(take(1))
      .subscribe((data) => {
        this.employeesData = data["rows"];
        this.totalRecords = data["count"];
        this.loading = false;
      });
  }

  searchEmployee(event: any): void {
    if (
      event["target"]["value"].length === 0 ||
      event["target"]["value"].length > 2
    ) {
      this.searchText = event["target"]["value"];
      let sortOrder = "";
      if (this.filterValue.sortOrder == -1) {
        sortOrder = "DESC";
      } else {
        sortOrder = "ASC";
      }

      this.service
        .getAllEmployee(
          this.filterValue.first,
          sortOrder,
          this.filterValue.sortField ?? "",
          this.filterValue.rows,
          this.searchText
        )
        .pipe(take(1))
        .subscribe((data: any) => {
          this.employeesData = data["rows"];
          this.totalRecords = data["count"];
          this.loading = false;
        });
    }
  }

  editEmployee(employee: any): void {
    this.editMode = true;
    this.productDialog = true;

    const obj: Employee = {
      uuid: employee.uuid,
      name: employee.name,
      address: employee.address,
      dateOfBirth: employee.dateOfBirth,
      emailOrTelephone: employee.emailOrTelephone,
    };
    this.formEmployee.patchValue(obj);
  }

  openNew(): void {
    this.productDialog = true;
    this.editMode = false;
    // this.listOfTestVisible = false;
  }

  hideDialog(): void {
    this.productDialog = false;
    // this.listOfTestVisible = false;
    this.formEmployee.reset();
  }

  saveEmployee(): void {
    if (this.formEmployee.invalid) {
      return;
    }
    this.service
      .saveEmployee(this.formEmployee.value, this.editMode)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.alertService.success("Employee added successfully");
          this.productDialog = false;
          this.loading = false;
          this.loadEmployees(this.lastTableLazyLoadEvent);
          this.formEmployee.reset();
        },
        error: (error) => {
          this.alertService.error(error);
          this.productDialog = false;
          this.loading = false;
          this.formEmployee.reset();
        },
      });
  }

  // getTestsForEmployee(uuid: string): void {
  //   this.listOfTestVisible = true;
  //   this.productDialog = true;
  //   this.service
  //     .getTestsForEmployee(uuid)
  //     .pipe(take(1))
  //     .subscribe({
  //       next: (res: any) => {
  //         this.alertService.success("Load all tests for employee");
  //         this.employeeTests = res;
  //         console.log(this.employeeTests);
  //       },
  //       error: (error) => {
  //         this.alertService.error(error);
  //       },
  //     });
  // }

  deleteEmployee(employee: Employee) {
    this.service
      .deleteEmployee(employee.uuid!)
      .pipe(take(1))
      .subscribe({
        next: (el) => {
          this.alertService.success("Employee deleted successfully");
          this.loadEmployees(this.lastTableLazyLoadEvent);
        },
        error: (err) => {
          this.alertService.success(err);
          this.loadEmployees(this.lastTableLazyLoadEvent);
        },
      });
  }
}