import http from "http";
import fs, { createReadStream } from "fs";
import { buffer } from "stream/consumers";
import { uploadToGist, getGist } from "./func.js";

http
  .createServer(function (req, res) {
    if (req.method === "MKCOL") {
      res.statusCode = 201;
      res.end("");
    } else if (req.method === "GET") {
      getGist()
        .then((data) => {
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(data);
        })
        .catch((err) => {
          console.log(err);
          res.statusCode = err.status;
          res.end(err.message);
        });
    } else {
      const arr = [];
      req.on("data", function (chunk) {
        arr.push(chunk);
      });
      req.on("end", function () {
        const buffer = Buffer.concat(arr);
        if (buffer.length > 0) {
          uploadToGist(buffer.toString())
            .then((data) => {
              res.writeHead(200, { "Content-Type": "application/json" });
              res.end();
            })
            .catch((err) => {
              console.log(err);
              res.statusCode = err.status;
              res.end(err.message);
            });
        }
      });
    }
  })
  .listen(12001);
