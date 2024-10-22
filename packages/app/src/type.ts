import * as Comlink from "comlink";
import { WebViewMessageEvent } from "react-native-webview";

export type WebViewEndpoint = Comlink.Endpoint & {
	onMessage: (e: WebViewMessageEvent) => void;
};
