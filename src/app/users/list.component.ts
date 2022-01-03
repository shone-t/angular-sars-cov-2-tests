import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LazyLoadEvent } from "primeng/api";
import { first } from "rxjs/operators";
import { User } from "../_models";

import { AccountService } from "../_services";
import {
  ConfirmationService,
  ConfirmEventType,
  MessageService,
} from "primeng/api";

@Component({
  templateUrl: "list.component.html",
  styleUrls: ["./users.component.scss"],
})
export class ListComponent implements OnInit {
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

  constructor(
    private accountService: AccountService,
    private _formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.formUser = this._formBuilder.group({
      uuid: [""],
      name: ["", Validators.required],
      email: ["", [Validators.required]],
      username: ["", Validators.required],
      password: ["", Validators.required],
      confirmPass: ["", Validators.required],
    });
  }

  ngOnInit() {
    this.accountService
      .getAll()
      .pipe(first())
      .subscribe((users) => (this.users = users));
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

  deleteUserFunction(id: string): void {
    const user = this.users!.find((x) => x.uuid === id);
    // user.isDeleting = true;
    this.accountService
      .delete(id)
      .pipe(first())
      .subscribe(() => (this.users = this.users!.filter((x) => x.uuid !== id)));
  }

  openNew(): void {
    this.productDialog = true;
    this.editMode = false;
  }

  hideDialog(): void {
    this.productDialog = false;
    this.formUser.reset();
  }

  loadUsers(event: any) {
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
        this.usersData = data;
        this.loading = false;
      });
  }

  searchUser(event: any): void {}

  editUser(user: any): void {
    this.editMode = true;
    this.productDialog = true;

    const obj: User = {
      uuid: user.uuid,
      name: user.name,
      username: user.username,
      password: user.password,
      email: user.email,
    };
    this.formUser.patchValue(obj);
  }

  saveUser(): void {
    // if (this.formUser.invalid) {
    //   return;
    // }
    // this.service
    //   .saveUser(this.formUser.value, this.editMode)
    //   .pipe(take(1))
    //   .subscribe({
    //     next: () => {
    //       this.alertService.success("User added successfully");
    //       this.productDialog = false;
    //       this.loading = false;
    //       this.loadUsers(this.lastTableLazyLoadEvent);
    //       this.formUser.reset();
    //     },
    //     error: (error) => {
    //       this.alertService.error(error);
    //       this.productDialog = false;
    //       this.loading = false;
    //       this.formUser.reset();
    //     },
    //   });

    this.accountService
      .update(this.formUser.value.uuid, this.formUser.value)
      .pipe(first())
      .subscribe({
        next: () => {
          // this.alertService.success("Update successful");
          // this.router.navigate(["../../"], { relativeTo: this.route });
        },
        error: (error) => {
          // this.alertService.error(error);
          this.loading = false;
        },
      });
  }
}
