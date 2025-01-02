import adapter from '@sveltejs/adapter-node';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    version: {
      name: Date.now().toString()
    }
  },
  vite: {
    server: {
      fs: {
        allow: ['../fonts', '../*.ttf']
      },
    },
  },
};

export default config;
