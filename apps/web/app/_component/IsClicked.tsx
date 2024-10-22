"use client";
import { useEffect, useState } from "react";
import { rpcs } from "@react-native-webview-comlink-bridge/web";

const IsClicked = () => {
	const { exposeClientRPC } = rpcs();
	const [text, setText] = useState("");
	const webRpcs = {
		async changeWebText(title: string) {
			return await new Promise<void>((resolve) => {
				setText(title);
				resolve();
			});
		},
	};

	useEffect(() => {
		exposeClientRPC(webRpcs);
	}, [webRpcs]);

	return <div>{text}</div>;
};

export default IsClicked;
