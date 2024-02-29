import axios from "axios";
import JSZip from "jszip";
import FileSaver from "file-saver";

// 单个图片下载
export function toSingleDownload(fileUrl, fileName) {
  if (!fileUrl) {
    return false;
  }
  fileName = fileName ?? fileUrl.split("/").pop();
  if (fileUrl.includes("?")) {
    fileUrl = `${fileUrl}&t=${Date.now()}`;
  } else {
    fileUrl = `${fileUrl}?t=${Date.now()}`;
  }
  const extension = fileName.split(".").pop()?.split("?")[0];

  if (/(jpg|jpeg|gif|bmp|png|webp|jfif)$/i.test(extension)) {
    const image = new Image();
    image.src = fileUrl;
    image.setAttribute("crossOrigin", "anonymous");
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;
      canvas
        .getContext("2d")
        .drawImage(image, 0, 0, canvas.width, canvas.height);
      const base64 = canvas.toDataURL("image/jpeg");
      const a = document.createElement("a");
      a.href = base64;
      a.download = fileName;
      a.click();
      a.remove();
      window.URL.revokeObjectURL(base64);
    };
  }
  return true;
}

// 文件处理成 ArrayBuffer 对象
function getFile(url) {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url,
      responseType: "arraybuffer",
    })
      .then((data) => {
        resolve(data.data);
      })
      .catch((error) => {
        reject(error.toString());
      });
  });
}

// 图片批量下载成压缩包
export async function toBatchDownload(targetList, zipName = "download") {
  const data = targetList;
  if (!data.length) {
    return;
  }
  const zip = new JSZip();
  const cache = {};
  const promiseList = [];
  await data.forEach((item) => {
    const promise = getFile(item).then((res) => {
      const arr_name = item.split("/");
      const file_name = arr_name[arr_name.length - 1]; // 获取文件名
      zip.file(file_name, res, {
        binary: true,
      }); // 逐个添加文件
      cache[file_name] = res;
    });
    promiseList.push(promise);
  });
  Promise.all(promiseList).then(() => {
    zip
      .generateAsync({
        type: "blob",
      })
      .then((content) => {
        // 生成二进制流
        FileSaver.saveAs(content, `${zipName}.zip`); // 利用file-saver保存文件；若需保存较大的、不受 blob 的大小限制或内存限制的文件，可以选用更高级的 StreamSaver.js
      });
  });
}
