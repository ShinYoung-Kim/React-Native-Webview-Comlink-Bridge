"use client";

import { useEffect, useState } from "react";
import * as Comlink from "comlink";
import { webViewRpcEndpoint } from "../_comlink/endpoint";

const Children = () => {
	const [time, setTime] = useState(0);
	useEffect(() => {
		const interval = setInterval(() => {
			setTime(time + 1);
		}, 1000);
		return () => clearInterval(interval);
	}, [time]);

	const stopTimer = async () => {
		clearInterval(time);
		setTime(0);
	};

	const webRpcs = {
		async stopTime() {
			return await new Promise<void>((resolve) => {
				stopTimer();
				resolve();
			});
		},
	};

	Comlink.expose(webRpcs, webViewRpcEndpoint);

	return (
		<div>
			<h1>Time: {time}</h1>
			<button onClick={stopTimer}>Stop</button>
		</div>
	);
};

export default Children;
