import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { path } = req.query;

  const pathArray = Array.isArray(path) ? path : [path];
  const targetUrl = `https://api-growtwitter-illk.onrender.com/${pathArray.join("/")}`;

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