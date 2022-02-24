"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoosePagination = void 0;
const merge_1 = __importDefault(require("lodash/merge"));
const defaultOptions = Object.freeze({
    page: 1,
    pageSize: 12,
    sort: -1,
    lean: false
});
function mongoosePagination(schema) {
    schema.statics.paginate = function paginate(filterQuery, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const _a = (0, merge_1.default)(Object.assign({}, defaultOptions), Object.assign({}, options)), { page, pageSize, sort, lean, projection, $queryOptions } = _a, rest = __rest(_a, ["page", "pageSize", "sort", "lean", "projection", "$queryOptions"]);
            const findQueryOptions = Object.assign(Object.assign({}, rest), $queryOptions);
            const countQuery = this.countDocuments
                ? this.countDocuments(filterQuery).exec()
                : this.count(filterQuery).exec();
            const pageQuery = this.find(filterQuery, projection, Object.assign({ skip: (page - 1) * pageSize, limit: pageSize, sort: sort ? { _id: sort } : findQueryOptions.sort }, findQueryOptions)).exec();
            const [total, data] = yield Promise.all([countQuery, pageQuery]);
            const result = {
                data,
                total,
                page,
                pageSize,
                totalPage: Math.ceil(total / pageSize) || 1
            };
            return result;
        });
    };
}
exports.mongoosePagination = mongoosePagination;
