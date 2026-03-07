const API_BASE = process.env.API_BASE_URL || "https://api-growtwitter-illk.onrender.com";

module.exports = async (req, res) => {
  try {
    const path = (req.query.path || []).join("/");
    const url = `${API_BASE}/${path}`;

    const qs = new URLSearchParams();
    for (const [k, v] of Object.entries(req.query || {})) {
      if (k === "path") continue;
      if (Array.isArray(v)) v.forEach((vv) => qs.append(k, String(vv)));
      else if (v != null) qs.set(k, String(v));
    }
    const finalUrl = qs.toString() ? `${url}?${qs}` : url;

    const headers = {};
    const auth = req.headers.authorization;
    if (auth) headers["authorization"] = auth;
    if (req.method !== "GET" && req.method !== "HEAD") headers["content-type"] = "application/json";

    const init = { method: req.method, headers };

    if (req.method !== "GET" && req.method !== "HEAD") {
      init.body = typeof req.body === "string" ? req.body : JSON.stringify(req.body ?? {});
    }

    const upstream = await fetch(finalUrl, init);
    const text = await upstream.text();

    res.status(upstream.status);
    try {
      res.json(JSON.parse(text));
    } catch {
      res.send(text);
    }
  } catch (e) {
    res.status(500).json({ success: false, message: e?.message || "Proxy error" });
  }
};