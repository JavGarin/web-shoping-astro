/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				'forest-green': '#2d5a33',
				'earth-brown': '#8b5e34',
				'golden-amber': '#d4af37',
				'cream-beige': '#f5f5dc',
				'charcoal-gray': '#36454f',
			}
		},
	},
	plugins: [],
}