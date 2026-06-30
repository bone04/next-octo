// pages/index.js
import { useState } from "react";

export default function Home() {
  const [owner, setOwner] = useState("octokit");
  const [repo, setRepo] = useState("rest.js");
  const [output, setOutput] = useState("No data yet.");
  const [loading, setLoading] = useState(false);

  async function fetchRepo() {
    setLoading(true);
    setOutput("Loading...");
    try {
      const resp = await fetch(`/api/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`);
      if (!resp.ok) {
        const text = await resp.text();
        setOutput(`Error ${resp.status}: ${text}`);
      } else {
        const data = await resp.json();
        setOutput(JSON.stringify(data, null, 2));
      }
    } catch (err) {
      setOutput("Fetch error: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ fontFamily: "system-ui, Arial, sans-serif", maxWidth: 900, margin: "2rem auto", padding: "0 1rem" }}>
      <h1>Next.js + Octokit JSON fetch demo</h1>
      <p>Enter owner and repo, click Fetch. The server-side API route calls Octokit and returns response.data.</p>

      <div style={{ marginBottom: 12 }}>
        <input value={owner} onChange={(e) => setOwner(e.target.value)} placeholder="owner" style={{ fontSize: 16, padding: "6px 8px", marginRight: 8 }} />
        <input value={repo} onChange={(e) => setRepo(e.target.value)} placeholder="repo" style={{ fontSize: 16, padding: "6px 8px", marginRight: 8 }} />
        <button onClick={fetchRepo} disabled={loading} style={{ fontSize: 16, padding: "6px 10px" }}>
          {loading ? "Loading…" : "Fetch repo JSON"}
        </button>
      </div>

      <h2>Result</h2>
      <pre style={{ background: "#f6f8fa", padding: 12, overflow: "auto", maxHeight: "60vh", whiteSpace: "pre-wrap" }}>{output}</pre>
    </div>
  );
}
