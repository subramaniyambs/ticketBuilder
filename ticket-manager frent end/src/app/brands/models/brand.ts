export class Brand {
	_id: string;
	name: string;
}
export class BrandPaginationRsp {
	docs: Brand[];
	total: number;
	pages: number;
	page: number;
	limit: number;
}

