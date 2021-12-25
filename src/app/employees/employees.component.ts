import { FormBuilder, Validators } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { LazyLoadEvent } from "primeng/api";
import { Observable, take } from "rxjs";
import { CandidatesService } from "../_services/candidates.service";
import { Employee } from "../_models/employee";
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
      emailOrTelephone: ["", [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {}

  loadEmployees(event: any) {
    this.loading = true;
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
        this.employeesData = data;
        this.totalRecords = data["count"];
        this.loading = false;
      });
  }

  searchEmployee(event: any): void {}

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
  }

  hideDialog(): void {
    this.productDialog = false;
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
        },
        error: (error) => {
          this.alertService.error(error);
          this.productDialog = false;
          this.loading = false;
        },
      });
  }
}
