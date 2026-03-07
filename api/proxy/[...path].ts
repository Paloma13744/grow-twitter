import type { VercelRequest, VercelResponse } from "@vercel/node";

const API_BASE =
    process.env.API_BASE_URL || "https://api-growtwitter-illk.onrender.com";

function setCors(res: VercelResponse) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    setCors(res);

    if (req.method === "OPTIONS") {
        return res.status(204).end();
    }

    try {
        const path = (req.query.path as string[]) || [];
        const url = `${API_BASE}/${path.join("/")}`;

        const qs = new URLSearchParams();
        for (const [k, v] of Object.entries(req.query)) {
            if (k === "path") continue;
            if (Array.isArray(v)) v.forEach((vv) => qs.append(k, String(vv)));
            else if (v != null) qs.set(k, String(v));
        }
        const finalUrl = qs.toString() ? `${url}?${qs.toString()}` : url;

        const headers: Record<string, string> = {};

        const auth = req.headers.authorization;
        if (auth) headers["Authorization"] = auth;

        const method = (req.method || "GET").toUpperCase();
        const hasBody = !["GET", "HEAD"].includes(method);

        if (hasBody) headers["Content-Type"] = "application/json";

        const init: RequestInit = { method, headers };

        if (hasBody) {
            init.body =
                typeof req.body === "string" ? req.body : JSON.stringify(req.body ?? {});
        }

        const upstream = await fetch(finalUrl, init);
        const text = await upstream.text();

        res.status(upstream.status);

        try {
            return res.json(JSON.parse(text));
        } catch {
            return res.send(text);
        }
    } catch (e: any) {
        return res.status(500).json({
            success: false,
            message: e?.message ?? "Proxy error",
        });
    }
}