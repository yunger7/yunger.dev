/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ["i.imgur.com", "www.notion.so", "images.unsplash.com"],
	},
	async rewrites() {
    return {
			beforeFiles: [
				{
					source: "/:asset*",
					has: [{ type: "host", value: "assets.yunger.dev" }],
					destination: "/:asset*",
				},
			],
			afterFiles: [
				{
					source: "/projects",
					destination: "/work-in-progress",
				},
				{
					source: "/notes",
					destination: "/work-in-progress",
				},
				{
					source: "/animelist",
					destination: "/work-in-progress",
				},
				{
					source: "/tools",
					destination: "/work-in-progress",
				},
			],
		};
	},
	async redirects() {
		return [
			{
				source: "/templates/:match*",
				destination: "https://templates.yunger.dev/:match*",
				permanent: true,
			},
			{
				source: "/support",
				destination: "https://ko-fi.com/yunger/",
				permanent: false,
			},
      {
				source: "/coffee",
				destination: "https://ko-fi.com/yunger/",
				permanent: false,
			},
		];
	},
};

module.exports = nextConfig;
