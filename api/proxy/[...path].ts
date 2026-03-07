import type { VercelRequest, VercelResponse } from "@vercel/node";

const API_BASE =
  process.env.API_BASE_URL || "https://api-growtwitter-illk.onrender.com";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  try {
    const pathParts = (req.query.path as string[]) || [];
    const url = `${API_BASE}/${pathParts.join("/")}`;

    const qs = new URLSearchParams();
    for (const [k, v] of Object.entries(req.query)) {
      if (k === "path") continue;
      if (Array.isArray(v)) v.forEach((vv) => qs.append(k, String(vv)));
      else if (v != null) qs.set(k, String(v));
    }

    const finalUrl = qs.toString() ? `${url}?${qs}` : url;

    const headers: Record<string, string> = {};
    const auth = req.headers.authorization;
    if (auth) headers["Authorization"] = auth;
    if (req.method && !["GET", "HEAD"].includes(req.method)) {
      headers["Content-Type"] = "application/json";
    }

    const method = (req.method || "GET").toUpperCase();
    const init: RequestInit = { method, headers };

    if (!["GET", "HEAD"].includes(method)) {
      init.body =
        typeof req.body === "string" ? req.body : JSON.stringify(req.body ?? {});
    }

    const upstream = await fetch(finalUrl, init);
    const text = await upstream.text();

    res.status(upstream.status);

    try {
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.parse(text));
    } catch {
      res.send(text);
    }
  } catch (e: any) {
    res.status(500).json({ success: false, message: e?.message ?? "Proxy error" });
  }
}