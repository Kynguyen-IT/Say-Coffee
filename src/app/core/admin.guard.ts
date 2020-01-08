import { AuthUserService } from "src/app/core/services/services-user/auth-user.service";
import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import { tap, map, take } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AdminGuard implements CanActivate {
  constructor(private service: AuthUserService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.service.user$.pipe(
      take(1),
      map(user => (user && user.roles.admin ? true : false)),
      tap(isAdmin => {
        if (!isAdmin) {
          console.error("Admin only");
          this.router.navigate(["/list"]);
        }
      })
    );
  }
}
