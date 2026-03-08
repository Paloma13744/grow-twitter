import type { VercelRequest, VercelResponse } from "@vercel/node";

const API_BASE_URL = "https://api-growtwitter-illk.onrender.com";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Extrai o path: do query (?path=auth/login) ou da URL (/api/proxy/auth/login)
  let path = req.query.path;
  if (path === undefined || path === "") {
    const url = req.url || "";
    const match = url.match(/\/api\/proxy\/(.+?)(?:\?|$)/);
    path = match ? match[1] : "";
  }
  const pathSegments = Array.isArray(path) ? path : String(path).split("/").filter(Boolean);
  const targetPath = pathSegments.join("/");
  const targetUrl = `${API_BASE_URL}/${targetPath}`;

  if (!targetPath) {
    return res.status(400).json({
      error: { code: "400", message: "Path is required" },
    });
  }

  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        "Content-Type": "application/json",
        ...(req.headers.authorization
          ? { Authorization: req.headers.authorization }
          : {}),
      },
      body:
        req.method === "GET" || req.method === "HEAD"
          ? undefined
          : JSON.stringify(req.body),
    });

    const contentType = response.headers.get("content-type") || "";
    const status = response.status;

    if (contentType.includes("application/json")) {
      const data = await response.json();
      return res.status(status).json(data);
    }

    const text = await response.text();
    return res.status(status).send(text);
  } catch (error) {
    console.error("Proxy error:", error);
    return res.status(500).json({
      message: "Erro ao conectar com a API externa",
    });
  }
}
