import { APIErrorCode } from "@notionhq/client";

export function getNotionAPIError(error) {
	if (typeof error != "object" || !("code" in error)) {
		return {
			message: "Failed to communicate with the Notion API",
			success: false,
			code: "internal_server_error",
			status: 500,
		};
	}

	switch (error.code) {
		case APIErrorCode.InvalidJSON:
			return {
				message: "Invalid JSON payload received",
				success: false,
				code: `notion_${APIErrorCode.InvalidJSON}`,
				status: 400,
			};
		case APIErrorCode.InvalidRequest:
			return {
				message: "Invalid request",
				success: false,
				code: `notion_${APIErrorCode.InvalidRequest}`,
				status: 400,
			};
		case APIErrorCode.InvalidRequestURL:
			return {
				message: "Invalid request URL",
				success: false,
				code: `notion_${APIErrorCode.InvalidRequestURL}`,
				status: 400,
			};
		case APIErrorCode.ValidationError:
			return {
				message: "Validation error",
				success: false,
				code: `notion_${APIErrorCode.ValidationError}`,
				status: 400,
			};
		case APIErrorCode.Unauthorized:
			return {
				message: "Unauthorized",
				success: false,
				code: `notion_${APIErrorCode.Unauthorized}`,
				status: 401,
			};
		case APIErrorCode.RestrictedResource:
			return {
				message: "Restricted resource",
				success: false,
				code: `notion_${APIErrorCode.RestrictedResource}`,
				status: 403,
			};
		case APIErrorCode.ObjectNotFound:
			return {
				message: "Not found",
				success: false,
				code: `notion_${APIErrorCode.ObjectNotFound}`,
				status: 404,
			};
		case APIErrorCode.ConflictError:
			return {
				message: "Conflict error",
				success: false,
				code: `notion_${APIErrorCode.ConflictError}`,
				status: 409,
			};
		case APIErrorCode.RateLimited:
			return {
				message: "Too many requests (rate limited)",
				success: false,
				code: `notion_${APIErrorCode.RateLimited}`,
				status: 429,
			};
		case APIErrorCode.InternalServerError:
			return {
				message: "Internal server error",
				success: false,
				code: `notion_${APIErrorCode.InternalServerError}`,
				status: 500,
			};
		case APIErrorCode.ServiceUnavailable:
			return {
				message: "Service unavailable",
				success: false,
				code: `notion_${APIErrorCode.ServiceUnavailable}`,
				status: 503,
			};
		default:
			return {
				message: "Failed to communicate with the Notion API",
				success: false,
				code: "internal_server_error",
				status: 500,
			};
	}
}
