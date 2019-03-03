import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'filter'
})
export class FilterPipe implements PipeTransform {
	// transform(tickets: any, term: any): any {
	// 	//check in search term is undefined
	// 	if (term === undefined) return tickets;
	// 	// return updated tickets array
	// 	return tickets.filter(function(ticket) {
	// 		return ticket.model.toLowerCase().includes(term.toLowerCase());
	// 	});
	// }
	transform(items: any[], filterdata: string): any[] {
		if (!items) return [];
		if (!filterdata) return items;
		console.log(filterdata);
		filterdata = filterdata.toString().toLowerCase();
		return items.filter((it) => {
			console.log(it);
			return it.name.toLowerCase().includes(filterdata);
		});
	}
}
