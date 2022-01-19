import { OnInit, Component } from "@angular/core";

import { AccountService, AlertService } from "./_services";
import { User } from "./_models";
import { MenuItem } from "primeng/api";
import { adminId } from "./_helpers/constants";
import { LangChangeEvent, TranslateService } from "@ngx-translate/core";
import { LoadingService } from "./_services/loading.service";
import { delay } from "rxjs";

@Component({ selector: "app", templateUrl: "app.component.html" })
export class AppComponent implements OnInit {
  user: User | undefined;
  items: MenuItem[];
  userItems: MenuItem[];
  initials: String = "";
  fullName: String = "";

  loading: boolean = false;

  translateStrings: any;

  constructor(
    private accountService: AccountService,
    private alertService: AlertService,
    private translate: TranslateService,
    private _loading: LoadingService
  ) {
    if (this.localStorageItem("language")) {
      translate.setDefaultLang(localStorage.getItem("language") ?? "de");
    } else {
      translate.setDefaultLang("de");
    }
    translate.addLangs(["en", "de"]);

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

    this.userItems = [];
    this.items = [];

    this.translate.get("main").subscribe((data: any) => {
      this.translateStrings = data;
      this.items = this.getMenu();
      this.userItems = this.getUserOptions();
    });
  }

  ngOnInit(): void {
    this.listenToLoading();
    this.accountService.user.subscribe({
      next: (user: User) => {
        this.items = this.getMenu();
      },
    });

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.translateStrings = event.translations.main;
      this.items = this.getMenu();
      this.userItems = this.getUserOptions();
    });
  }

  logout() {
    this.accountService.logout();
  }

  getUserOptions() {
    return [
      {
        label: this.translateStrings?.userOptions,
        items: [
          {
            label: this.translateStrings?.changeLanguage,
            command: () => this.changeLanguage(),
            icon: "pi pi-fw pi-globe",
          },
          {
            label: this.translateStrings?.logOut,
            command: () => this.logout(),
            icon: "pi pi-fw pi-power-off",
          },
        ],
      },
    ];
  }

  getMenu() {
    return [
      {
        label: "Covid Tests",
        icon: "pi pi-fw pi-pencil",
        routerLink: "/covid-tests",
      },
      {
        label: this.translateStrings?.candidates,
        icon: "pi pi-fw pi-user",
        routerLink: "/employees",
      },
      {
        label: this.translateStrings?.users,
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

  changeLanguage(): void {
    this.translate.use(this.translateStrings.languageToChange);
    localStorage.setItem("language", this.translateStrings.languageToChange);
  }

  listenToLoading(): void {
    this._loading.loadingSub
      .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
      .subscribe((loading) => {
        this.loading = loading;
      });
  }
}
