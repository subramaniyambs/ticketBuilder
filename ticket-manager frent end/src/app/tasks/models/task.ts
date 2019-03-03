export class Task {
	_id: string;
	name: string;
}
export class TaskPaginationRsp {
	docs: Task[];
	total: number;
	pages: number;
	page: number;
	limit: number;
}
