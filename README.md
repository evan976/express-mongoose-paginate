# express-mongoose-paginate

`mongoose` 分页插件

## 安装

```bash
npm install express-mongoose-paginate
```

## 使用

```ts
import type { Schema, model } from 'mongoose'
import {
  PaginationModel,
  mongoosePagination
} from 'express-mongoose-paginate'

type IArticle = {
  title: string
  content: string
}

const articleSchema = new Schema(
  {
    title: { type: String },
    content: { type: String }
  }
)

articleSchema.plugin(mongoosePagination)

const Article: PaginationModel<IArticle> = model<
  IArticle,
  PaginationModel<IArticle>
>('Article', articleSchema)

Article.paginate()
```
