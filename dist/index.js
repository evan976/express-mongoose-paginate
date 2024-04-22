"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }// src/index.ts
var _lodashmerge = require('lodash.merge'); var _lodashmerge2 = _interopRequireDefault(_lodashmerge);
var defaultOptions = Object.freeze({
  page: 1,
  pageSize: 12,
  sort: -1,
  lean: false
});
function mongoosePagination(schema) {
  schema.statics.paginate = async function paginate(filterQuery, options) {
    const {
      page,
      pageSize,
      sort,
      lean,
      projection,
      $queryOptions,
      ...rest
    } = _lodashmerge2.default.call(void 0, { ...defaultOptions }, { ...options });
    const findQueryOptions = {
      ...rest,
      ...$queryOptions
    };
    const countQuery = this.countDocuments(filterQuery).exec();
    const pageQuery = this.find(filterQuery, projection, {
      skip: (page - 1) * pageSize,
      limit: pageSize,
      sort: sort ? { _id: sort } : findQueryOptions.sort,
      lean,
      ...findQueryOptions
    }).exec();
    const [total, data] = await Promise.all([countQuery, pageQuery]);
    const result = {
      data,
      total,
      page,
      pageSize,
      totalPage: Math.ceil(total / pageSize) || 1
    };
    return result;
  };
}


exports.mongoosePagination = mongoosePagination;
//# sourceMappingURL=index.js.map