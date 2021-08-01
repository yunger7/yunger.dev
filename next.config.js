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
				source: "/projects",
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
	},
	async redirects() {
		return [
			{
				source: "/templates/:match*",
				destination: "https://templates.yunger.dev/:match*",
				permanent: true,
			},
			{
				source: "/shop",
				destination: "https://ko-fi.com/yunger/shop",
				permanent: false,
			},
		];
	},
};
