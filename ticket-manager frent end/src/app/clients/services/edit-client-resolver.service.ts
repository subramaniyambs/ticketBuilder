import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Client } from '../models/client';
import { ClientService } from './client.service';
import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EditClientResolverService implements Resolve<Client> {
	constructor(private clientService: ClientService, private router: Router) {}
	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Client> {
		let id = route.paramMap.get('id');
		return this.clientService.getClient(id).pipe(
			take(1),
			map((client) => {
				if (client) {
					return client;
				} else {
					this.router.navigate([ '/dashboard', 'clients' ]);
					return null;
				}
			})
		);
	}
}
