// Servidor estático mínimo para o export (out/), com Range para o vídeo e brotli. Uso: node scripts/serve.mjs [porta]
import { createServer } from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import { extname, join, normalize } from "node:path";
import { createBrotliCompress } from "node:zlib";

const ROOT = "out";
const PORT = Number(process.argv[2] || 4173);
const TYPES = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".json": "application/json",
  ".webp": "image/webp", ".jpg": "image/jpeg", ".png": "image/png", ".svg": "image/svg+xml", ".ico": "image/x-icon",
  ".woff2": "font/woff2", ".mp4": "video/mp4", ".webm": "video/webm", ".txt": "text/plain",
};

createServer((req, res) => {
  let path = normalize(decodeURIComponent(new URL(req.url, "http://x").pathname)).replace(/^([/\\])+/, "");
  let file = join(ROOT, path);
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, "index.html");
  if (!existsSync(file)) { res.writeHead(404); return res.end("404"); }
  const size = statSync(file).size;
  const type = TYPES[extname(file)] || "application/octet-stream";
  const range = req.headers.range?.match(/bytes=(\d*)-(\d*)/);
  if (range) {
    const start = Number(range[1] || 0), end = range[2] ? Number(range[2]) : size - 1;
    res.writeHead(206, { "Content-Type": type, "Content-Range": `bytes ${start}-${end}/${size}`, "Accept-Ranges": "bytes", "Content-Length": end - start + 1 });
    return createReadStream(file, { start, end }).pipe(res);
  }
  // Brotli nos arquivos de texto, como a Vercel faz em produção.
  if (/text|javascript|json|svg/.test(type) && (req.headers["accept-encoding"] || "").includes("br")) {
    res.writeHead(200, { "Content-Type": type, "Content-Encoding": "br", "Cache-Control": "public, max-age=3600" });
    return createReadStream(file).pipe(createBrotliCompress()).pipe(res);
  }
  res.writeHead(200, { "Content-Type": type, "Content-Length": size, "Accept-Ranges": "bytes", "Cache-Control": "public, max-age=3600" });
  createReadStream(file).pipe(res);
}).listen(PORT, () => console.log(`http://localhost:${PORT}`));
