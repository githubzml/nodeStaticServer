// const http = require("http");
// const { port, hostname } = require("./config");
// const route = require("./src/file_path");
// const path = require("path");

// const server = http.createServer((req, res) => {
//   let filepath = path.join(process.cwd(), req.url);
//   route(req, res, filepath);
// });

// server.listen(port, hostname, () => {
//   console.log(`Server is running on port ${port}`);
// });

const yargs = require("yargs");
const Server = require("./src/server");

const argv = yargs
  .usage("cus_server [options]")
  .option("p", {
    alias: "port",
    describe: "端口号",
    default: 9527,
  })
  .option("h", {
    alias: "hostname",
    describe: "host名",
    default: "127.0.0.1",
  })
  .option("d", {
    alias: "root",
    describe: "根目录",
    default: process.cwd(),
  })
  .version()
  .alias("v", "version")
  .help().argv;

const server = new Server(argv);
server.init();
