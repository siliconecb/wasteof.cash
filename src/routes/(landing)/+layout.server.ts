import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { vertoken } from '$lib/stores/user';

export const load: LayoutServerLoad = async ({ url, cookies }) => {
	const token = cookies.get('session');

	if (!token) {
		return {};
	}

	const valid = await vertoken(token);

	if (valid) {
		if (!url.pathname.startsWith('/app')) {
			throw redirect(307, '/app');
		}
		return { token };
	} else {
		cookies.delete('session', { path: '/' });
		return {};
	}
};
