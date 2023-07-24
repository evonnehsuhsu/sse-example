const express = require("express");

const host = "127.0.0.1";
const port = 3000;

const app = express();

// inmitate a data source that changes over time
let dataSource = "";

const setCorsHeader = (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE,PATCH"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Content-Type", "application/json");
  next();
};

app.use(setCorsHeader);

// Routes
app.get("/", (req, res) => {
  res.status(200).json({ message: "success" });
});

app.get("/ticker", (req, res) => {
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("connection", "keep-alive");
  res.setHeader("content-type", "text/event-stream");
  const intervalId = setInterval(() => {
    const data = { ticker: dataSource };
    res.write(
      `id: ${new Date().toLocaleTimeString()}\ndata: ${JSON.stringify(
        data
      )}\n\n`
    );
  }, 1000);

  // Handle client disconnect
  req.on("close", () => {
    console.log("close sse");
    clearInterval(intervalId);
  });
});

app.post("/save", (req, res) => {
  const params = req.query.data;
  dataSource = params;
  res.status(200).json({ message: "success" });
});

app.get("*", (req, res) => {
  res.status(404).json({ message: "resource does not exist" });
});

app.listen(port, host, () => {
  console.log(`server running at http://${host}:${port}`);
});
