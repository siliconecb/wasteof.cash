import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { vertoken } from './user';

function createSessionStore() {
	const { subscribe, set } = writable<string | null>(null);

	if (browser) {
		const token = get('session');
		if (token) set(token);
	}

	return {
		subscribe,
		set: (value: string | null) => {
			set(value);
			if (browser) {
				if (value) {
					setCookie('session', value, 7);
					vertoken(value);
				} else {
					deleteCookie('session');
				}
			}
		}
	};
}

export const sessionToken = createSessionStore();

export function update(token: string | null) {
	sessionToken.set(token);
}

export function clear() {
	sessionToken.set(null);
}

export function badtoken() {
	clear();
	if (browser) {
		window.location.href = '/login';
	}
}

function setCookie(name: string, value: string, days: number) {
	const expires = new Date(Date.now() + days * 864e5).toUTCString();
	document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Strict; Secure`;
}

function get(name: string): string | null {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) return decodeURIComponent(parts.pop()!.split(';').shift()!);
	return null;
}

function deleteCookie(name: string) {
	document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Strict; Secure`;
}
