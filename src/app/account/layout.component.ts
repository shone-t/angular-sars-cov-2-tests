import { DOCUMENT } from "@angular/common";
import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from "@angular/core";
import { Router } from "@angular/router";

import { AccountService } from "../_services";

@Component({
  templateUrl: "layout.component.html",
  styleUrls: ["./layout.component.scss"],
  encapsulation: ViewEncapsulation.Emulated,
})
export class LayoutComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private accountService: AccountService,
    @Inject(DOCUMENT) private document: Document
  ) {
    // redirect to home if already logged in
    if (this.accountService.userValue) {
      this.router.navigate(["/"]);
    }
  }

  ngOnInit(): void {
    this.addBodyClass(true);
  }

  ngOnDestroy(): void {
    this.addBodyClass(false);
  }

  addBodyClass(flag: boolean): void {
    flag
      ? this.document.body.classList.add("account-page")
      : this.document.body.classList.remove("account-page");
  }
}
