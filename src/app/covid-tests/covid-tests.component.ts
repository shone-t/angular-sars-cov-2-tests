import { AlertService } from "./../_services/alert.service";
import { map, take } from "rxjs/operators";
import { Observable } from "rxjs";
import { Component, OnInit } from "@angular/core";
// import { CovidTestsService } from "../_services";
import { CovidTestsService } from "../_services/covidTest.sevice";
import {
  ConfirmationService,
  ConfirmEventType,
  LazyLoadEvent,
  MessageService,
} from "primeng/api";
import { CandidatesService } from "../_services/candidates.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CovidTest } from "../_models";

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
  searchText: string = "";

  autoCompleteText: any[] = [];
  autoCompleteResults: any[] = [];

  listOfEmployees: any[] = [];

  formCovidTest: FormGroup;
  dateLock = true;
  selectedEmployee = false;
  editMode = false;
  lastTableLazyLoadEvent: LazyLoadEvent = {};

  constructor(
    private covidTestService: CovidTestsService,
    private employees: CandidatesService,
    private _formBuilder: FormBuilder,
    private alertService: AlertService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.formCovidTest = this._formBuilder.group({
      uuid: [""],
      name: ["", Validators.required],
      address: ["", Validators.required],
      dateOfBirth: ["", Validators.required],
      emailOrTelephone: ["", [Validators.required, Validators.email]],
      idUser: [""],
      // idEmployee: [""],
      userName: [""],
      testResult: ["", Validators.required],
      createdTest: [new Date(), Validators.required],
      internalMessage: [""],
    });
  }

  ngOnInit(): void {
    this.employees
      .getAllUsers()
      .pipe(take(1))
      .subscribe((data: any) => {
        this.listOfEmployees = data;
      });

    this.statuses = [
      { label: "POSITIVE", value: true },
      { label: "NEGATIVE", value: false },
    ];
  }

  openNew() {
    this.productDialog = true;
    this.editMode = false;
  }

  hideDialog() {
    this.productDialog = false;
  }

  closeDialog(): void {
    this.hideDialog();
    this.selectedEmployee = false;
    this.autoCompleteText = [];
    this.formCovidTest.reset();
  }

  loadTests(event: LazyLoadEvent) {
    this.lastTableLazyLoadEvent = event;
    this.loading = true;
    this.filterValue = event;
    let sortOrder = "";
    if (event.sortOrder == -1) {
      sortOrder = "DESC";
    } else {
      sortOrder = "ASC";
    }

    this.covidTestService
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

  editTest(event: any) {
    this.editMode = true;
    this.productDialog = true;
    this.selectedEmployee = false;
    const obj: CovidTest = {
      uuid: event.uuid,
      name: event.name,
      address: event.address,
      dateOfBirth: event.dateOfBirth,
      emailOrTelephone: event.emailOrTelephone,
      idUser: event.idUser,
      // idEmployee: event.idEmployee,
      userName: event.userName,
      testResult: event.testResult,
      createdTest: new Date(event.createdTest),
    };
    this.formCovidTest.patchValue(obj);
  }

  searchCovidTest(event: any) {
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

      this.covidTestService
        .getAllTest(
          this.filterValue.first,
          sortOrder,
          this.filterValue.sortField ?? "",
          this.filterValue.rows,
          this.searchText
        )
        .pipe(take(1))
        .subscribe((data: any) => {
          this.covidTestsData = data["rows"];
          this.totalRecords = data["count"];
          this.loading = false;
        });
    }
  }

  autoCompleteSearch(event: any) {
    this.autoCompleteResults = [];
    this.listOfEmployees.filter((item) => {
      item.name.toLowerCase().indexOf(event.query.toLowerCase()) >= 0
        ? this.autoCompleteResults.push(item)
        : null;
    });
  }

  handleDropdown(event: any) {
    //event.query = current value in input field
    this.selectedEmployee = true;
    const obj: CovidTest = {
      name: event.name,
      address: event.address,
      dateOfBirth: event.dateOfBirth,
      emailOrTelephone: event.emailOrTelephone,
      idUser: event.idUser,
      // idEmployee: event.uuid,
      userName: event.userName,
      testResult: undefined,
      createdTest: new Date(),
    };
    this.formCovidTest.patchValue(obj);
  }

  saveCovidTest(): void {
    if (this.formCovidTest.invalid) {
      return;
    }
    const userFromStorage = localStorage.getItem("user");
    if (userFromStorage) {
      const userFromStorageObj = JSON.parse(userFromStorage);

      this.formCovidTest.get("idUser")?.patchValue(userFromStorageObj?.uuid);
      this.formCovidTest
        .get("userName")
        ?.patchValue(userFromStorageObj?.username);
    } else {
      this.alertService.error("User doesnt exists");
      return;
    }
    this.covidTestService
      .saveTest(this.formCovidTest.value, this.editMode)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.alertService.success("Test added successfully");
          this.productDialog = false;
          this.loading = false;
          this.loadTests(this.lastTableLazyLoadEvent);
          this.formCovidTest.reset();
        },
        error: (error) => {
          this.alertService.error(error);
          this.productDialog = false;
          this.loading = false;
          this.formCovidTest.reset();
        },
      });
  }

  dateDisabled(): void {
    this.dateLock = !this.dateLock;
  }

  dateNow(): void {
    this.formCovidTest.get("createdTest")?.patchValue(new Date());
  }

  printCovidTest(id: string) {
    console.log("printCovidTest", id);
    this.covidTestService
      .printAndDownloadTest(id)
      .pipe(take(1))
      .subscribe({
        next: (file) => {
          const blob = new Blob([file], { type: "application/pdf" });
          const downloadUrl = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = downloadUrl;
          link.download = "TestPdf.pdf";
          link.click();
        },
      });
  }

  sendMailAgain(id: string) {
    console.log("sandMailAgain", id);
    this.covidTestService
      .sendMailAgain(id)
      .pipe(take(1))
      .subscribe({
        next: (res) => this.alertService.success("Email send..."),
        error: (err) => this.alertService.error(err),
      });
  }

  confirmation(type: string, id: string) {
    this.confirmationService.confirm({
      message: `Do you want to ${
        type === "download" ? "download" : "send mail"
      }?`,
      header: `${type === "download" ? "Download" : "Send mail"} Confirmation`,
      icon: "pi pi-info-circle",
      accept: () => {
        this.messageService.add({
          severity: "info",
          summary: "Confirmed",
          detail: "Record deleted",
        });
        if (type === "download") {
          this.printCovidTest(id);
        } else if (type === "mail") {
          this.sendMailAgain(id);
        }
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: "error",
              summary: "Rejected",
              detail: "You have rejected",
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: "warn",
              summary: "Cancelled",
              detail: "You have cancelled",
            });
            break;
        }
      },
    });
  }
}
