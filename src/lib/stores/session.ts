import { writable } from 'svelte/store';

export const sessionToken = writable<string | null>(
    typeof window !== 'undefined' ? localStorage.getItem('token') : null
);

sessionToken.subscribe((value) => {
    if (typeof window !== 'undefined') {
        if (value) {
            localStorage.setItem('token', value);
        } else {
            localStorage.removeItem('token');
        }
    }
});

export function update(token: string | null) {
    sessionToken.set(token);
}

export function clear() {
    sessionToken.set(null);
}
