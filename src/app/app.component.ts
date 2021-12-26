import { Component } from "@angular/core";

import { AccountService, AlertService } from "./_services";
import { User } from "./_models";
import { MenuItem } from "primeng/api";

@Component({ selector: "app", templateUrl: "app.component.html" })
export class AppComponent {
  user: User | undefined;
  items: MenuItem[];
  userItems: MenuItem[];
  initials: String;
  fullName: String;

  constructor(private accountService: AccountService,  private alertService: AlertService) {
    this.initials = JSON.parse(localStorage.getItem("user")!)
      .name.split(" ")
      .map((n: any) => n[0])
      .join("")
      .toUpperCase();
    this.fullName = JSON.parse(localStorage.getItem("user")!).name;
    this.accountService.user.subscribe((x) => (this.user = x));

    this.userItems = [
      {
        label: "User options",
        items: [
          {
            label: "Logout",
            command: () => this.logout(),
            icon: "pi pi-fw pi-power-off",
          },
        ],
      },
    ];

    this.items = [
      {
        label: "Covid Tests",
        icon: "pi pi-fw pi-pencil",
        routerLink: "/covid-tests",
      },
      {
        label: "Candidate",
        icon: "pi pi-fw pi-user",
        routerLink: "/employees",
      },
      {
        label: "Users",
        icon: "pi pi-fw pi-user",
        routerLink: "/users",
      },
      
    ];
  }

  logout() {
    this.accountService.logout();
  }
}
