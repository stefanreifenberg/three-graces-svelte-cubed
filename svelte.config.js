import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		vite: {
			ssr: {
				noExternal: ["three"]
			}
		},
		adapter: adapter()
	}
};

export default config;
