import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { User } from '../models/user-model';
import { UserService } from './user.service';
import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class EditUserResolverService implements Resolve<User> {
	constructor(private userService: UserService, private router: Router) {}
	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
		let id = route.paramMap.get('id');
		return this.userService.getUser(id).pipe(
			take(1),
			map((user) => {
				if (user) {
					return user;
				} else {
					this.router.navigate([ '/dashboard', 'users' ]);
					return null;
				}
			})
		);
	}
}
