
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import { AuthService } from './auth.service'
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router'
//import * as shared from '../../shared/interfaces/'
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { filter } from 'rxjs/operators/filter';
import { take } from 'rxjs/operators/take';
import { tap } from 'rxjs/operators/tap';
import {MessageService} from 'primeng/components/common/messageservice';

@Injectable()
export class JwtInterceptorService implements HttpInterceptor {

  appError: any;//shared.AppError;
  isRefreshingToken: boolean = false;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(
    private injector: Injector,
    private route: Router
  ) { }

  handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    let authService = this.injector.get(AuthService);

    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;
      this.tokenSubject.next(null);
      authService.refreshToken()
        .subscribe((jwt: any) => {
          this.isRefreshingToken = false;
          if (jwt.access_token) {
            this.tokenSubject.next(jwt.access_token);
          }
        }, e => {
          this.isRefreshingToken = false;
        })
    } else {
      this.tokenSubject
        .pipe(
          filter(token => token != null),
          take(1)
        ).subscribe(token => {});
    }
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        tap((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            // do stuff with response if you want
          }
        },
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
  
            let msgService = this.injector.get(MessageService);
  
            if (err.status === 401) {
              // not authenticated
              this.handle401Error(request, next);
  
            } else if (err.status === 403) {
              // not authorize
              this.route.navigate(['/access-denied']);
  
            } else if (err.status == 400) {
              // bad request
  
              // validation errors
              let validationErr: any = err.error;
              for (var msg in validationErr.ModelState) {
                msgService.add({severity:'error', summary:'', detail:validationErr.ModelState[msg]})
              }
              if (validationErr.Code)
                msgService.add({severity:'error', summary:'', detail:validationErr.Message})
  
              // invalid ids
              if (err.error && err.error.Message) {
                let msg: string = err.error.Message;
  
                //if(msg.startsWith('Constraint:'))
                //toastr.error(err.error.Message);
              }
  
              //console.log(err.error)
  
            } else if (err.status == 404) {
              // not found
              this.appError = err.error;
              msgService.add({severity:'error', summary:'', detail:this.appError.Message})
  
            } else if (err.status == 500) {
              // internal server error
              this.appError = err.error;
              this.route.navigate(['/server-error'], {
                queryParams: {
                  id: this.appError.LogId
                }
              });
            } else {
              // unknown
              //console.log(err.status)
              this.route.navigate(['/unknown-error']);
            }
          }
        })
      )
      
  }
}