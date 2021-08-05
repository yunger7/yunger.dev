import { notion } from "../../services/notion";

export default async function contact(request, response) {
	if (request.method !== "POST") {
		response.status(400).json({ message: "Only POST requests are allowed" });
		return;
	}

	const {
		body: { subject, name, email, message },
	} = request;

	if (!subject) {
		response
			.status(400)
			.json({ error: true, message: "Subject property is missing" });

		return;
	}

	if (!message) {
		response
			.status(400)
			.json({ error: true, message: "Message property is missing" });

		return;
	}

	if (email) {
		const emailRegEx =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		if (!emailRegEx.test(email)) {
			response.status(400).json({ error: true, message: "Invalid email" });

			return;
		}
	}

	try {
    const messageDatabaseId = process.env.NOTION_MESSAGES_DATABASE_ID;

    const response = await notion.pages.create({
      parent: {
        database_id: messageDatabaseId,
      },
      properties: {
        Subject: {
          type: "title",
          title: [
            {
              type: "text",
              text: { content: subject }
            }
          ]
        },
        ...(name && {
          Name: {
            rich_text: [
              {
                type: "text",
                text: { content: name }
              }
            ]
          }
        }),
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
            text: [
              {
                type: "text",
                text: { content: message },
              },
            ],
          },
        }
      ],
    });

    console.dir(response, { depth: null });

	} catch (error) {
		response
			.status(500)
			.json({ error: true, message: "Internal server error" });

    return;
	}

	response.status(200).json({ message: "Message sent successfully" });
}
