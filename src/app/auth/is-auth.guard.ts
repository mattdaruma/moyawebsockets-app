import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { first, map, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IsAuthGuard implements CanLoad {
  constructor(private auth: AuthService, private router: Router){}
  canLoad(route: Route, segments: UrlSegment[], ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.auth.authenticated$.pipe(map(isAuthed => {
      if(isAuthed) return true
      else return this.router.parseUrl("/auth") as UrlTree
    }))
  }
}