import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Brand } from '../models/brand';
import { BrandService } from './brand.service';
import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EditBrandResolverService implements Resolve<Brand> {
	constructor(private brandService: BrandService, private router: Router) {}
	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Brand> {
		let id = route.paramMap.get('id');
		return this.brandService.getBrand(id).pipe(
			take(1),
			map((brand) => {
				if (brand) {
					return brand;
				} else {
					this.router.navigate([ '/dashboard', 'brands' ]);
					return null;
				}
			})
		);
	}
}
