import * as Comlink from "comlink";
import { WebViewEndpoint } from "./type";

export const rpcs = () => {
	const getRemoteRPC = (endpoint: WebViewEndpoint) => {
		return Comlink.wrap(endpoint, {});
	};

	const exposeClientRPC = (clientRPC: any, endpoint: WebViewEndpoint) => {
		Comlink.expose(clientRPC, endpoint);
	};

	return {
		getRemoteRPC,
		exposeClientRPC,
	};
};
