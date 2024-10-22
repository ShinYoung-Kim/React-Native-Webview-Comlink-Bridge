import WebView from "react-native-webview";
import { WebViewEndpoint } from "./type";

class MessageEvent {
	public origin = "ReactNativeWebView";
	constructor(public data: unknown) {}
}

export const getEndpoint = (ref: React.RefObject<WebView<{}>>): WebViewEndpoint => {
	const listeners: any[] = [];
	return {
		addEventListener: (_, listener) => {
			listeners.push(listener);
		},
		removeEventListener: (_, listener) => {
			listeners.filter((l) => l !== listener);
		},
		postMessage: (data) => {
			if (!ref.current) {
				throw Error("Failed to return RPC response to WebView via postMessage");
			}

			const dataStr = JSON.stringify(data);
			return ref.current.injectJavaScript(`
            document.dispatchEvent(new MessageEvent('ReactNativeWebViewCallback', { data: ${dataStr} }));
          `);
		},
		onMessage: (e) => {
			const data = JSON.parse(e.nativeEvent.data);
			const messageEvent = new MessageEvent(data);
			listeners.forEach((l) => {
				if (typeof l === "function") {
					l(messageEvent as unknown as Event);
				} else {
					l.handleEvent(messageEvent as unknown as Event);
				}
			});
		},
	};
};
