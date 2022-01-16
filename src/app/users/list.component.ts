import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LazyLoadEvent } from "primeng/api";
import { first } from "rxjs/operators";
import { User } from "../_models";
import { AlertService } from "./../_services/alert.service";

import { AccountService } from "../_services";
import {
  ConfirmationService,
  ConfirmEventType,
  MessageService,
} from "primeng/api";
import { adminId } from "../_helpers/constants";

@Component({
  templateUrl: "list.component.html",
  styleUrls: ["./users.component.scss"],
})
export class ListComponent {
  users: User[] | undefined;
  value: Date = new Date();

  // new design
  productDialog: boolean = false;
  editMode = false;
  loading: boolean = true;
  filterValue: LazyLoadEvent = {};
  totalRecords: number = 0;
  selectedTest: any[] = [];
  usersData: any[] = [];
  formUser: FormGroup;

  lastTableLazyLoadEvent: LazyLoadEvent = {};

  constructor(
    private accountService: AccountService,
    private _formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
    private alertService: AlertService,
    private messageService: MessageService
  ) {
    this.formUser = this._formBuilder.group({
      uuid: [""],
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      username: ["", Validators.required],
      password: [""],
      confirmPassword: [""],
    });
  }

  deleteUser(id: string) {
    this.confirmationService.confirm({
      message: "Do you want to delete this record?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      accept: () => {
        this.messageService.add({
          severity: "info",
          summary: "Confirmed",
          detail: "Record deleted",
        });
        this.deleteUserFunction(id);
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

  // convenience getter for easy access to form fields
  get f() {
    return this.formUser.controls;
  }

  deleteUserFunction(id: string): void {
    const user = this.usersData!.find((x) => x.uuid === id);
    // user.isDeleting = true;
    this.accountService
      .delete(id)
      .pipe(first())
      .subscribe(() => this.loadUsers(this.lastTableLazyLoadEvent));
  }

  openNew(): void {
    this.productDialog = true;
    this.editMode = false;
    this.f["password"].addValidators([Validators.required, Validators.min(8)]);
    this.f["confirmPassword"].addValidators([
      Validators.required,
      Validators.min(8),
    ]);
  }

  hideDialog(): void {
    this.productDialog = false;
    this.editMode = false;
    this.formUser.reset();
  }

  loadUsers(event: any) {
    this.lastTableLazyLoadEvent = event;
    this.loading = true;
    this.filterValue = event;
    let sortOrder = "";
    if (event.sortOrder == -1) {
      sortOrder = "DESC";
    } else {
      sortOrder = "ASC";
    }

    this.accountService
      .getAll()
      .pipe(first())
      .subscribe((data) => {
        this.usersData = data.filter((user) => user.uuid !== adminId);
        this.loading = false;
      });
  }

  searchUser(event: any): void {}

  editUser(user: any): void {
    this.editMode = true;
    this.productDialog = true;
    this.f["password"].clearValidators();
    this.f["confirmPassword"].clearValidators();
    const obj: User = {
      uuid: user.uuid,
      name: user.name,
      email: user.email,
      username: user.username,
      password: "",
      confirmPassword: "",
    };
    this.formUser.patchValue(obj);
  }

  saveUser(): void {
    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.formUser.invalid) {
      return;
    }

    this.loading = true;
    if (this.editMode) {
      this.accountService
        .update(this.formUser.value.uuid, this.formUser.value)
        .pipe(first())
        .subscribe({
          next: () => {
            this.alertService.success("Update successful");
            this.loadUsers(this.lastTableLazyLoadEvent);
            this.hideDialog();
            // this.router.navigate(["../../"], { relativeTo: this.route });
          },
          error: (error) => {
            this.alertService.error(error);
            this.loading = false;
          },
        });
    } else {
      this.accountService
        .register(this.formUser.value)
        .pipe(first())
        .subscribe({
          next: () => {
            this.alertService.success("Registration successful");
            // this.alertService.success("Update successful");
            this.loadUsers(this.lastTableLazyLoadEvent);
            this.hideDialog();
            // this.router.navigate(["../login"], { relativeTo: this.route });
          },
          error: (error) => {
            this.alertService.error(error);
            this.loading = false;
          },
        });
    }
  }
}
