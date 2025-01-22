import { update } from '$lib/stores/session';
import { goto } from '$app/navigation';

export async function authenticate(username: string, password: string) {
    try {
        const response = await fetch("/api/auth", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                intentions: "authenticate",
                usr: username,
                pswd: password,
            }),
        });

        const data = await response.json();

        if (data.token) {
            update(data.token);
            await goto("/app/feed");
        }

        return data;
    } catch (error) {
        console.error("AUTH ERROR:", error);
        return { error: "auth failed :(" };
    }
}
