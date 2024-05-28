const path = require("path");
const http = require("http");
const conf = require("../config/index");
const route = require("./file_path");
const autoOpen = require("./auto_open");

class Server {
  constructor(config) {
    conf.rootPath = path.resolve(__dirname, config.d);
    conf.hostname = config.h ? config.h : conf.hostname;
    conf.p = config.p ? config.p : conf.port;
    this.conf = conf;
  }
  init() {
    const server = http.createServer((req, res) => {
      // 获取用户使用该工具时候的位置
      const filePath = path.join(this.conf.rootPath, req.url);
      route(req, res, filePath, this.conf);
    });

    server.listen(this.conf.port, this.conf.hostname, () => {
      const url = `http://${this.conf.hostname}:${this.conf.port}`;
      console.log(`server is running at http://${url}`);
      autoOpen(url);
    });
  }
}

module.exports = Server;
