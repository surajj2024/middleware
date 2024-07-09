import express from "express";
import fs from "fs";

const app = express();
const PORT = 8080;

app.use((req, res, next) => {
  const start = Date.now();
  const { method, url } = req;
  res.on("finish", () => {
    const duration = Date.now() - start;
    const timestamp = new Date().toLocaleString();
    const msg = `\n [${timestamp}] ${method} ${url} - ${res.statusCode} - ${duration}ms`;
    fs.appendFile("logger.js", msg, (err) => {
      if (err) {
        console.log("Error saving log to file", err);
      }
    });
  });
  next();
});

app.get("/", (req, res) => {
  res.send("iam in");
});

app.listen(PORT, () => {
  console.log(`listeninig at ${PORT}`);
});
