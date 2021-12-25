import { Component } from "@angular/core";

import { AccountService } from "./_services";
import { User } from "./_models";
import { MenuItem } from "primeng/api";

@Component({ selector: "app", templateUrl: "app.component.html" })
export class AppComponent {
  user: User | undefined;
  items: MenuItem[];

  constructor(private accountService: AccountService) {
    this.accountService.user.subscribe((x) => (this.user = x));

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
      {
        label: "Quit",
        command: () => this.logout(),
        icon: "pi pi-fw pi-power-off",
      },
    ];
  }

  logout() {
    this.accountService.logout();
  }
}
