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
        items: [
          {
            label: "New",
            icon: "pi pi-fw pi-plus",
            routerLink: "/covid-tests/form",
          },
          {
            separator: true,
          },
          {
            label: "List of result",
            icon: "pi pi-fw pi-list",
            routerLink: "/covid-tests",
          },
        ],
      },
      {
        label: "Candidate",
        icon: "pi pi-fw pi-user",
        items: [
          {
            label: "New",
            icon: "pi pi-fw pi-user-plus",
            routerLink: "/users/add",
            routerLinkActiveOptions: "active",
          },
          {
            separator: true,
          },
          {
            label: "List of Candidates",
            icon: "pi pi-fw pi-list",
            routerLink: "/users",
            routerLinkActiveOptions: "active",
          },
        ],
      },
      {
        label: "Users",
        icon: "pi pi-fw pi-user",
        items: [
          {
            label: "New",
            icon: "pi pi-fw pi-user-plus",
            routerLink: "/users/add",
            routerLinkActiveOptions: "active",
          },
          {
            separator: true,
          },
          {
            label: "List of users",
            icon: "pi pi-fw pi-list",
            routerLink: "/users",
            routerLinkActiveOptions: "active",
          },
        ],
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
