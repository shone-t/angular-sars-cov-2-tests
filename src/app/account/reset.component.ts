import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { first } from "rxjs/operators";

import { AccountService, AlertService } from "../_services";

@Component({
  templateUrl: "reset.component.html",
  styleUrls: ["./account.component.scss"],
})
export class ResetComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  token: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService
  ) {
    this.form = this.formBuilder.group({
      password: ["", [Validators.required, Validators.minLength(8)]],
      confirmPassword: ["", [Validators.required, Validators.minLength(8)]],
    });
    if (this.route.snapshot.paramMap.get("token")) {
      this.token = this.route.snapshot.paramMap.get("token");
    } else {
      this.router.navigate(["./login"]);
    }
  }

  ngOnInit() {}

  // convenience getter for easy access to form fields
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.accountService
      .resetPassword(this.token, this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success("Password successfull reseted.");
          setTimeout(() => {
            this.router.navigate(["./login"]);
          }, 3000);
        },
        error: (error) => {
          this.alertService.error(error);
          this.loading = false;
        },
      });
  }
}
