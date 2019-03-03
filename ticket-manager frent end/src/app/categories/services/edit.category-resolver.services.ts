import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Category } from '../models/category';
import { CategoryService } from './category.service';
import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EditCategoryResolverService implements Resolve<Category> {
	constructor(private categoryService: CategoryService, private router: Router) {}
	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Category> {
		let id = route.paramMap.get('id');
		return this.categoryService.getCategory(id).pipe(
			take(1),
			map((category) => {
				if (category) {
					return category;
				} else {
					this.router.navigate([ '/dashboard', 'categories' ]);
					return null;
				}
			})
		);
	}
}
