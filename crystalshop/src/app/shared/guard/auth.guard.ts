import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(public authService: AuthService, public router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
        if (this.authService.isLoggedIn !== true) {
          window.alert('Access denied, only logged in user can access this page')
          this.router.navigate(['login']);
          
        }
        return true;
      }
    //   if(this.authService.AuthLogin !== null){
    //     this.router.parseUrl("/stock");
    //     return true;
    //   }
    //     window.alert("no")
    //     this.router.parseUrl("/login");
    //     return false;
      
    // }
    } 
    
    //cuando entra false, cuando alert true
//   canActivate() {
//     if (this.authService.isLoggedIn !== null) {
//       this.router.navigate(['/stock']);
//       return true;
//     } else {
//       this.router.navigate(['/login']);
//     }
//     return false;
//   }
// }
/* 

| UrlTree {
      if(this.authService.AuthLogin != null) {
        return true;
      }else{
        this.router.navigate(['login']);
        // this.authService.redirectUrl = state.url;
        // this.router.navigate(['/'])
        return false
        }
    }
    

       | UrlTree {
      if(this.authService.isLoggedIn == null) {
        // alert("lgueae")
        this.router.navigate(['login']);
      }
        // this.authService.redirectUrl = state.url;
        return true
        
    }
*/