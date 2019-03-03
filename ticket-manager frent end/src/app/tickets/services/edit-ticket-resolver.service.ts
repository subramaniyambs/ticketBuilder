import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Ticket } from '../models/ticket';
import { TicketService } from './ticket.service';
import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EditTicketResolverService implements Resolve<Ticket> {
	constructor(private ticketService: TicketService, private router: Router) {}
	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Ticket> {
		let id = route.paramMap.get('id');
		return this.ticketService.getTicket(id).pipe(
			take(1),
			map((ticket) => {
				if (ticket) {
					return ticket;
				} else {
					this.router.navigate([ '/dashboard', 'tickets' ]);
					return null;
				}
			})
		);
	}
}
