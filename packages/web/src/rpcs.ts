import * as Comlink from "comlink";
import { endpoint } from "./endpoint";

export const rpcs = () => {
	const remoteRPC: Comlink.Remote<any> = Comlink.wrap(endpoint, {});

	const exposeClientRPC = (clientRPC: any) => {
		Comlink.expose(clientRPC, endpoint);
	};

	return {
		remoteRPC,
		exposeClientRPC,
	};
};
