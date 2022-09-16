import { notion } from "@services/notion";
import { getNotionAPIError } from "@lib/getNotionAPIError";

export default async function handler(request, response) {
	console.log(`[${request.method}]: api/v1/contact`);

	try {
		await verifyRequest(request, response);
		await sendMessage(request.body);

		const apiResponse = {
			message: "Message sent successfully",
			success: true,
			code: "ok",
			status: 200,
		};

		console.log(apiResponse);
		return response.status(apiResponse.status).json(apiResponse);
	} catch (error) {
		console.log(error);
		return response.status(error.status).json(error);
	}
}

async function verifyRequest(request, response) {
	try {
		if (request.method !== "POST") {
			response.setHeader("Allow", ["POST"]);

			throw {
				message: `Method ${request.method} is not allowed`,
				success: false,
				code: "method_not_allowed",
				status: 405,
			};
		}

		if (!Object.keys(request.body).length) {
			throw {
				message: "Request is missing body",
				success: false,
				code: "validation_error",
				status: 400,
			};
		}

		if (!request.body.message) {
			throw {
				message: "Missing 'message' value in body",
				success: false,
				code: "validation_error",
				status: 400,
			};
		}
	} catch (error) {
		throw error;
	}
}

async function sendMessage(data) {
	try {
		const MESSAGES_DATABASE_ID = process.env.NOTION_MESSAGES_DATABASE_ID;
		const { subject, name, email, message } = data;

		await notion.pages.create({
			parent: {
				database_id: MESSAGES_DATABASE_ID,
			},
			properties: {
				Subject: {
					type: "title",
					title: [
						{
							type: "text",
							text: { content: subject || "No subject" },
						},
					],
				},
				Name: {
					rich_text: [
						{
							type: "text",
							text: { content: name || "Anonymous" },
						},
					],
				},
				...(email && {
					Email: {
						email: email,
					},
				}),
			},
			children: [
				{
					type: "paragraph",
					paragraph: {
						rich_text: [
							{
								type: "text",
								text: { content: message },
							},
						],
					},
				},
			],
		});
	} catch (error) {
		throw getNotionAPIError(error);
	}
}
