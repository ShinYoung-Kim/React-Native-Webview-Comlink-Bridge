"use client";

import { Endpoint } from "./comlink.type";

const listeners: any[] = [];

export const webViewRpcEndpoint: Endpoint = {
	addEventListener: (_, listener, ...args) => {
		document.addEventListener("ReactNativeWebViewCallback", listener, ...args);
	},
	removeEventListener: (_, listener) => {
		document.removeEventListener("ReactNativeWebViewCallback", listener);
	},
	postMessage: (data) => {
		window.ReactNativeWebView.postMessage(JSON.stringify(data));
	},
	onMessage: (e) => {
		const data = JSON.parse(e.data);
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
