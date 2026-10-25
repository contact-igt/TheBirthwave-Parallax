type Result = { status: number; data: unknown };
type Entry = { result: Result; checkedAt: number; etag: string | null };
/** Process-local, bounded cache. Unlike SWR, a refreshed 404/301 evicts old content. */
export function createBlogTransport(fetcher: typeof fetch = fetch, now: () => number = Date.now) {
  const entries = new Map<string, Entry>();
  const pending = new Map<string, Promise<Result>>();
  async function read(url: string, validate?: (value: unknown) => unknown): Promise<Result> {
    const previous = entries.get(url);
    if (previous && now() - previous.checkedAt < 60_000) return previous.result;
    const headers: Record<string, string> = { Accept: 'application/json' };
    if (previous?.etag) headers['If-None-Match'] = previous.etag;
    let response: Response;
    try { response = await fetcher(url, { redirect: 'manual', cache: 'no-store', signal: AbortSignal.timeout(8000), headers }); }
    catch { if (previous && now() - previous.checkedAt < 120_000) return previous.result; throw new Error('Blog network unavailable'); }
    if (response.status === 304 && previous) { previous.checkedAt = now(); return previous.result; }
    if (response.status === 404) { entries.delete(url); return { status: 404, data: null }; }
    if (response.status >= 500 && previous && now() - previous.checkedAt < 120_000) return previous.result;
    if (response.status !== 200 && response.status !== 301) {
      entries.delete(url);
      console.warn('Blog API unavailable', {status:response.status,requestId:response.headers.get('x-request-id'),contract:response.headers.get('x-api-contract')});
      throw new Error('Blog API unavailable');
    }
    // Redirects and invalid bodies must never leave a previously published 200 alive.
    entries.delete(url);
    const body = await response.json();
    if (!body || body.success !== true) throw new Error('Invalid blog response');
    const result = { status:response.status,data:body.data };
    if (response.status === 200) {
      validate?.(result.data);
      if (entries.size >= 500) entries.delete(entries.keys().next().value!);
      entries.set(url,{ result,checkedAt:now(),etag:response.headers.get('etag') });
    }
    return result;
  }
  return (url: string, validate?: (value: unknown) => unknown): Promise<Result> => {
    const existing = pending.get(url); if (existing) return existing;
    const promise = read(url,validate).finally(()=>pending.delete(url)); pending.set(url,promise); return promise;
  };
}
