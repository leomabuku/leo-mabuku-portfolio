/**
 * GET /api/visits — a small, cookie-free page-view counter.
 *
 * Requires a KV binding named VISITS on the Pages project
 * (Settings → Functions → KV namespace bindings). Without it the endpoint
 * answers { available: false } and the footer simply hides the counter.
 *
 * Counting is aggregate only: one integer for all time and one for today.
 * No IP addresses, no cookies, no user agent, no per-visitor record.
 */

type KVStore = {
  get(key: string): Promise<string | null>;
  put(key: string, value: string): Promise<void>;
};

type Context = {
  env: { VISITS?: KVStore };
  request: Request;
};

const JSON_HEADERS = {
  'content-type': 'application/json; charset=utf-8',
  'cache-control': 'no-store',
};

const readCount = async (store: KVStore, key: string): Promise<number> => {
  const raw = await store.get(key);
  const value = Number.parseInt(raw ?? '0', 10);
  return Number.isFinite(value) && value > 0 ? value : 0;
};

export const onRequestGet = async ({ env }: Context): Promise<Response> => {
  const store = env.VISITS;

  if (!store) {
    return new Response(JSON.stringify({ available: false }), { headers: JSON_HEADERS });
  }

  const day = new Date().toISOString().slice(0, 10);

  try {
    const [total, today] = await Promise.all([
      readCount(store, 'total'),
      readCount(store, `day:${day}`),
    ]);

    // KV has no atomic increment; a page view landing in the same instant as
    // another can be lost. For a portfolio footer that is an acceptable trade.
    await Promise.all([
      store.put('total', String(total + 1)),
      store.put(`day:${day}`, String(today + 1)),
    ]);

    return new Response(
      JSON.stringify({ available: true, total: total + 1, today: today + 1 }),
      { headers: JSON_HEADERS },
    );
  } catch {
    return new Response(JSON.stringify({ available: false }), { headers: JSON_HEADERS });
  }
};
