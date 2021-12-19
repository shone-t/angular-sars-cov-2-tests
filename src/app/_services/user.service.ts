import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  /**
   * Get all users
   * @returns
   */
  getAllUsers(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/users`);
  }
}
