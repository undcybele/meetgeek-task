import {CanActivate, Router} from "@angular/router";
import {Injectable} from "@angular/core";
import {UserService} from "./services/user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate  {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(): boolean {
    if (this.userService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/']).then();
      return false;
    }
  }

}
