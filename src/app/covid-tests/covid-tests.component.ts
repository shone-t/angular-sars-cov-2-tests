import { AlertService } from "./../_services/alert.service";
import { map, take } from "rxjs/operators";
import { Observable } from "rxjs";
import { Component, OnInit, ViewChild } from "@angular/core";
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
import { Table } from "primeng/table";
import { LangChangeEvent, TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-covid-tests",
  templateUrl: "./covid-tests.component.html",
  styleUrls: ["./covid-tests.component.scss"],
})
export class CovidTestsComponent implements OnInit {
  @ViewChild("dt") private dataTable?: Table;
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

  translateStrings: any;

  buttonItems = [
    {
      icon: "pi pi-pencil",
      command: () => {
        // this.editTest(covidTest);
      },
    },
    {
      icon: "pi pi-download",
      command: () => {
        // confirmation("download", covidTest.uuid);
      },
    },
    {
      icon: "pi pi-envelope",
      command: () => {
        // confirmation("mail", covidTest.uuid);
      },
    },
  ];

  constructor(
    private covidTestService: CovidTestsService,
    private employees: CandidatesService,
    private _formBuilder: FormBuilder,
    private alertService: AlertService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private translate: TranslateService
  ) {
    this.translate.get("covidTest").subscribe((data: any) => {
      this.translateStrings = data;
    });
    this.formCovidTest = this._formBuilder.group({});
    this.createForm();
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

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.translateStrings = event.translations.covidTest;
    });
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
    this.dateLock = true;
    this.formCovidTest.reset();
    this.createForm();
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
      employeeId: event.employeeId,
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
          this.dataTable?.clear();
        });
    }
  }

  createForm(): void {
    this.formCovidTest = this._formBuilder.group({
      uuid: [""],
      name: ["", Validators.required],
      address: ["", Validators.required],
      dateOfBirth: ["", Validators.required],
      emailOrTelephone: ["", [Validators.required, Validators.email]],
      idUser: [""],
      employeeId: ["0"],
      userName: [""],
      testResult: [undefined, Validators.required],
      createdTest: [new Date(), Validators.required],
      internalMessage: [""],
    });
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
      employeeId: event.uuid,
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

  printCovidTest(covidTest: any) {
    this.covidTestService
      .printAndDownloadTest(covidTest.uuid)
      .pipe(take(1))
      .subscribe({
        next: (file) => {
          const blob = new Blob([file], { type: "application/pdf" });
          const downloadUrl = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = downloadUrl;
          link.download = `Covid-Test ${covidTest.name} ${new Date(
            covidTest.createdTest
          ).toLocaleString(["de-DE"], { dateStyle: "medium" })}.pdf`;
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

  confirmation(type: string, covidtest: any) {
    this.confirmationService.confirm({
      message:
        type === "download"
          ? this.translateStrings["downloadMessage"]
          : this.translateStrings["emailMessage"],
      header:
        type === "download"
          ? this.translateStrings["downloadConfirmation"]
          : this.translateStrings["emailConfirmation"],
      icon: "pi pi-info-circle",
      acceptLabel: this.translateStrings["yes"],
      rejectLabel: this.translateStrings["no"],
      accept: () => {
        this.messageService.add({
          severity: "info",
          summary: "Confirmed",
          detail: "Record deleted",
        });
        if (type === "download") {
          this.printCovidTest(covidtest);
        } else if (type === "mail") {
          this.sendMailAgain(covidtest.uuid);
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
