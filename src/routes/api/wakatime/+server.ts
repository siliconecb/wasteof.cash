import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import fetch from 'node-fetch';

export const GET: RequestHandler = async () => {
  try {
    const response = await fetch('https://ineedtotouchgrass.wasteof.me/');
    if (!response.ok) {
      return json({ error: '0/0/0' }, { status: response.status });
    }
    const data: unknown = await response.json();
    return json(data, { status: response.status });
  } catch (error) {
    console.error(error);
    return json({ error: 'error :(' }, { status: 500 });
  }
};
