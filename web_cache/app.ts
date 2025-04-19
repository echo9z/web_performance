import http from "node:http";
import fs from "node:fs";
import url from "node:url";
import etag from "etag";

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);

  const path = url.parse(req.url!).pathname;
  if (path === "/") {
    const data = fs.readFileSync("./index.html", "utf-8");
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
  } else if (path === "/img/1.jpeg") {
    const data = fs.readFileSync("./img/1.jpeg");
    // Expires设置缓存
    res.writeHead(200, {
      Expires: new Date("2025-3-26 17:40:00").toUTCString(),
    });
    res.end(data);
  } else if (path === "/img/2.jpeg") {
    const data = fs.readFileSync("./img/2.jpeg");
    // Cache-Control设置缓存
    res.writeHead(200, {
      "Cache-Control": "max-age=60", // 当客户端请求服务时，服务端会告诉客户端，这个资源在60秒内不需要再次请求。以客户端的时间为准比如客户端时间是10:00:00，那么服务端告诉客户端，这个资源在10:00:60内不需要再次请求。
    });
    res.end(data);
  } else if (path === '/img/3.jpeg') {
    // 获取文件的最后修改时间
    const { mtime } = fs.statSync('./img/3.jpeg');
    // 获取客户端的If-Modified-Since请求头/
    const ifModifiedSince = req.headers['if-modified-since'];
    // 如果客户端的If-Modified-Since请求头存在，则说明客户端已经有了这个资源的缓存，那么服务端可以根据这个时间来判断是否需要请求资源
    if (ifModifiedSince && ifModifiedSince === mtime.toUTCString()) { // 字符串比较
      // 如果文件没有修改，则返回304，客户端使用本地缓存资源
      return res.writeHead(304).end();
    }
    // 根据文件的最后修改时间来设置缓存，如果文件被修改了，则返回最新的资源；如果文件没有修改，则客户端可以直接使用本地缓存资源
    const data = fs.readFileSync('./img/3.jpeg');

    // 设置Cache-Control响应头，进行协商缓存，请求时都会询问服务端是否需要请求资源
    res.setHeader('Cache-Control', 'no-cache');

    // Last-Modified设置缓存
    res.writeHead(200, {
      'Last-Modified': mtime.toUTCString()
    });
    res.end(data);
  } else if(path === '/img/4.jpeg'){
    const file = fs.readFileSync('./img/4.jpeg');
    const etagValue = etag(file); // 生成文件的etag值，根据文件内容生成指纹信息

    // 获取客户端的If-None-Match请求头
    const ifNoneMatch = req.headers['if-none-match'];
    if (ifNoneMatch && ifNoneMatch === etagValue) { // 如果客户端的If-None-Match请求头存在，则说明客户端已经有了这个资源的缓存，那么服务端可以根据这个etag值来判断是否需要请求资源
      return res.writeHead(304).end();
    }

    // 设置ETag响应头，进行协商缓存，请求时都会询问服务端是否需要请求资源
    res.setHeader('ETag', etagValue);
    // 如果客户端的If-None-Match请求头存在，则说明客户端已经有了这个资源的缓存，那么服务端可以根据这个etag值来判断是否需要请求资源
    res.setHeader('Cache-Control', 'no-cache');

    res.end(file);
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("<h1>404 Not Found</h1>");
  }
});

server.listen(9043, () => {
  console.log("Server is listening on port http://localhost:9043");
});
