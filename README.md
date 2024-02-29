# to-dowmload

A helper for single download and batch download of files, which toBatchDownload refer to (sf suan_suan).

## Install 安装

```bash
yarn add @sledgeli/to-dowmload

# or

npm install --save @sledgeli/to-dowmload
```

## Usage 使用示例

```js
import { toSingleDownload, toBatchDownload } from "@sledgeli/to-dowmload";

const singleFileUrl = ref("");
const fileUrlList = ref([]);

toSingleDownload(singleFileUrl, "fileName");
toBatchDownload(fileUrlList.value, "zipName");
```

## argument 参数 —— toSingleDownload

| 参数名     | 说明           | 类型     | 默认值 | 是否必填 |
| ---------- | -------------- | -------- | ------ | -------- |
| `fileUrl`  | 下载的文件 url | `string` |        | Yes      |
| `fileName` | 下载文件名     | `string` |        | No       |

## argument 参数 —— toBatchDownload

| 参数名       | 说明                | 类型     | 默认值 | 是否必填 |
| ------------ | ------------------- | -------- | ------ | -------- |
| `targetList` | 下载的文件 url 列表 | `array`  |        | Yes      |
| `zipName`    | 下载文件名          | `string` |        | No       |
