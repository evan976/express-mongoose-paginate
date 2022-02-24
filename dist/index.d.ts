import type { Model, Document, Schema, FilterQuery, QueryOptions } from 'mongoose';
export interface PaginationResult<T> {
    data: Array<T>;
    total: number;
    page: number;
    pageSize: number;
    totalPage: number;
}
export declare type PaginationQuery<T = any> = FilterQuery<T>;
export interface PaginationOptions {
    page?: number;
    pageSize?: number;
    projection?: string | object | null;
    sort?: QueryOptions['sort'];
    lean?: QueryOptions['lean'];
    populate?: QueryOptions['populate'];
    $queryOptions?: QueryOptions;
}
export interface PaginationModel<T extends Document> extends Model<T> {
    paginate(query?: PaginationQuery<T>, options?: PaginationOptions): Promise<PaginationResult<T>>;
}
export declare function mongoosePagination<T extends Document>(schema: Schema<T>): void;
