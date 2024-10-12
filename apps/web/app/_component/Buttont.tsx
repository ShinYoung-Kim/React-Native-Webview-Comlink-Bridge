"use client";

import { rpc } from "../_comlink/rpcs";

const Buttont = () => {
	const onClickButton = async () => {
		await rpc.confirmAlert("app alert", "app alert 모양인가");
	};

	return <button onClick={onClickButton}>앱 alert 호출</button>;
};

export default Buttont;
