// 设置压缩
const zlib = require("zlib");
module.exports = (readstream, req, res) => {
  const acceptEncoding = req.headers["accept-encoding"];
  if (!acceptEncoding || !acceptEncoding.match(/\b(gzip|deflate)\b/)) {
    return readstream;
  } else if (acceptEncoding.match(/\bgzip\b/)) {
    res.setHeader("Content-Encoding", "gzip");
    return readstream.pipe(zlib.createGzip());
  } else if (acceptEncoding.match(/\bdeflate\b/)) {
    res.setHeader("Content-Encoding", "deflate");
    return readstream.pipe(zlib.createDeflate());
  }
};
