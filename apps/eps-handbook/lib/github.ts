export type RepoUpdateInfo = {
  owner: string;
  repo: string;
  updated_at: string | null;
  pushed_at: string | null;
  html_url: string;
};

export async function getRepoUpdateInfo(
  owner: string,
  repo: string
): Promise<RepoUpdateInfo> {
  const url = `https://api.github.com/repos/${owner}/${repo}`;
  const token = process.env.GITHUB_TOKEN;

  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const resp = await fetch(url, { headers, cache: "no-store" });

  if (!resp.ok) {
    throw new Error(`GitHub API error ${resp.status}`);
  }

  const data = await resp.json();

  return {
    owner,
    repo,
    updated_at: data?.updated_at ?? null,
    pushed_at: data?.pushed_at ?? null,
    html_url: data?.html_url ?? `https://github.com/${owner}/${repo}`,
  };
}

export function formatTimeAgo(iso: string | null): string {
  if (!iso) return "unknown";

  const diff = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor(diff / 3600000);
  const minutes = Math.floor(diff / 60000);

  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return "just now";
}
