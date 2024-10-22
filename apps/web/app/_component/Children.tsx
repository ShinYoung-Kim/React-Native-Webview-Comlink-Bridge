"use client";

import { useEffect, useState } from "react";
import { rpcs } from "@react-native-webview-comlink-bridge/web";

const Children = () => {
	const { exposeClientRPC } = rpcs();
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

	useEffect(() => {
		exposeClientRPC(webRpcs);
	}, [webRpcs]);

	return (
		<div>
			<h1>Time: {time}</h1>
			<button onClick={stopTimer}>Stop</button>
		</div>
	);
};

export default Children;
