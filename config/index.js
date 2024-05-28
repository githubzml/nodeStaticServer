module.exports = {
  port: 3210,
  hostname: "127.0.0.1",
  compress: /\.(html|css|js|md)/,
  cache: {
    expries: 600,
    maxAge: true,
    cacheControl: true,
    lastModified: true,
    etag: true,
  },
  rootPath: process.cwd(),
};
