const fs = require("fs");
const path = require("path");
const promisify = require("util").promisify; // 将回调函数写法 promise 化
const stat = promisify(fs.stat); // 文件信息对象
const readdir = promisify(fs.readdir); // 文件夹信息对象

// 读取模版
const Handlebars = require("handlebars");
const tplPath = path.join(__dirname, "../template/showDir.tpl");
const source = fs.readFileSync(tplPath);
const template = Handlebars.compile(source.toString());

const fileType = require("./types");

const compress = require("./compress");

const ifFresh = require("./ifFresh");

module.exports = async function (req, res, filePath, config) {
  try {
    const stats = await stat(filePath);

    // 判断是文件还是文件夹
    if (stats.isFile()) {
      res.setHeader("Content-Type", `${fileType(filePath)};charset=utf-8`);
      const readstream = fs.createReadStream(filePath);
      // 判断资源是否过期
      if (ifFresh(stats, req, res)) {
        res.statusCode = 304;
        res.end();
        return;
      }

      res.statusCode = 200;

      // 压缩相关
      if (filePath.match(config.compress)) {
        compress(readstream, req, res).pipe(res);
      } else {
        readstream.pipe(res);
      }
      // readstream.pipe(res);
    } else if (stats.isDirectory()) {
      res.statusCode = 200;
      // 设置文档类型出错了
      res.setHeader("Content-Type", "text/html;charset=utf-8");
      let files = await readdir(filePath);

      // res.end(files.join(","));

      const dir = path.relative(config.rootPath, filePath); // 用于将绝对路径转为相对路径，返回从 from 到 to 的相对路径（基于当前工作目录）

      // ===
      let arr = [];

      files.forEach((element) => {
        arr.push({
          file: element,
          icon: fileType(element),
        });
      });

      // ===

      const data = {
        title: path.basename(filePath), // path 的最后一部分 path.basename('目录1/目录2/文件.html') ===> 返回 文件.html
        dir: dir ? `/${dir}` : "",
        files: arr,
      };

      res.end(template(data));
    }
  } catch (error) {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain;charset=utf-8");
    res.end(`${filePath} is not a directory or file`);
  }
};
