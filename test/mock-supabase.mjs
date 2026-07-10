// Minimal Supabase REST mock for local e2e testing.
// Logs to the OS temp dir — NOT into this repo, because wrangler pages dev
// watches the site directory and a log write would live-reload the page
// mid-test.
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";

const LOG = path.join(os.tmpdir(), "harbourpages-mock-received.jsonl");
console.log("logging to", LOG);
fs.writeFileSync(LOG, "");

http
  .createServer((req, res) => {
    let body = "";
    req.on("data", (c) => (body += c));
    req.on("end", () => {
      const entry = { method: req.method, url: req.url, apikey: req.headers.apikey, body };
      fs.appendFileSync(LOG, JSON.stringify(entry) + "\n");
      if (req.method === "POST" && req.url === "/rest/v1/leads") {
        res.writeHead(201, { "content-type": "application/json" });
        res.end("");
      } else if (req.method === "GET" && req.url.startsWith("/rest/v1/leads")) {
        res.writeHead(200, { "content-type": "application/json" });
        res.end("[]");
      } else {
        res.writeHead(404);
        res.end();
      }
    });
  })
  .listen(54321, "127.0.0.1", () => console.log("mock supabase on :54321"));
