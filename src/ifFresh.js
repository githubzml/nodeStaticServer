const { cache } = require("../config");
function setRequestHeader(stats, res) {
  const { cacheControl, maxAge, lastModified, etag } = cache;
  // 是否存在请求头设置
  if (cacheControl) {
    res.setHeader("Cache-Control", "public, max-age=" + maxAge);
  }
  if (lastModified) {
    // toUTCString 就这么写 保持统一 规范
    res.setHeader("Last-Modified", stats.mtime.toUTCString());
  }
  if (etag) {
    res.setHeader("Etag", stats.size + "-" + stats.mtime.getTime());
  }
  if (maxAge) {
    res.setHeader(
      "Expires",
      new Date(Date.now() + maxAge * 1000).toUTCString()
    );
  }
}

module.exports = function (stats, req, res) {
  // 首次进入设置请求头
  setRequestHeader(stats, res);

  const lastModified = req.headers["if-modified-since"];
  const etag = req.headers["if-none-match"];

  // 首次请求资源
  if (!lastModified && !etag) {
    return false;
  }

  // 第 n 次请求

  if (lastModified && lastModified !== res.getHeader("Last-Modified")) {
    return false;
  }

  if (etag && etag !== res.getHeader("Etag")) {
    return false;
  }

  return true;
};
