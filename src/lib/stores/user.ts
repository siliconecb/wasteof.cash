import { writable } from 'svelte/store';

export const user = writable<string | null>(null);

export async function vertoken(token: string): Promise<boolean> {
	try {
		const response = await fetch('https://api.wasteof.me/session', {
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
		return false;
	}
}


export function clearUser() {
	user.set(null);
}
