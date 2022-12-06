import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { filter, map, Observable, take } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  constructor(private auth: AuthenticationService, private router: Router) {}

  canLoad(): Observable<boolean> {
    return this.auth.isAuthenticated.pipe(
      filter((val) => val !== null),
      take(1),
      map((isAuthenticated: any) => {
        if (isAuthenticated === true) {
          console.log('sudah login');
          return true;
        } else {
          this.router.navigateByUrl('login', { replaceUrl: true });
          console.log('belum login');
          return false;
        }
      })
    );
  }
}
