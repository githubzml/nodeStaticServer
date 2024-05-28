// 设置文件类型
const path = require("path");

const fileType = {
  txt: "text/plain",
  html: "text/html",
  css: "text/css",
  js: "text/javascript",
  json: "application/json",
  xml: "application/xml",
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  gif: "image/gif",
  bmp: "image/bmp",
  ico: "image/x-icon",
  md: "text/markdown",
};

console.log(333);

module.exports = function (filePath) {
  console.log("filePath", filePath);
  const ext = path.extname(filePath).split(".").pop().toLocaleLowerCase();
  console.log("ext", ext);
  if (!ext) return filePath;
  return fileType[ext] || fileType["txt"];
};
