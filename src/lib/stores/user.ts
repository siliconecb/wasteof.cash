import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export const user = writable<string | null>(null);

export async function vertoken(token: string) {
	if (!browser) {
		return false;
	}

	try {
		const response = await fetch('https://api.wasteof.money/session', {
			headers: {
				Authorization: token
			}
		});

		if (response.ok) {
			const data = await response.json();
			user.set(data.user.name);
			return true;
		} else {
			user.set(null);
			return false;
		}
	} catch (error) {
		console.error('error verifying token:', error);
		user.set(null);
		if (typeof window !== 'undefined') {
			window.location.href = '/login';
		}
		return false;
	}
}

export function clearUser() {
	user.set(null);
}
