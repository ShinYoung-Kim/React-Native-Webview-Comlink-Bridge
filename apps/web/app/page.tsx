import Buttont from "./_component/Buttont";
import IsClicked from "./_component/IsClicked";

declare global {
	interface Window {
		ReactNativeWebView: {
			postMessage: (message: string) => void;
		};
	}
}

export default function Web() {
	return (
		<div>
			<h1>Web</h1>
			<Buttont />
			<IsClicked />
		</div>
	);
}
