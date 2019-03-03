import { Task } from './../../tasks/models/task';
import { Model } from './../../models/models/model';
import { Brand } from './../../brands/models/brand';
import { Category } from './../../categories/models/category';
import { Client } from '../../clients/models/client';

export class Ticket {
	_id: string;
	category:Category;
	brand: Brand;
	model: Model;
	task: Task;
	missing: string;
	serial: string;
	usercode: string;
	price: number;
	statuses: string;
	reception_date: Date;
	delivery_date: Date;
	coment: string;
	client: Client;
	status:string;
	clientName:string;
	
}
export class TicketPaginationRsp {
	docs: Ticket[];
	total: number;
	pages: number;
	page: number;
	limit: number;
}
