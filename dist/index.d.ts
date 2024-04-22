import { FilterQuery, QueryOptions, Document, Model, Schema } from 'mongoose';

interface PaginationResult<T> {
    data: Array<T>;
    total: number;
    page: number;
    pageSize: number;
    totalPage: number;
}
type PaginationQuery<T = unknown> = FilterQuery<T>;
interface PaginationOptions {
    page?: number;
    pageSize?: number;
    projection?: string | object | null;
    sort?: QueryOptions['sort'];
    lean?: QueryOptions['lean'];
    populate?: QueryOptions['populate'];
    $queryOptions?: QueryOptions;
}
interface PaginationModel<T extends Document> extends Model<T> {
    paginate(query?: PaginationQuery<T>, options?: PaginationOptions): Promise<PaginationResult<T>>;
}
declare function mongoosePagination<T extends Document>(schema: Schema<T>): void;

export { type PaginationModel, type PaginationOptions, type PaginationQuery, type PaginationResult, mongoosePagination };
