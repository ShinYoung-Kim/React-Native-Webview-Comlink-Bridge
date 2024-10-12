"use client";
import { useState } from "react";
import * as Comlink from "comlink";
import { webViewRpcEndpoint } from "../_comlink/endpoint";

const IsClicked = () => {
	const [text, setText] = useState("");
	const webRpcs = {
		async changeWebText(title: string) {
			return await new Promise<void>((resolve) => {
				setText(title);
				resolve();
			});
		},
	};

	Comlink.expose(webRpcs, webViewRpcEndpoint);

	return <div>{text}</div>;
};

export default IsClicked;
