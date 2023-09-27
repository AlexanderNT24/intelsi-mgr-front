import CONFIG from "../config/config";
import axios from "axios";

export const ConsumerApi = async (api, type, body = null) => {
	const url = `${CONFIG.API.URL}:${CONFIG.API.PORT}`;
	return await consumerRestApi(url, api, type, body);
};

async function consumerRestApi(baseUrl, api, type, body = null) {
	const fullUri = `${baseUrl}/${api}`;
	return await axios(setHeaders(fullUri, type, body))
		.catch((errors) => {
			return {
				data: {
					message: "error"
				}
			}
		});
}

function setHeaders(url, type, body) {
	switch (type) {
		case CONFIG.HTTP.GET:
			return {
				method: type,
				url: url,
				params: body,
				timeout: 5000
			};
		case CONFIG.HTTP.POST:
			return {
				method: type,
				url: url,
				data: body,
				timeout: 3000
			};
		case CONFIG.HTTP.PUT:
			return {
				method: type,
				url: url,
				headers: { "Content-Type": "application/json" },
				data: body,
				timeout: 3000
			};
		case CONFIG.HTTP.DELETE:
			return {
				method: type,
				url: url,
				headers: { "Content-Type": "application/json" },
				timeout: 3000
			};
		default:
			break;
	}
}
