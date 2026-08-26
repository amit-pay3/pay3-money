import type { APIRoute } from 'astro';

const GITHUB_TOKEN = import.meta.env.KEYSTATIC_GITHUB_TOKEN;

export const GET: APIRoute = async () => {
  if (!GITHUB_TOKEN) {
    return new Response(
      JSON.stringify({ error: 'GitHub token not configured' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  return new Response(
    JSON.stringify({ token: GITHUB_TOKEN }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
};
