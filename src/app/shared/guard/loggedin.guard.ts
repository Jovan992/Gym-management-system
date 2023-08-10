import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";


@Injectable({
  providedIn: 'root'
})

class LoggedInGuard {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      return inject(AuthService).loggedIn;
  }
}

export const isUserLoggedInGuard = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean => {
  return inject(LoggedInGuard).canActivate(route, state)
};

