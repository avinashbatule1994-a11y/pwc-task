import { Injectable } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { Observable } from "rxjs";
import { CanActivate, Router } from "@angular/router";

@Injectable({providedIn:'root'})
export class AuthGuard implements CanActivate{
constructor (private auth:AuthService,private router:Router){}

canActivate():boolean {
    if(!this.auth.isLoggedIn()){
        this.router.navigate(['/auth/login'])
        return false
    }
    return true
}
}