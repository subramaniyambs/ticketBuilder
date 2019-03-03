export class User {
	_id: string;
	email: string;
	password: string;
	name: string;
	phone: string;
	address: string

}
export class UserPaginationRsp {
	docs: User[];
	total: number;
	pages: number;
	page: number;
	limit: number;
}

