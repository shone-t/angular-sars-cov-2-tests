import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { first } from "rxjs/operators";

import { AccountService, AlertService } from "../_services";

@Component({
  templateUrl: "verify.component.html",
  styleUrls: ["./account.component.scss"],
})
export class VerifyComponent implements OnInit {
  loading = false;
  submitted = false;
  email = "";
  resendAgain = false;

  constructor(
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService
  ) {
    if (
      this.router &&
      this.router.getCurrentNavigation() &&
      this.router.getCurrentNavigation()?.extras &&
      this.router.getCurrentNavigation()?.extras?.state
    ) {
      this.email = this.router.getCurrentNavigation()?.extras?.state!["email"];
    } else {
      this.router.navigate(["./login"]);
    }
  }

  ngOnInit() {
    setTimeout(() => {
      this.resendAgain = true;
    }, 3000);
  }

  sendAgainMail() {
    this.loading = true;
    this.accountService
      .resetPasswordEmail(this.email)
      .pipe(first())
      .subscribe({
        next: () => {
          // get return url from query parameters or default to home page
          this.alertService.success("Email successfully send");
          setTimeout(() => {
            // const returnUrl =
            //   this.route.snapshot.queryParams["returnUrl"] || "/";
            // this.router.navigateByUrl(returnUrl);
            this.loading = false;
          }, 3000);
        },
        error: (error) => {
          this.alertService.error(error);
          this.loading = false;
        },
      });
  }
}
