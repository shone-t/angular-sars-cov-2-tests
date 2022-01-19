import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from "@angular/common/http";

// used to create fake backend
// import { fakeBackendProvider } from "./_helpers";

import { AppRoutingModule } from "./app-routing.module";
import {
  JwtInterceptor,
  ErrorInterceptor,
  HttpRequestInterceptor,
} from "./_helpers";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AvatarModule } from "primeng/avatar";
import { MenubarModule } from "primeng/menubar";
import { MenuModule } from "primeng/menu";
import { ButtonModule } from "primeng/button";
import { MessagesModule } from "primeng/messages";
import { MessageModule } from "primeng/message";
import { ToastModule } from "primeng/toast";
import { MessageService } from "primeng/api";
import { HashLocationStrategy, LocationStrategy } from "@angular/common";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HomeModule } from "./home/home.module";
import { ProgressSpinnerModule } from "primeng/progressspinner";

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MenubarModule,
    MenuModule,
    ButtonModule,
    AvatarModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    HomeModule,
    HttpClientModule,
    ProgressSpinnerModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  declarations: [AppComponent],
  providers: [
    MessageService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true,
    },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    // provider used to create fake backend
    // fakeBackendProvider,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
