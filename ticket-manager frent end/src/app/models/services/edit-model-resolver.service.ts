import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { ModelService } from './model.service';
import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { Model } from '../models/model';

@Injectable()
export class EditModelResolverService implements Resolve<Model> {
	constructor(private modelService: ModelService, private router: Router) {}
	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Model> {
		let id = route.paramMap.get('id');
		return this.modelService.getModel(id).pipe(
			take(1),
			map((model) => {
				if (model) {
					return model;
				} else {
					this.router.navigate([ '/dashboard', 'models' ]);
					return null;
				}
			})
		);
	}
}
