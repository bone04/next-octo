// pages/api/repos/[owner]/[repo].js
import { Octokit } from "@octokit/rest";

export default async function handler(req, res) {
  const { owner, repo } = req.query;

  if (!owner || !repo) {
    return res.status(400).json({ error: "Missing owner or repo in the URL" });
  }

  // Create Octokit (auth optional; set GITHUB_TOKEN in env for higher rate limits)
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN || undefined,
  });

  try {
    // Call Octokit and return response.data (the JSON payload from GitHub)
    const response = await octokit.rest.repos.get({
      owner: String(owner),
      repo: String(repo),
    });

    return res.status(200).json(response.data);
  } catch (err) {
    // Provide helpful error details (don't leak tokens)
    const status = err.status || 500;
    return res.status(status).json({
      error: err.message,
      status,
      details: err.response?.data,
    });
  }
}
