"use client";
import { useState } from "react";
import * as Comlink from "comlink";
import { webViewRpcEndpoint } from "../_comlink/endpoint";

const IsClicked = () => {
	const [isClicked, setIsClicked] = useState(false);
	const webRpcs = {
		async changeWebText() {
			return await new Promise<void>((resolve) => {
				setIsClicked((prev) => !prev);
				resolve();
			});
		},
	};

	Comlink.expose(webRpcs, webViewRpcEndpoint);

	return <div>{isClicked ? "클릭됨" : "아님"}</div>;
};

export default IsClicked;
