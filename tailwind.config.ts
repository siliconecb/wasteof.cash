import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			animation: {
				'text-gradient': 'text-gradient 5s linear infinite'
			},
			keyframes: {
				'text-gradient': {
					to: {
						backgroundPosition: '200% center'
					}
				}
			}
		}
	},

	plugins: []
} satisfies Config;
