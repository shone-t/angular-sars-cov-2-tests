import { Employee } from "./../_models/employee";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { UrlBuilder } from "../_helpers";
import { QueryStringParameters } from "../_helpers/query-string-parameters";

@Injectable({
  providedIn: "root",
})
export class CandidatesService {
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/employees/list`);
  }

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

  getAllEmployee(
    limit: any,
    sortOrder: any,
    sortField: any,
    rows?: any,
    filter?: any
  ): Observable<any> {
    return this.http.get(
      this.createUrlWithQueryParameters(
        "employees",
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

  saveEmployee(employee: Employee, edit: boolean): Observable<any> {
    if (edit) {
      return this.http
        .put(`${environment.apiUrl}/employees/${employee.uuid}`, employee)
        .pipe(tap((res) => console.log("service res:", res)));
    } else {
      return this.http
        .post(`${environment.apiUrl}/employees`, employee)
        .pipe(tap((res) => console.log("service res:", res)));
    }
  }
}
