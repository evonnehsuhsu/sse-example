const http = require("http");
const os = require("os");

const host = "127.0.0.1";
const port = 8080;

// inmitate a data source that changes over time
let dataSource = "";

const requestListener = (req, res) => {
  if (req.url === "/") {
    res.statusCode = 200;
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("content-type", "text/html");
    res.write("success");
  } else if (req.url === "/ticker") {
    res.statusCode = 200;
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("connection", "keep-alive");
    res.setHeader("content-type", "text/event-stream");
    setInterval(() => {
      const data = JSON.stringify({ ticker: dataSource });
      res.write(`id: ${new Date().toLocaleTimeString()}\ndata: ${data}\n\n`);
    }, 1000);
  } else if (req.url.includes("/save")) {
    const params = req.url.replace("/save?data=", "");
    dataSource = params;
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,HEAD,OPTIONS,POST,PUT,DELETE,PATCH"
    );
    res.setHeader("content-type", "application/json");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.statusCode = 200;
    res.end("success");
  } else {
    res.statusCode = 404;
    res.end("resource does not exist");
  }
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`server running at http://${host}:${port}`);
});
