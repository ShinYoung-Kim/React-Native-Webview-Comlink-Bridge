import * as Comlink from "comlink";

declare global {
	interface Window {
		ReactNativeWebView: {
			postMessage: (message: string) => void;
		};
	}
}

export type Endpoint = Comlink.Endpoint & {
	onMessage: (e: MessageEvent) => void;
};
