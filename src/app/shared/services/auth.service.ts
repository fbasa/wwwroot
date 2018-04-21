import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators/tap';
import { environment } from '../../../environments/environment'

@Injectable()
export class AuthService {

    currentToken: string;

    constructor(private http: HttpClient) {
    }

    getToken(): string {
      return localStorage.getItem('jwt');
    }

    authenticate(item) : Observable<any> {

        const httpOptions = {
          headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
        };
        const body = new HttpParams()
                  .set(`username`, item.Username)
                  .set(`password`, item.Password)
                  .set(`client_id`,'eaed12f8-e6a0-48aa-8f2e-f76123b40e52')
                  .set(`client_secret`,'attendance@web20!8')
                  .set(`grant_type`,'password');
                  
        return this.http.post(environment.endPoint + 'oauth/token',body, httpOptions)
        .pipe(
            tap((jwt : any) => {
              // localStorage.setItem('jwt',jwt.access_token);
              // localStorage.setItem('jwt_rt',jwt.refresh_token);
              this.currentToken = jwt.access_token;
            }));
    }  
  
  refreshToken() : Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
    };
    const body = new HttpParams()
              .set(`refresh_token`,localStorage.getItem('jwt_rt'))
              .set(`client_id`,'eaed12f8-e6a0-48aa-8f2e-f76123b40e52')
              .set(`client_secret`,'attendance@web20!8')
              .set(`grant_type`,'refresh_token');
              
    return this.http.post(environment.endPoint + 'oauth/token',body, httpOptions)
    .pipe(
        tap((jwt : any) => {
          localStorage.setItem('jwt',jwt.access_token);
          localStorage.setItem('jwt_rt',jwt.refresh_token); //TODO: need better way to secure this,
          this.currentToken = jwt.access_token;
        }));

  }  


}