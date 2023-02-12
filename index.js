const http = require("http");
const fs = require("fs").promises;
const path = require("path");
const formiDable = require("formidable");
const formidable = require("formidable");
const filePath = path.join(__dirname, "123.txt");
const filePath1 = path.join(__dirname, "123.json");

http
  .createServer(async (req, res) => {
    if (req.url === "/") {
      const data = await fs.readFile(filePath, "utf-8");
      res.end(data);
    }

    if (req.url === "/home" && req.method.toLowerCase() === "post") {
      const form = formidable({ multiples: true });
      form.parse(req, async (error, filds, files) => {
        if (error) {
          res.setHeader(error.httpCode || 400);
          res.end(String(error));
        }
        const data = JSON.parse(
          await fs.readFile(files.file.filepath, "utf-8")
        );
        data.push(filds);
        await fs.writeFile(filePath1, JSON.stringify(data), "utf-8");
      });
    }

    if (req.url === "/work") {
      const data = await fs.readFile(filePath1, "utf-8");
    }
  })
  .listen(8081, () => console.log("is running"));
