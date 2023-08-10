import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";


@Injectable({
  providedIn: 'root'
})

class LoggedOutGuard {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      return !inject(AuthService).loggedIn;
  }
}

export const isUserLoggedOutGuard = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean => {
  return inject(LoggedOutGuard).canActivate(route, state)
};
