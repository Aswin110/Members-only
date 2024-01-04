/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./views/**/*.pug"],
	theme: {
		extend: {},
		fontSize: {
			'9xl': '5rem', 
		},
		screens: {
			sm: "640px",
			md: "728px",
			lg: "903px",
			xlg: "1023px",
		},
	},
	plugins: [],
};

