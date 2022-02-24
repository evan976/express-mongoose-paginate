import merge from 'lodash/merge'
import type {
  Model,
  Document,
  Schema,
  FilterQuery,
  QueryOptions
} from 'mongoose'

export interface PaginationResult<T> {
  data: Array<T>
  total: number
  page: number
  pageSize: number
  totalPage: number
}

export type PaginationQuery<T = any> = FilterQuery<T>

export interface PaginationOptions {
  page?: number
  pageSize?: number
  projection?: string | object | null
  sort?: QueryOptions['sort']
  lean?: QueryOptions['lean']
  populate?: QueryOptions['populate']
  $queryOptions?: QueryOptions
}

const defaultOptions: Required<
  Pick<PaginationOptions, 'page' | 'pageSize' | 'sort' | 'lean'>
> = Object.freeze({
  page: 1,
  pageSize: 12,
  sort: -1,
  lean: false
})

export interface PaginationModel<T extends Document> extends Model<T> {
  paginate(
    query?: PaginationQuery<T>,
    options?: PaginationOptions
  ): Promise<PaginationResult<T>>
}

export function mongoosePagination<T extends Document>(schema: Schema<T>) {
  schema.statics.paginate = async function paginate(
    filterQuery: PaginationQuery<T>,
    options: PaginationOptions
  ): Promise<PaginationResult<T>> {
    const { page, pageSize, sort, lean, projection, $queryOptions, ...rest } =
      merge({ ...defaultOptions }, { ...options })

    const findQueryOptions = {
      ...rest,
      ...$queryOptions
    }

    const countQuery = this.countDocuments
      ? this.countDocuments(filterQuery).exec()
      : this.count(filterQuery).exec()

    const pageQuery = this.find(filterQuery, projection, {
      skip: (page - 1) * pageSize,
      limit: pageSize,
      sort: sort ? { _id: sort } : findQueryOptions.sort,
      ...findQueryOptions
    }).exec()

    const [total, data] = await Promise.all([countQuery, pageQuery])
    const result: PaginationResult<T> = {
      data,
      total,
      page,
      pageSize,
      totalPage: Math.ceil(total / pageSize) || 1
    }
    return result
  }
}