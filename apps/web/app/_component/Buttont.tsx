"use client";
import { rpcs } from "@react-native-webview-comlink-bridge/web";

const Buttont = () => {
	const { remoteRPC } = rpcs();

	const onClickButton = async () => {
		await remoteRPC.confirmAlert("app alert", "app alert 모양인가");
	};

	return <button onClick={onClickButton}>앱 alert 호출</button>;
};

export default Buttont;
