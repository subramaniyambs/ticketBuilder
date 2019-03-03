import { Brand } from '../../brands/models/brand';

export class Model {
	_id: string;
	name: string;
	brand: Brand;
    brandid: number;
}
export class ModelPaginationRsp {
	docs: Model[];
	total: number;
	pages: number;
	page: number;
	limit: number;
}
