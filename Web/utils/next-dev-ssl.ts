import { readFileSync } from "fs";
import { createServer } from "http-proxy";
import * as path from "path";

const cert = path.join(process.cwd(), "certificates/sprobble.xyz.pem");
const key = path.join(process.cwd(), "certificates/sprobble.xyz-key.pem");

createServer({
  xfwd: true,
  ws: true,
  target: {
    host: "sprobble.xyz",
    port: 3001,
  },
  ssl: {
    key: readFileSync(key, "utf8"),
    cert: readFileSync(cert, "utf8"),
  },
})
  .on("error", function (e) {
    console.error(`Request failed to proxy: ${e.message}`);
  })
  .listen(3000);
