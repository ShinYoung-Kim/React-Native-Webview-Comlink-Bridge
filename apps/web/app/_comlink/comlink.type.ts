import * as Comlink from "comlink";

export type Endpoint = Comlink.Endpoint & {
	onMessage: (e: MessageEvent) => void;
};
