module.exports = {
	images: {
		domains: ["i.imgur.com"],
	},
	async rewrites() {
		return [
			{
				source: "/contact",
				destination: "/work-in-progress",
			},
			{
				source: "/notes",
				destination: "/work-in-progress",
			},
			{
				source: "/about",
				destination: "/work-in-progress",
			},
			{
				source: "/animelist",
				destination: "/work-in-progress",
			}
		];
	}
};
