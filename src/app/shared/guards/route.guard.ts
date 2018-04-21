import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { tokenNotExpired} from 'angular2-jwt';

@Injectable()
export class RouteGuard implements CanActivate {
    constructor(private router: Router) {}

    // TODO: uncomment to enable route guard

    canActivate() {
        // if (tokenNotExpired('jwt')) {
        //     return true;
        // }
        
        // this.router.navigate(['/login']);
        // return false;

        return true;
    } 
}
