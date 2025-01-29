import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = ({ url }) => {
	if (url.pathname === '/app') {
		throw redirect(307, '/app/feed' + url.search);
	}

	return new Response('not found', { status: 404 });
};
