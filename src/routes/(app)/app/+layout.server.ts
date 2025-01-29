import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { vertoken } from '$lib/stores/user';

export const load: LayoutServerLoad = async ({ url, cookies }) => {
	const token = cookies.get('session');

	if (!token) {
		throw redirect(307, '/login');
	}

	const valid = await vertoken(token);

	if (!valid) {
		cookies.delete('session', { path: '/' });
		throw redirect(307, '/login');
	}
	return { token };
};
