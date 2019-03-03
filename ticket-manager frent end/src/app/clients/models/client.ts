export class Client {
	_id: string;
	name: string;
	address: string;
	post: string;
	city: string;
	phone: string;
	email: string;
	siren: string;
	tva: string;
}
export class ClientPaginationRsp {
	docs: Client[];
	total: number;
	pages: number;
	page: number;
	limit: number;
}
