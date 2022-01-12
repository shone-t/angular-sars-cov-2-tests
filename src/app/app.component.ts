import { OnInit, Component } from "@angular/core";

import { AccountService, AlertService } from "./_services";
import { User } from "./_models";
import { MenuItem } from "primeng/api";
import { adminId } from "./_helpers/constants";

@Component({ selector: "app", templateUrl: "app.component.html" })
export class AppComponent implements OnInit {
  user: User | undefined;
  items: MenuItem[];
  userItems: MenuItem[];
  initials: String = "";
  fullName: String = "";

  constructor(
    private accountService: AccountService,
    private alertService: AlertService
  ) {
    this.initials =
      localStorage.getItem("user") === null
        ? ""
        : JSON.parse(localStorage.getItem("user")!)
            .name.split(" ")
            .map((n: any) => n[0])
            .join("")
            .toUpperCase();
    this.fullName =
      localStorage.getItem("user") === null
        ? ""
        : JSON.parse(localStorage.getItem("user")!).name;
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

    this.items = this.getMenu();
  }

  ngOnInit(): void {
    this.accountService.user.subscribe({
      next: (user: User) => {
        this.items = this.getMenu();
      },
    });
  }

  logout() {
    this.accountService.logout();
  }

  getMenu() {
    return [
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
        visible: this.getUuid() === adminId,
      },
    ];
  }

  public localStorageItem(id: string): string | null {
    return localStorage.getItem(id);
  }

  public getInitials(): string | null {
    return localStorage.getItem("user") === null
      ? ""
      : JSON.parse(localStorage.getItem("user")!)
          .name.split(" ")
          .map((n: any) => n[0])
          .join("")
          .toUpperCase();
  }

  public getFullName(): string | null {
    return localStorage.getItem("user") === null
      ? ""
      : JSON.parse(localStorage.getItem("user")!).name;
  }

  public getRole(): string | null {
    return localStorage.getItem("user") === null
      ? "user"
      : JSON.parse(localStorage.getItem("user")!).role;
  }

  public getUuid(): string | null {
    return localStorage.getItem("user") === null
      ? "user"
      : JSON.parse(localStorage.getItem("user")!).uuid;
  }
}
