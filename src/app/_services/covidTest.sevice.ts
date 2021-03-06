import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { QueryStringParameters } from "../_helpers/query-string-parameters";
import { UrlBuilder } from "../_helpers/url-builder";
import { CovidTest } from "../_models";

@Injectable()
export class CovidTestsService {
  constructor(private http: HttpClient) {}

  private createUrlWithQueryParameters(
    action: string,
    queryStringHandler?: (queryStringParameters: QueryStringParameters) => void
  ): string {
    const urlBuilder: UrlBuilder = new UrlBuilder(environment.apiUrl, action);
    // Push extra query string params
    if (queryStringHandler) {
      queryStringHandler(urlBuilder.queryString);
    }
    return urlBuilder.toString();
  }

  // getAllEmployees(): Observable<any> {
  //   return this.http.get(`${environment.apiUrl}/employees`);
  // }

  getAllTest(
    limit: any,
    sortOrder: any,
    sortField: any,
    rows?: any,
    filter?: any
  ): Observable<any> {
    return this.http.get(
      this.createUrlWithQueryParameters(
        "covid-tests",
        (qs: QueryStringParameters) => {
          qs.push("limit", limit);
          qs.push("rows", rows);
          qs.push("sortOrder", sortOrder);
          qs.push("sortField", sortField);
          qs.push("filter", filter);
        }
      )
    );
  }

  saveTest(testData: CovidTest, edit: boolean): Observable<any> {
    if (edit) {
      return this.http.put(
        `${environment.apiUrl}/covid-tests/${testData.uuid}`,
        testData
      );
    } else {
      return this.http.post(`${environment.apiUrl}/covid-tests`, testData);
    }
  }

  // /download-test

  printAndDownloadTest(uuid: string): Observable<any> {
    return this.http.get(
      `${environment.apiUrl}/covid-tests/download-test?id=${uuid}`,
      {
        responseType: "blob",
      }
    );
  }

  sendMailAgain(uuid: string): Observable<any> {
    return this.http.get(
      `${environment.apiUrl}/covid-tests/resend-email?id=${uuid}`
    );
  }
}
